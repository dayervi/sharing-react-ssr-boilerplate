import React from "react";
import FakeComponent from "../components/loadable-demo";
import {ClientOnlyGQLExample, GQLExample} from "../components/gql-exemple";
import "./common.scss";
import {Helmet} from "react-helmet-async";

const Home = () => (<>
  <Helmet>
    <title>Homepage title</title>
  </Helmet>
  <h1>Home</h1>
  <section>
    <FakeComponent />
  </section>
  <section>
    <h1>GQL query example (ssr compatible)</h1>
    <GQLExample />
  </section>
  <section>
    <h1>GQL query example (client only)</h1>
    <ClientOnlyGQLExample />
  </section>
</>);

export default Home;
