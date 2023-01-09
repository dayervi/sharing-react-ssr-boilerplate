import React from "react";
import "./fake-library.scss";

const FakeComponent = () => {

  return (
    <div className="fake-wrapper">
      <span>loadable component (ignored on SSR)</span>
    </div>);

}

export default FakeComponent;
