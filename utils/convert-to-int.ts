const convertToInt = (value: string | null) => {
  if (value == null) {
    return undefined;
  }
  const parsed = parseInt(value, 10);
  return parsed;
};

export default convertToInt;
