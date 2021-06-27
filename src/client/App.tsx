import React, { FC } from "react";

interface AppProps {
  page: string;
}
const App: FC<AppProps> = (props) => {
  return <div>안녕! 페이지는: {props.page}</div>;
};
export default App;
