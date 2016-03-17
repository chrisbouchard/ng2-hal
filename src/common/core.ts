export interface AnyConstructor<T> {
  new(...args: any[]): T;
}

export function arrayify(value: any): any[] {
  if (Array.isArray(value)) {
    return Array.from(value);
  }

  return [value];
}

export function construct<T>(ctor: AnyConstructor<T>, ...fixedArgs: any[]): (...args: any[]) => T {
  return (...args: any[]) => new ctor(...args, ...fixedArgs);
}

export function mapToObject<T>(map: Map<string, T>): { [key: string]: T } {
  let obj: { [key: string]: T } = {};

  for (let [key, value] of map) {
    obj[key] = value;
  }

  return obj;
}

export function projectArray<T>(array: T[], type: any): any {
  switch (type) {
    case Array:
      return array;
    case Map:
      return new Map(array.entries());
    case Set:
      return new Set(array);
  }

  return array[0];
}

