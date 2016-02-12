export function getMetadataPropertyMap<T>(key: any, target: any): Map<string | symbol, T> {
  let map: Map<string | symbol, T>;

  if (Reflect.hasOwnMetadata(key, target)) {
    map = Reflect.getOwnMetadata(key, target);
  }
  else {
    map = Reflect.getMetadata(key, target) || new Map();
    Reflect.defineMetadata(key, map, target);
  }

  return map;
}

