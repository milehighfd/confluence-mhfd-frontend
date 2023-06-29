export const areObjectsDifferent = (obj1: any, obj2: any) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return true;
  }

  for (let key of keys1) {
    if (!obj2.hasOwnProperty(key)) {
      return true;
    }

    const value1 = obj1[key];
    const value2 = obj2[key];

    if (Array.isArray(value1) && Array.isArray(value2)) {
      if (!areArraysEqual(value1, value2)) {
        return true;
      }
    } else if (value1 !== value2) {
      return true;
    }
  }

  return false;
};

const areArraysEqual = (arr1: any[], arr2: any[]) => {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    const item1 = arr1[i];
    const item2 = arr2[i];

    if (Array.isArray(item1) && Array.isArray(item2)) {
      if (!areArraysEqual(item1, item2)) {
        return false;
      }
    } else if (item1 !== item2) {
      return false;
    }
  }

  return true;
};
