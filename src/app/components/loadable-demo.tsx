import React from "react";
import loadable from "@loadable/component";

const Fake = loadable(
  () => import(/* webpackChunkName: "fake-lib" */"./fake-library"),
  { ssr: false });

export default Fake;
