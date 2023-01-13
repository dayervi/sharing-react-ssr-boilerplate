import React, {Dispatch, ReactNode, SetStateAction, useMemo, useState} from "react";
import * as moment from "moment";
import {defaultLocale, Locale} from "../../shared/locale";

const localizeMomentJS = async (locale: Locale) => {
  switch (locale.code) {
    case "de-CH":
      // @ts-ignore
      await import("moment/locale/de-ch");
      return "de-ch";
    case "it-CH":
      // @ts-ignore
      await import("moment/locale/it-ch");
      return "it-ch";
    case "en-GB":
      // @ts-ignore
      await import("moment/locale/en-gb");
      return "en-gb";
    default:
      // @ts-ignore
      await import("moment/locale/fr-ch");
      return "fr-ch";
  }
}

type LocaleContextProps = {
  locale: Locale;
  setLocale: Dispatch<SetStateAction<Locale>>;
}

type LocaleContextProviderProps = {
  locale: Locale;
  children: ReactNode;
}

export const LocaleContext = React.createContext<LocaleContextProps>({
  locale: defaultLocale,
  setLocale: () => void 0
});

const LocaleProvider = ({ locale: propsLocale, children }: LocaleContextProviderProps) => {

  const [ locale, setLocale ] = useState<Locale>(propsLocale);
  const value = useMemo(() => {
    localizeMomentJS(locale).then(ml => moment.locale(ml));
    return { locale, setLocale };
  }, [ locale ]);

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}

export default LocaleProvider;
