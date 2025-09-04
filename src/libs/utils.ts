/**
 * トークンを生成する
 * @param length トークンの長さ
 * @returns トークン文字列
 */
export const createToken = (length = 10) => {
  const word = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const tokenArr = [...Array(length)].map(() => word[Math.floor(Math.random() * word.length)]);
  return tokenArr.join("");
};
