import React, {useContext} from "react";
import classNames from "classnames";
import {Helmet} from "react-helmet-async";
import {FormattedMessage} from "react-intl";
import {enabledLocales} from "../shared/locale";
import {LocaleContext} from "./contexts/locale";
import {navTranslations} from "./i18n/sharable-def";
import LocaleRoutes, {LocaleLangLink, LocaleLink, LocaleNavLink} from "./routes";
import logo from "./assets/fake-logo.png";
import "../scss/global.scss";
import "./app.scss";

const App = () => {

  const { locale } = useContext(LocaleContext);
  const allLocales = enabledLocales();

  return (
    <>
      <Helmet>
        <html lang={locale.code} />
        <meta property="og:locale" content={locale.code} />
        <meta property="og:type" content="website" />
        <title>[Demo] react, SSR, apollo, loadable, intl</title>
      </Helmet>
      <header>
        <LocaleLink to="/">
          <img src={logo} />
        </LocaleLink>
        <nav>
          <ul>
            <li>
              <LocaleNavLink className={({isActive}) => classNames({"active": isActive})}
                             to="/">
                <FormattedMessage {...navTranslations.home} />
              </LocaleNavLink>
            </li>
            <li>
              <LocaleNavLink className={({isActive}) => classNames({"active": isActive})}
                             to="page">
                <FormattedMessage {...navTranslations.page} />
              </LocaleNavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <LocaleRoutes/>
      </main>
      <footer>
        <LocaleLink to="/">
          <img src={logo}/>
        </LocaleLink>
        {allLocales.length > 1 &&
          <ul className="lang-switcher">
            {enabledLocales().map(l =>
              <li key={l.code}>
                <LocaleLangLink to={l}
                                {...(locale.code === l.code && { className: "active" })}>
                  {l.basename.toUpperCase()}
                </LocaleLangLink>
              </li>)
            }
          </ul>
        }
      </footer>
    </>);

}

export default App;
