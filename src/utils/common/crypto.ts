// eslint-disable-next-line max-classes-per-file
import { decrypt as aesDecrypt, encrypt as aesEncrypt } from 'crypto-js/aes';
import UTF8, { parse } from 'crypto-js/enc-utf8';
import pkcs7 from 'crypto-js/pad-pkcs7';
import CTR from 'crypto-js/mode-ctr';
import Base64 from 'crypto-js/enc-base64';
import MD5 from 'crypto-js/md5';
import SHA256 from 'crypto-js/sha256';
import SHA512 from 'crypto-js/sha512';

/**
 * @description Define an interface for Encryption - [定义一个加密算法的接口]
 */
export interface Encryption {
  encrypt(plainText: string): string;
  decrypt(cipherText: string): string;
}

/**
 * @description Define an interface for Hashing - [定义一个哈希算法的接口]
 */
export interface Hashing {
  hash(data: string): string;
}

/**
 * @description Define an interface for Encryption parameters - [定义一个加密算法的参数接口]
 */
export interface EncryptionParams {
  key: string;
  iv: string;
}

/**
 * @description Define a class for AES encryption - [定义一个AES加密算法的类]
 */
class AesEncryption implements Encryption {
  private readonly key;

  private readonly iv;

  constructor({ key, iv }: EncryptionParams) {
    this.key = parse(key);
    this.iv = parse(iv);
  }

  get getOptions() {
    return {
      mode: CTR,
      padding: pkcs7,
      iv: this.iv,
    };
  }

  encrypt(plainText: string) {
    return aesEncrypt(plainText, this.key, this.getOptions).toString();
  }

  decrypt(cipherText: string) {
    return aesDecrypt(cipherText, this.key, this.getOptions).toString(UTF8);
  }
}

/**
 * @description Define a singleton class for Base64 encryption - [定义一个单例类，用于Base64加密]
 */
class Base64Encryption implements Encryption {
  // eslint-disable-next-line no-use-before-define
  private static instance: Base64Encryption;

  /**
   * @description Get the singleton instance - [获取单例实例]
   */
  public static getInstance(): Base64Encryption {
    if (!Base64Encryption.instance) {
      Base64Encryption.instance = new Base64Encryption();
    }
    return Base64Encryption.instance;
  }

  encrypt(plainText: string) {
    return UTF8.parse(plainText).toString(Base64);
  }

  decrypt(cipherText: string) {
    return Base64.parse(cipherText).toString(UTF8);
  }
}

/**
 * @description Define a singleton class for MD5 Hashing - [定义一个单例类，用于MD5哈希]
 */
class MD5Hashing implements Hashing {
  // eslint-disable-next-line no-use-before-define
  private static instance: MD5Hashing;

  /**
   * @description Get the singleton instance - [获取单例实例]
   */
  public static getInstance(): MD5Hashing {
    if (!MD5Hashing.instance) {
      MD5Hashing.instance = new MD5Hashing();
    }
    return MD5Hashing.instance;
  }

  hash(plainText: string) {
    return MD5(plainText).toString();
  }
}

/**
 * @description Define a singleton class for SHA256 Hashing - [定义一个单例类，用于SHA256哈希]
 */
class SHA256Hashing implements Hashing {
  // eslint-disable-next-line no-use-before-define
  private static instance: SHA256Hashing;

  /**
   * @description Get the singleton instance - [获取单例实例]
   */
  public static getInstance(): SHA256Hashing {
    if (!SHA256Hashing.instance) {
      SHA256Hashing.instance = new SHA256Hashing();
    }
    return SHA256Hashing.instance;
  }

  hash(plainText: string) {
    return SHA256(plainText).toString();
  }
}

/**
 * @description Define a singleton class for SHA512 Hashing - [定义一个单例类，用于SHA512哈希]
 */
class SHA512Hashing implements Hashing {
  // eslint-disable-next-line no-use-before-define
  private static instance: SHA512Hashing;

  /**
   * @description Get the singleton instance - [获取单例实例]
   */
  public static getInstance(): SHA256Hashing {
    if (!SHA512Hashing.instance) {
      SHA512Hashing.instance = new SHA512Hashing();
    }
    return SHA512Hashing.instance;
  }

  hash(plainText: string) {
    return SHA512(plainText).toString();
  }
}

export class EncryptionFactory {
  public static createAesEncryption(params: EncryptionParams): Encryption {
    return new AesEncryption(params);
  }

  public static createBase64Encryption(): Encryption {
    return Base64Encryption.getInstance();
  }
}

export class HashingFactory {
  public static createMD5Hashing(): Hashing {
    return MD5Hashing.getInstance();
  }

  public static createSHA256Hashing(): Hashing {
    return SHA256Hashing.getInstance();
  }

  public static createSHA512Hashing(): Hashing {
    return SHA512Hashing.getInstance();
  }
}
