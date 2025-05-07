import { createChunk } from './chunk';

onmessage = async (e) => {
  const { file, chunkSize, start, end } = e.data;
  const result = [];
  for (let i = start; i < end; i += 1) {
    const prom: Promise<ChunkItem> = createChunk(file, i, chunkSize);
    result.push(prom);
  }

  const chunks = await Promise.all(result);
  postMessage(chunks);
};

export default {};
