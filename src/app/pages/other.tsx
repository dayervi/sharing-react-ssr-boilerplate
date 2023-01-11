import React from "react";
import {GQLExample} from "../components/gql-exemple";
import "./common.scss";

const Other = () => (
  <>
    <h1>Page</h1>
    <section>
      <h1>GQL query example (ssr compatible)</h1>
      <GQLExample />
    </section>
  </>);

export default Other;
