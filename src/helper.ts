export declare type ObjectMap = {
  [index in string | number]: any;
};

/**
 * Map object keys.
 *
 * @param obj
 * @param mapping
 * @returns Object
 */
export function mapObjectKeys(obj: ObjectMap, mapping: ObjectMap): Object {
  return Object.keys(obj).map((key) => {
    let newKey = mapping[key];

    return { [newKey]: obj[key] };
  }).reduce((a, b) => Object.assign({}, a, b));
};
