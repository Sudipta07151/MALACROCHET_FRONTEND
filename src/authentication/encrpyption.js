import CryptoJS from "crypto-js";

export function encryptPassword(password) {
  let secretKey = "AAAAAAAAAAAAAAAA";
  secretKey = CryptoJS.enc.Utf8.parse(secretKey);
  var iv = CryptoJS.enc.Utf8.parse('BBBBBBBBBBBBBBBB')
  const encrypted  = CryptoJS.AES.encrypt(password, secretKey, { iv: iv, mode: CryptoJS.mode.CBC}).toString();
  return encrypted ;
}

