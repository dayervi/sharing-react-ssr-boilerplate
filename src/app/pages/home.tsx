import React from "react";
import {FormattedMessage, useIntl} from "react-intl";
import {navTranslations, titleTranslations} from "../i18n/sharable-def";
import FakeComponent from "../components/loadable-demo";
import {ClientOnlyGQLExample, GQLExample} from "../components/gql-exemple";
import "./common.scss";

const Home = () => {

  const intl = useIntl();

  return (<>
    <h1>
      <FormattedMessage {...navTranslations.home} />
    </h1>
    <section>
      <FakeComponent />
    </section>
    <section>
      <h1>
        <FormattedMessage {...titleTranslations.ssrGql} />
      </h1>
      <GQLExample />
    </section>
    <section>
      <h1>
        {intl.formatMessage({
          id: "cli-gql-example-title",
          defaultMessage: "example de requête GQL (désactivation SSR)"
        })}
      </h1>
      <ClientOnlyGQLExample />
    </section>
  </>);

}

export default Home;
