import React from "react";
import {FormattedMessage, useIntl} from "react-intl";
import {navTranslations, titleTranslations} from "../i18n/sharable-def";
import {GQLExample} from "../components/gql-exemple";
import "./common.scss";

const Other = () => {

  const intl = useIntl();

  return (
    <>
      <h1>
        <FormattedMessage {...navTranslations.page} />
      </h1>
      <section>
        <h1>
          <FormattedMessage {...titleTranslations.ssrGql} />
        </h1>
        <GQLExample />
      </section>
    </>);

}

export default Other;
