export type DetectType = 'face' | 'person';

export interface UploadImageDTO {
  file: File;
  type: DetectType;
}