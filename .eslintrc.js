module.exports = {
  root: true,
  extends: ["universe/native"],
  rules: {
    "no-undef": "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
};
