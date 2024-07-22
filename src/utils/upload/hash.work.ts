import CryptoES from 'crypto-es';
import { arrayBufferToWordArray, getAlgoInstance } from '@/utils/common/hash';

onmessage = async (e) => {
  const { blobs, algo } = e.data;
  const algoInstance = getAlgoInstance(algo);

  const loadNext = (index: number) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(blobs[index]);
    reader.onload = (e1: any) => {
      const wordArray = arrayBufferToWordArray(e1.target.result);
      algoInstance.update(wordArray);
      if (index === blobs.length - 1) {
        postMessage(CryptoES.enc.Hex.stringify(algoInstance.finalize()));
        // close();
      } else {
        loadNext(index + 1);
      }
    };
  };
  loadNext(0);
};

export default {};
