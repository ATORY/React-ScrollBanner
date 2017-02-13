import * as React from "react";
import * as ReactDOM from "react-dom";
import "./index.less";

import { Footer } from "./footer";
import { Banner } from "./banner";

ReactDOM.render(
  <div>
    <Banner/>
    <main>banner</main>
    <Footer/>
  </div>,
  document.getElementById("app")
);
