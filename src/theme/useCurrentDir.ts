import { localeNames } from "@dashboard/components/Locale";
import useLocale from "@dashboard/hooks/useLocale";
import { useEffect, useState } from "react";

const useCurrentDir = () => {
  const { locale } = useLocale();
  const [currentDir, setCurrentDir] = useState(localeNames[locale].direction);
  useEffect(() => {
    setCurrentDir(localeNames[locale].direction);
  }, [locale]);

  return currentDir;
};

export default useCurrentDir;
