export type ConversionIndex = keyof typeof conversionTable;

export const conversionTable = {
  b: 0,
  kb: 1,
  mb: 2,
  gb: 3,
  tb: 4,
};

export type ByteConverterParams = {
  from: ConversionIndex;
  to: ConversionIndex;
  num: number;
};

export const byteConverter = (params: ByteConverterParams) => {
  const { from, to, num } = params;
  if (from === to) return num;

  const fromIndex = conversionTable[from];
  const toIndex = conversionTable[to];

  const absoluteDiff = Math.abs(toIndex - fromIndex);

    return fromIndex > toIndex
      ? num * Math.pow(1024, absoluteDiff)
      : num / Math.pow(1024, absoluteDiff);
};
