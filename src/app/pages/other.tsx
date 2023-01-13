import React from "react";
import {GQLExample} from "../components/gql-exemple";
import "./common.scss";
import {Helmet} from "react-helmet-async";

const Other = () => (
  <>
    <Helmet>
      <title>Page title</title>
    </Helmet>
    <h1>Page</h1>
    <section>
      <h1>GQL query example (ssr compatible)</h1>
      <GQLExample />
    </section>
  </>);

export default Other;
