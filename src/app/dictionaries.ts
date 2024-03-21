import "server-only";

import type { EnDictionary, JaDictionary } from "../dictionaries/types";

const dictionaries = {
  en: () =>
    import("../dictionaries/en.json").then(
      (module): EnDictionary => module.default,
    ),
  ja: () =>
    import("../dictionaries/ja.json").then(
      (module): JaDictionary => module.default,
    ),
};

export const getDictionary = async (
  locale: "en" | "ja",
): Promise<EnDictionary | JaDictionary> => dictionaries[locale]();
