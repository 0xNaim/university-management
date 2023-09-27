type AnyObject = Record<string, unknown>;

/**
 * Picks specified keys from an object and returns a new object with only those keys.
 *
 * @param sourceObj - The source object.
 * @param keysToPick - An array of keys to pick from the source object.
 * @returns A new object containing only the picked keys.
 */
const pickKeys = <T extends AnyObject, K extends keyof T>(sourceObj: T, keysToPick: K[]): Partial<T> => {
  const pickedObj: Partial<T> = {};

  for (const key of keysToPick) {
    if (sourceObj && Object.prototype.hasOwnProperty.call(sourceObj, key)) {
      pickedObj[key] = sourceObj[key];
    }
  }

  return pickedObj;
};

export default pickKeys;
