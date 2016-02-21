interface ObjectConstructor {
  values(object: any): any[];
  entries(object: any): [string, any][];
  getOwnPropertyDescriptors(object: any): PropertyDescriptorMap;
}

