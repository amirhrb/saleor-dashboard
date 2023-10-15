// @ts-strict-ignore
import useLocalStorage from "@dashboard/hooks/useLocalStorage";
import React from "react";
import { IntlProvider, ReactIntlErrorCode } from "react-intl";

import { defaultDirection, RIGHT_TO_LEFT } from "./consts";

export enum Locale {
  AR = "ar",
  AZ = "az",
  BG = "bg",
  BN = "bn",
  CA = "ca",
  CS = "cs",
  DA = "da",
  DE = "de",
  EL = "el",
  EN = "en",
  ES = "es",
  ES_CO = "es-CO",
  ET = "et",
  FA = "fa",
  FR = "fr",
  HI = "hi",
  HU = "hu",
  HY = "hy",
  ID = "id",
  IS = "is",
  IT = "it",
  JA = "ja",
  KO = "ko",
  MN = "mn",
  NB = "nb",
  NL = "nl",
  PL = "pl",
  PT = "pt",
  PT_BR = "pt-BR",
  RO = "ro",
  RU = "ru",
  SK = "sk",
  SL = "sl",
  SQ = "sq",
  SR = "sr",
  SV = "sv",
  TH = "th",
  TR = "tr",
  UK = "uk",
  VI = "vi",
  ZH_HANS = "zh-Hans",
  ZH_HANT = "zh-Hant",
}

interface StructuredMessage {
  context?: string;
  string: string;
}
type LocaleMessages = Record<string, StructuredMessage>;

type LocalNames = Record<Locale, { displayName: string; direction: string }>;

export const localeNames: LocalNames = {
  [Locale.AR]: {
    displayName: "العربيّة",
    direction: RIGHT_TO_LEFT,
  },
  [Locale.AZ]: { displayName: "Azərbaycanca", direction: defaultDirection },
  [Locale.BG]: { displayName: "български", direction: defaultDirection },
  [Locale.BN]: { displayName: "বাংলা", direction: defaultDirection },
  [Locale.CA]: { displayName: "català", direction: defaultDirection },
  [Locale.CS]: { displayName: "česky", direction: defaultDirection },
  [Locale.DA]: { displayName: "dansk", direction: defaultDirection },
  [Locale.DE]: { displayName: "Deutsch", direction: defaultDirection },
  [Locale.EL]: { displayName: "Ελληνικά", direction: defaultDirection },
  [Locale.EN]: { displayName: "English", direction: defaultDirection },
  [Locale.ES]: { displayName: "español", direction: defaultDirection },
  [Locale.ES_CO]: {
    displayName: "español de Colombia",
    direction: defaultDirection,
  },
  [Locale.ET]: { displayName: "eesti", direction: defaultDirection },
  [Locale.FA]: { displayName: "فارسی", direction: RIGHT_TO_LEFT },
  [Locale.FR]: { displayName: "français", direction: defaultDirection },
  [Locale.HI]: { displayName: "Hindi", direction: defaultDirection },
  [Locale.HU]: { displayName: "Magyar", direction: defaultDirection },
  [Locale.HY]: { displayName: "հայերեն", direction: defaultDirection },
  [Locale.ID]: { displayName: "Bahasa Indonesia", direction: defaultDirection },
  [Locale.IS]: { displayName: "Íslenska", direction: defaultDirection },
  [Locale.IT]: { displayName: "italiano", direction: defaultDirection },
  [Locale.JA]: { displayName: "日本語", direction: defaultDirection },
  [Locale.KO]: { displayName: "한국어", direction: defaultDirection },
  [Locale.MN]: { displayName: "Mongolian", direction: defaultDirection },
  [Locale.NB]: { displayName: "norsk (bokmål)", direction: defaultDirection },
  [Locale.NL]: { displayName: "Nederlands", direction: defaultDirection },
  [Locale.PL]: { displayName: "polski", direction: defaultDirection },
  [Locale.PT]: { displayName: "Português", direction: defaultDirection },
  [Locale.PT_BR]: {
    displayName: "Português Brasileiro",
    direction: defaultDirection,
  },
  [Locale.RO]: { displayName: "Română", direction: defaultDirection },
  [Locale.RU]: { displayName: "Русский", direction: defaultDirection },
  [Locale.SK]: { displayName: "Slovensky", direction: defaultDirection },
  [Locale.SL]: { displayName: "Slovenščina", direction: defaultDirection },
  [Locale.SQ]: { displayName: "shqip", direction: defaultDirection },
  [Locale.SR]: { displayName: "српски", direction: defaultDirection },
  [Locale.SV]: { displayName: "svenska", direction: defaultDirection },
  [Locale.TH]: { displayName: "ภาษาไทย", direction: defaultDirection },
  [Locale.TR]: { displayName: "Türkçe", direction: defaultDirection },
  [Locale.UK]: { displayName: "Українська", direction: defaultDirection },
  [Locale.VI]: { displayName: "Tiếng Việt", direction: defaultDirection },
  [Locale.ZH_HANS]: { displayName: "简体中文", direction: defaultDirection },
  [Locale.ZH_HANT]: { displayName: "繁體中文", direction: defaultDirection },
};

const dotSeparator = "_dot_";
const sepRegExp = new RegExp(dotSeparator, "g");

function getKeyValueJson(messages: LocaleMessages): Record<string, string> {
  if (messages) {
    const keyValueMessages: Record<string, string> = {};
    return Object.entries(messages).reduce((acc, [id, msg]) => {
      acc[id.replace(sepRegExp, ".")] = msg.string;
      return acc;
    }, keyValueMessages);
  }
}

const defaultLocale = Locale.EN;

export interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}
export const LocaleContext = React.createContext<LocaleContextType>({
  locale: defaultLocale,
  setLocale: () => undefined,
});

const { Consumer: LocaleConsumer, Provider: RawLocaleProvider } = LocaleContext;

const LocaleProvider: React.FC = ({ children }) => {
  const [locale, setLocale] = useLocalStorage("locale", defaultLocale);
  const [messages, setMessages] = React.useState(undefined);

  const setDirection = (locale: string) => {
    document.body.dir = localeNames[locale].direction;
  };

  React.useEffect(() => {
    async function changeLocale() {
      if (locale !== defaultLocale) {
        // It seems like Webpack is unable to use aliases for lazy imports
        const mod = await import(`../../../locale/${locale}.json`);
        setMessages(mod.default);
      } else {
        setMessages(undefined);
      }
      setDirection(locale);
    }

    changeLocale();
  }, [locale]);

  return (
    <IntlProvider
      defaultLocale={defaultLocale}
      locale={locale}
      messages={getKeyValueJson(messages)}
      onError={err => {
        if (!(err.code === ReactIntlErrorCode.MISSING_TRANSLATION)) {
          console.error(err);
        }
      }}
      key={locale}
    >
      <RawLocaleProvider
        value={{
          locale,
          setLocale,
        }}
      >
        {children}
      </RawLocaleProvider>
    </IntlProvider>
  );
};

export { LocaleConsumer, LocaleProvider, RawLocaleProvider };
