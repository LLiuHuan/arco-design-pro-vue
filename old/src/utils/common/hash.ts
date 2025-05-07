import CryptoES from 'crypto-es';

export type Algo =
  | 'md5'
  | 'sha1'
  | 'sha256'
  | 'sha224'
  | 'sha512'
  | 'sha384'
  | 'sha3';

export const getAlgoInstance = (algo: Algo) => {
  switch (algo) {
    case 'md5':
      return CryptoES.algo.MD5.create();
    case 'sha1':
      return CryptoES.algo.SHA1.create();
    case 'sha256':
      return CryptoES.algo.SHA256.create();
    case 'sha224':
      return CryptoES.algo.SHA224.create();
    case 'sha512':
      return CryptoES.algo.SHA512.create();
    case 'sha384':
      return CryptoES.algo.SHA384.create();
    case 'sha3':
      return CryptoES.algo.SHA3.create();
    default:
      return CryptoES.algo.SHA256.create();
  }
};

/* arraybuffer to word array */
export function arrayBufferToWordArray(ab: ArrayBuffer) {
  const i8a = new Uint8Array(ab);
  const a = [];
  for (let i = 0; i < i8a.length; i += 4) {
    a.push(
      (i8a[i] << 24) | (i8a[i + 1] << 16) | (i8a[i + 2] << 8) | i8a[i + 3],
    );
  }
  return CryptoES.lib.WordArray.create(a, i8a.length);
}
