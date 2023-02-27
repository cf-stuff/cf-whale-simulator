import LZString from "./lib/lz-string.min.js";

export const save = build => {
  const key = build.name;
  const compressed = LZString.compressToUTF16(JSON.stringify(build));
  localStorage.setItem(key, compressed);
}

export const load = key => {
  const compressed = localStorage.getItem(key);
  return compressed ? JSON.parse(LZString.decompressFromUTF16(compressed)) : null;
}

export const remove = key => {
  localStorage.removeItem(key);
}

export const getSavedKeys = () => Object.keys(localStorage)
  .filter(key => key !== "debug" || localStorage.getItem(key) !== "honey:core-sdk:*").sort();
