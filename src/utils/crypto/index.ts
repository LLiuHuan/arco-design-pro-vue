/* 加密方法 */

import CryptoJS from 'crypto-js';

// 十六位十六进制数作为密钥
const SECRET_KEY = CryptoJS.enc.Utf8.parse('1101201190000001');
// 十六位十六进制数作为密钥偏移量
const SECRET_IV = CryptoJS.enc.Utf8.parse('1000000911021011');

/**
 * 加密数据
 * @param data - 数据
 */
export const encrypt = (data: any) => {
  if (typeof data === 'object') {
    try {
      // eslint-disable-next-line no-param-reassign
      data = JSON.stringify(data);
    } catch (error) {
      console.log('encrypt error:', error);
    }
  }
  const dataHex = CryptoJS.enc.Utf8.parse(data);
  const encrypted = CryptoJS.AES.encrypt(dataHex, SECRET_KEY, {
    iv: SECRET_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.ciphertext.toString();
};

/**
 * 解密数据
 * @param cipherText - 密文
 */
export const decrypt = (cipherText: string) => {
  const encryptedHexStr = CryptoJS.enc.Hex.parse(cipherText);
  const str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  const decrypt = CryptoJS.AES.decrypt(str, SECRET_KEY, {
    iv: SECRET_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  if (decryptedStr) {
    return JSON.parse(decryptedStr.toString());
  }
  return null;
};
