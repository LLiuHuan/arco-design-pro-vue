export interface BigFileUploadModel {
  chunk: Blob;
  hash: string;
  index: number;
  start: number;
  end: number;
}
