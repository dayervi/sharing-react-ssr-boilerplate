export type Locale = {
  code: string;
  basename: string;
  label: string;
}

export const defaultLocale: Locale = { code: "fr-CH", basename: "fr", label: "Français" };
const supportedLocales: Locale[] = [
  ...[ defaultLocale ],
  { code: "de-CH", basename: "de", label: "Deutsch" },
  { code: "it-CH", basename: "it", label: "Italiano" },
  { code: "en-GB", basename: "en", label: "English" }
]

export const enabledLocales = () => {
  const activation = process.env.AVAILABLE_LANGUAGES!.split(",");
  const result = supportedLocales.filter(sl => activation.includes(sl.code));
  if (!result.some(sl => sl.basename === "fr"))
    result.unshift(defaultLocale);
  return result;
}

const matchUrlWithBasename = new RegExp(`^\/(${supportedLocales.map(l => l.basename).join("|")})\/(.*)$`);
const splitCountry = (locale: string) => locale.replace("_", "-").split("-")[0];
const findLocale = (basenames: string[]): Locale | null => {
  const prioritize = basenames
    .map(bn => enabledLocales().find(l => l.basename === bn))
    .filter(r => !!r);
  return prioritize[0] || null;
}

export const splitBasename = (path: string) => {
  const check = path.match(matchUrlWithBasename);
  if (!!check) return check[2];
  return path;
}

export const determineLocale = (acceptedLanguages: readonly string[], path?: string) => {
  const check = path?.match(matchUrlWithBasename);
  if (!!path && !!check) {
    const matchingUrlLocale = findLocale(([ check[1] ]));
    if (!!matchingUrlLocale) return matchingUrlLocale;
  }
  const fallbackLocale = findLocale(acceptedLanguages.map(splitCountry));
  return fallbackLocale || defaultLocale;
}
