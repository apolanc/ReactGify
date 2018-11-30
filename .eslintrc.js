module.exports = {
  parser: "babel-eslint",
  extends: [
    "airbnb",
    "plugin:prettier/recommended",
    "plugin:flowtype/recommended"
  ],
  plugins: ["react", "jsx-a11y", "import", "flowtype"],
  rules: {
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "jsx-a11y/label-has-associated-control": [
      "error",
      {
        required: {
          some: ["nesting", "id"]
        }
      }
    ],
    "jsx-a11y/label-has-for": [
      "error",
      {
        required: {
          some: ["nesting", "id"]
        }
      }
    ]
  },
  env: {
    browser: true
  }
};
