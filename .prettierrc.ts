module.exports = {
  singleQuote: true,
  tabWidth: 2,
  printWidth: 120,
  arrowParens: "avoid",

  plugins: [require.resolve("@trivago/prettier-plugin-sort-imports")],
  importOrder: [
    "recoil",
    "<THIRD_PARTY_MODULES>",
    "^@components/(.*)$",
    "^@recoil/(.*)$",
    "^@hooks/(.*)$",
    "^@utils/(.*)$",
    "^@libs/(.*)$",
    "^@types/(.*)$",
    "^@constants/(.*)$",
    "^@styles/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
