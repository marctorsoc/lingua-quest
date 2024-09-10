const translations = {
  AUTH: {
    NAME: {
      en: "Name",
      es: "Nombre",
      ca: "Nom",
      lt: "Vardas",
    },
    CONTINUE: {
      en: "Continue",
      es: "Continuar",
      ca: "Continuar",
      lt: "Tęsti",
    },
    SIGNUP: {
      TITLE: {
        en: "Create a new account",
        es: "Crear una nueva cuenta",
        ca: "Crear un nou compte",
        lt: "Sukurti naują paskyrą",
      },
      APP_LANGUAGE: {
        en: "App language",
        es: "Idioma de la app",
        ca: "Idioma de l'app",
        lt: "App kalba",
      },
      LEARNING_LANG: {
        en: "Language to learn",
        es: "Idioma a aprender",
        ca: "Idioma a aprendre",
        lt: "Kalba mokymuisi",
      },
      IN_GAME_TRANSLATIONS: {
        en: "In-game translations",
        es: "Traducciones",
        ca: "Traduccions",
        lt: "Vertimai",
      },
      SIGNIN_LINK: {
        en: "I already have an account",
        es: "Ya tengo una cuenta",
        ca: "Ja tinc una compte",
        lt: "Jau turiu paskyrą",
      },
    },
    SIGNIN: {
      TITLE: {
        en: "Load your account",
        es: "Cargar tu cuenta",
        ca: "Carregar el teu compte",
        lt: "Įkelti savo paskyrą",
      },
      SIGNUP_LINK: {
        en: "Create a new player",
        es: "Crear un nuevo jugador",
        ca: "Crear un nou jugador",
        lt: "Sukurti naują žaidėją",
      },
    },
  },
};

/*
Create one file for each language, with the 
translations above
*/
// Helper function to recursively extract translations for a specific language
const fs = require("fs");
const path = require("path");

// Helper function to recursively discover languages in the translation object
// TODO: if this would make it very slow, we could just check the first item
function discoverLanguages(obj, languages = new Set()) {
  Object.values(obj).forEach((value) => {
    if (typeof value === "object" && !Array.isArray(value)) {
      if (
        Object.keys(value).some(
          (key) => typeof value[key] === "string",
        )
      ) {
        // If the object contains translations (language keys), add them to the set
        Object.keys(value).forEach((lang) => languages.add(lang));
      } else {
        // If it's a nested object, recurse further
        discoverLanguages(value, languages);
      }
    }
  });
  return [...languages];
}

// Helper function to recursively extract and preserve the structure for a specific language
function extractTranslationsForLanguage(obj, lang) {
  const result = {};

  Object.keys(obj).forEach((key) => {
    const value = obj[key];

    if (typeof value === "object" && !value[lang]) {
      // If it's an object but doesn't contain a translation for the current language, recurse
      result[key] = extractTranslationsForLanguage(value, lang);
    } else if (value[lang]) {
      // If it has a translation for the language, add it to the result
      result[key] = value[lang];
    }
  });

  return result;
}

// Automatically discover languages from the translations object
const languages = discoverLanguages(translations);

// Languages we want to generate files for

languages.forEach((lang) => {
  // Wrap the translations in a "translation" key
  const langTranslations = {
    translation: extractTranslationsForLanguage(translations, lang),
  };

  // Write the JSON file for each language
  fs.writeFileSync(
    path.join(__dirname, `${lang}.json`),
    JSON.stringify(langTranslations, null, 2),
  );
  console.log(`Generated ${lang}.json`);
});
