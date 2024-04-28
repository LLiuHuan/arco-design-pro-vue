import CryptoJS from 'crypto-js';

export class Crypto<T extends object> {
  /** Secret key */
  secret_key: CryptoJS.lib.WordArray;

  /** Secret iv */
  secret_iv: CryptoJS.lib.WordArray;

  /**
   * @description Constructor
   * @description 构造函数
   * @param secretKey
   * @param secretIv
   */
  constructor(secretKey: string, secretIv: string) {
    if (!secretKey || !secretIv) {
      throw new Error('secretKey and secretIv are required');
    } else if (secretKey.length !== 16 || secretIv.length !== 16) {
      throw new Error('The length of secretKey and secretIv must be 16');
    } else if (!CryptoJS) {
      throw new Error('CryptoJS is required');
    }

    this.secret_key = CryptoJS.enc.Utf8.parse(secretKey);
    this.secret_iv = CryptoJS.enc.Utf8.parse(secretIv);
  }

  /**
   * @description Encrypt data
   * @description 加密数据
   * @param data
   */
  encrypt(data: T): string {
    const dataString = JSON.stringify(data);
    const dataHex = CryptoJS.enc.Utf8.parse(dataString);
    const encrypted = CryptoJS.AES.encrypt(dataHex, this.secret_key, {
      iv: this.secret_iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.ciphertext.toString();
  }

  /**
   * @description Decrypt data
   * @description 解密数据
   * @param encrypted
   */
  decrypt(encrypted: string) {
    const encryptedHexStr = CryptoJS.enc.Hex.parse(encrypted);
    const encryptedStr = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    const decrypted = CryptoJS.AES.decrypt(encryptedStr, this.secret_key, {
      iv: this.secret_iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    const dataString = decrypted.toString(CryptoJS.enc.Utf8);
    try {
      return JSON.parse(dataString.toString());
    } catch {
      // avoid parse error
      return null;
    }
  }
}
