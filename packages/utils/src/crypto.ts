import CryptoJS from 'crypto-js';

export class Crypto<T extends object> {
  key: CryptoJS.lib.WordArray;

  iv: CryptoJS.lib.WordArray;

  constructor(secretKey?: string, secretIv?: string) {
    if (secretKey === undefined) {
      this.key = CryptoJS.lib.WordArray.random(16);
    } else {
      this.key = CryptoJS.enc.Utf8.parse(secretKey);
    }

    if (secretIv === undefined) {
      this.iv = CryptoJS.lib.WordArray.random(16);
    } else {
      this.iv = CryptoJS.enc.Utf8.parse(secretIv);
    }
  }

  // AES（高级加密标准）
  // AES 是一种对称加密算法，被广泛应用于保护数据的机密性
  // 它支持不同的密钥长度（128位、192位和256位）和多种加密模式（如 ECB、CBC 等）
  // AES 加密
  encryptAES(encryptData: T) {
    const dataString = JSON.stringify(encryptData);
    const encrypted = CryptoJS.AES.encrypt(dataString, this.key, {
      iv: this.iv, // 使用密钥偏移量
      mode: CryptoJS.mode.CBC, // 使用 CBC 模式
      // 除了CBC（密码块链模式）之外
      // crypto-js 库还支持：
      // 1. ECB（电子密码本模式）2. CFB（密码反馈模式）3. OFB（输出反馈模式）4. CTR（计数器模式）
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
  }

  // AES 解密
  decryptAES(encryptData: string) {
    try {
      const decrypt = CryptoJS.AES.decrypt(encryptData, this.key, {
        iv: this.iv, // 使用密钥偏移量
        mode: CryptoJS.mode.CBC, // 使用 CBC 模式
        padding: CryptoJS.pad.Pkcs7,
      });
      const decryptString = CryptoJS.enc.Utf8.stringify(decrypt);
      return JSON.parse(decryptString);
    } catch (error) {
      console.error('解密失败:', error);
      return null; // 返回 null 或其他自定义的错误标识
    }
  }

  // DES（数据加密标准）
  // DES 是一种对称加密算法，使用 56 位密钥对数据进行加密和解密
  // 它的密钥长度相对较短，易受到暴力破解等攻击方式的影响
  // DES 加密
  encryptDES(encryptData: T) {
    const dataString = JSON.stringify(encryptData);
    const dataHex = CryptoJS.enc.Utf8.parse(dataString);
    const encrypted = CryptoJS.DES.encrypt(dataHex, this.key, {
      iv: this.iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
  }

  // DES 解密
  decryptDES(encryptedData: string) {
    const decrypt = CryptoJS.DES.decrypt(encryptedData, this.key, {
      iv: this.iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    const decryptString = CryptoJS.enc.Utf8.stringify(decrypt);
    return JSON.parse(decryptString);
  }

  // Triple DES（三重数据加密标准）
  // Triple DES 是对 DES 算法的改进，通过多次应用 DES 算法来增加密钥长度和安全性
  // 它使用两个或三个 56 位密钥，以不同的方式对数据进行加密和解密
  // 由于其较慢的处理速度，逐渐被 AES 替代。
  // Triple DES 加密
  encryptTripleDES(encryptData: T) {
    const dataString = JSON.stringify(encryptData);
    const dataHex = CryptoJS.enc.Utf8.parse(dataString);
    const encrypted = CryptoJS.TripleDES.encrypt(dataHex, this.key, {
      iv: this.iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
  }

  // Triple DES 解密
  decryptTripleDES(encryptedData: string) {
    const decrypt = CryptoJS.TripleDES.decrypt(encryptedData, this.key, {
      iv: this.iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    const decryptString = CryptoJS.enc.Utf8.stringify(decrypt);
    return JSON.parse(decryptString);
  }

  // Rabbit 是一种对称加密算法，它使用变长密钥和变长分组，具有较高的加密速度。
  // Rabbit 算法被设计为安全且高效的加密算法，适用于多种应用场景
  // Rabbit 加密
  encryptRabbit(encryptData: string) {
    const dataString = JSON.stringify(encryptData);
    const dataHex = CryptoJS.enc.Utf8.parse(dataString);
    const encrypted = CryptoJS.Rabbit.encrypt(dataHex, this.key, {
      iv: this.iv,
    });
    return encrypted.toString();
  }

  // Rabbit 解密
  decryptRabbit(encryptedData: string) {
    const decrypt = CryptoJS.Rabbit.decrypt(encryptedData, this.key, {
      iv: this.iv,
    });
    const decryptString = CryptoJS.enc.Utf8.stringify(decrypt);
    return JSON.parse(decryptString);
  }

  // RC4 是一种流密码算法，用于生成伪随机流，然后将其与数据进行异或运算以进行加密
  // RC4 算法简单且易于实现，但由于其存在一些安全漏洞，已经不再被广泛使用
  // RC4 加密
  encryptRC4(encryptData: T) {
    const dataString = JSON.stringify(encryptData);
    const encrypted = CryptoJS.RC4.encrypt(dataString, this.key);
    return encrypted.toString();
  }

  // RC4 解密
  decryptRC4(encryptedData: string) {
    const decrypted = CryptoJS.RC4.decrypt(encryptedData, this.key);
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  // SHA256 哈希
  hashSHA256(data: string | CryptoJS.lib.WordArray) {
    const hash = CryptoJS.SHA256(data);
    return hash.toString();
  }
}
