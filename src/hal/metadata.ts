function getMetadataPropertyMap<T>(key: any, target: any): Map<string | symbol, T> {
  if (Reflect.hasOwnMetadata(key, target)) {
    return Reflect.getOwnMetadata(key, target);
  }

  let links = new Map<string | symbol, T>();
  Reflect.defineMetadata(key, links, target);
  return links;
}

