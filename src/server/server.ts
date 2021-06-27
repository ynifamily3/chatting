import express from "express";
import fs from "fs";
import path from "path";
import React from "react";
import { renderToString } from "react-dom/server";
import App from "../client/App";
import { InitialData } from "../types";

const app = express();
const html = fs.readFileSync(
  path.resolve(__dirname, "../build/index.html"),
  "utf8"
);

// app.use("/static", express.static("build/front/static/"));
app.use("/front", express.static("build/front/"));
app.use("/front/*", (req, res) => res.sendStatus(404)); // 없는 파일 처리
app.get("/server.bundle.js", (req, res) => res.sendStatus(500)); // hide file

app.get("/favicon.ico", (req, res) => res.sendStatus(204));

app.get("*", (req, res) => {
  const page = req.url ? req.url.substr(1) : "";
  const initialData: InitialData = { page };
  const renderString = renderToString(React.createElement(App, { page }));
  const result = html
    .replace(`<div id="root"></div>`, `<div id="root">${renderString}</div>`)
    .replace("__DATA_FROM_SERVER__", JSON.stringify(initialData));
  res.send(result);
});

app.listen(3000);
