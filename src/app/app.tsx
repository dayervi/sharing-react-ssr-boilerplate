import React from "react";
import FakeComponent from "./components/loadable-demo";
import {ClientOnlyGQLExample, GQLExample} from "./components/gql-exemple";
import logo from "../assets/fake-logo.png";
import "./app.scss";

const App = () => {

  return (
    <>
      <header>
        <img src={logo} />
      </header>
      <main>
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
      </main>
      <footer>
        <img src={logo} />
      </footer>
    </>);

}

export default App;
