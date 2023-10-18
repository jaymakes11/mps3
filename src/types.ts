export type DeleteValue = undefined;

export interface Ref {
  bucket?: string;
  key: string;
}

export interface ResolvedRef extends Ref {
  bucket: string;
  key: string;
}

export type UUID = string;
export type VersionId = string;

export const uuid = (): UUID => crypto.randomUUID();
export const countKey = (number: number): string => number.toString(36).padStart(4, "0");
export const eq = (a: Ref, b: Ref) => a.bucket === b.bucket && a.key === b.key;
export const url = (ref: Ref): string => `${ref.bucket}/${ref.key}`;
export const parseUrl = (url: string): ResolvedRef => {
  const [bucket, ...key] = url.split("/");
  return {
    bucket,
    key: key.join("/"),
  };
};
