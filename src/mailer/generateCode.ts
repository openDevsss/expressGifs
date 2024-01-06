export const generateCodeEmail = () =>
  Math.floor(10000 + Math.random() * 90000)
    .toString()
    .substring(0, 5);
