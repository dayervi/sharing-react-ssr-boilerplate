import React from "react";
import {Route, Routes} from "react-router";
import {NavLink} from "react-router-dom";
import classNames from "classnames";
import Home from "./pages/home";
import Other from "./pages/other";
import NotFound from "./pages/not-found";
import logo from "./assets/fake-logo.png";
import "./app.scss";

const App = () => {

  return (
    <>
      <header>
        <img src={logo} />
        <nav>
          <ul>
            <li>
              <NavLink className={({ isActive}) => classNames({ "active" : isActive })}
                       to="">Home</NavLink>
            </li>
            <li>
              <NavLink className={({ isActive}) => classNames({ "active" : isActive })}
                       to="page">Page</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route index={true} path="" element={<Home />} />
          <Route path="page" element={<Other />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer>
        <img src={logo} />
      </footer>
    </>);

}

export default App;
