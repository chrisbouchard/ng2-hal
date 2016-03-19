export function withOwnMetadata<T>(key: any, target: any, initialValue: T, action: (value: T) => T): void {
  const value = Reflect.getOwnMetadata(key, target) || initialValue;
  Reflect.defineMetadata(key, action(value), target);
}

