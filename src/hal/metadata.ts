export function getMetadataPropertyMap<T>(key: any, target: any): Map<string | symbol, T> {
  let map: Map<string | symbol, T>;

  if (Reflect.hasOwnMetadata(key, target)) {
    map = Reflect.getOwnMetadata(key, target);
  }
  else {
    map = new Map<string | symbol, T>(Reflect.getMetadata(key, target));
    Reflect.defineMetadata(key, map, target);
  }

  return map;
}

