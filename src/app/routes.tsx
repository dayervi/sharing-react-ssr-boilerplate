import React, {PropsWithChildren, useContext, useEffect} from "react";
import {Route, Routes, useLocation} from "react-router";
import {Link, LinkProps, NavLink, NavLinkProps} from "react-router-dom";
import {enabledLocales, Locale, splitBasename} from "../shared/locale";
import {LocaleContext} from "./contexts/locale";
import Home from "./pages/home";
import Other from "./pages/other";
import NotFound from "./pages/not-found";

const pathCleaning = (path: string) => path.charAt(0) === "/" ? path.substring(1) : path;

type LocaleToProps<T> = { to: T }
type LocaleLinkProps = Omit<LinkProps, "to"> & LocaleToProps<string>
type LocaleNavLinkProps = Omit<NavLinkProps, "to"> & LocaleToProps<string>
type LocaleLangLinkProps = Omit<LinkProps, "to"> & LocaleToProps<Locale>

export const ScrollToTop = ({ children }: PropsWithChildren) => {

  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [ location.pathname ]);

  return (<>{children}</>);

}

export const LocaleLink = ({ to, ...props }: LocaleLinkProps) => {

  const { locale } = useContext(LocaleContext);
  return (<Link to={`/${locale.basename}/${pathCleaning(to)}`}
                {...props} />);

}

export const LocaleNavLink = ({ to, ...props }: LocaleNavLinkProps) => {

  const { locale } = useContext(LocaleContext);
  return (<NavLink to={`/${locale.basename}/${pathCleaning(to)}`}
                   {...props} />);

}

export const LocaleLangLink = ({ to, onClick, ...props }: LocaleLangLinkProps) => {

  const { setLocale } = useContext(LocaleContext);
  const location = useLocation();
  const onRedirect = (e) => {
    setLocale(to);
    !!onClick && onClick(e);
  };

  return (<Link to={`/${to.basename}/${splitBasename(location.pathname)}${location.search}`}
                onClick={onRedirect}
                {...props} />);

}

const LocaleRoutes = () => (
  <Routes>
    {enabledLocales().map(l => l.basename).map(base =>
      <Route key={base} path={`/${base}/`}>
        <Route index={true} path="" element={<Home />} />
        <Route path="page" element={<Other />} />
        <Route path="*" element={<NotFound />} />
      </Route>)
    }
  </Routes>);

export default LocaleRoutes;
