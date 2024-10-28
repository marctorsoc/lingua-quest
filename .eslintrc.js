module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended"
  ],
  overrides: [
    {
      files: ["*.js", "*.spec.js"],
      rules: {
        "react/prop-types": "off",
        "react/react-in-jsx-scope": "off"
      }
    }
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["react"],
  rules: {
    indent: ["warn", 2],
    "linebreak-style": ["warn", "unix"],
    quotes: [
      "warn",
      "double",
      {
        avoidEscape: true
      }
    ],
    semi: ["warn", "always"],
    "no-unused-vars": ["warn"],
    "no-unreachable": ["warn"],
    "max-len": [
      "warn",
      {
        code: 70,
        ignoreUrls: true,
        // ignorePattern: "^import\\s.+\\sfrom\\s.+;$",
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreComments: true,
        ignoreTrailingComments: true
      }
    ],
    "prettier/prettier": ["warn"]
  }
};
