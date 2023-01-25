import React from "react";
import "./fake-library.scss";
import {useIntl} from "react-intl";

const FakeComponent = () => {

  const intl = useIntl();

  return (
    <div className="fake-wrapper">
      <span>
        {intl.formatMessage({
          id: "ssr-loadable-label",
          defaultMessage: "composant loadable (ignoré en SSR)"
        })}
      </span>
    </div>);

}

export default FakeComponent;
