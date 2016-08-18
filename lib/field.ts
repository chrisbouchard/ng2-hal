import { Type } from '@angular/core';

const HAL_COOKED_FIELD_METADATA_KEY = Symbol('halCookedFieldMetadataKey');
const HAL_RAW_FIELD_METADATA_KEY = Symbol('halRawFieldMetadataKey');

export enum HalFieldSection {
  EMBEDDED, LINKS, RESOURCE
}

export interface HalFieldTypeMetadata {
  type?: Type | Type[];
  collection?: Type;
}

export interface HalFieldMetadata extends HalFieldTypeMetadata {
  name?: string;
  section?: HalFieldSection;
}

export class HalFieldDescription {
  rawName: string;
  cookedName: string;

  typeDescription: HalFieldTypeDescription;

  section: HalFieldSection = HalFieldSection.RESOURCE;

  constructor(key: string, arg: string | Type | HalFieldMetadata) {
    this.rawName = key;
    this.cookedName = key;

    if (arg instanceof String) {
      this.rawName = arg;
      this.typeDescription = new HalFieldTypeDescription({});
    }
    else if (arg instanceof Function) {
      this.typeDescription = new HalFieldTypeDescription(arg as Type);
    }
    else {
      let metadata = (arg as HalFieldMetadata) || {};

      if (metadata.name !== undefined) {
        this.rawName = metadata.name;
      }

      if (metadata.section !== undefined) {
        this.section = metadata.section;
      }

      this.typeDescription = new HalFieldTypeDescription(metadata);
    }
  }
}

export class HalFieldTypeDescription {
  type: Type | Type[];
  collection: Type;

  constructor(arg: Type | HalFieldTypeMetadata) {
    if (arg instanceof Function) {
      this.type = arg as Type;
    }
    else {
      let metadata = (arg as HalFieldTypeMetadata) || {};

      this.type = metadata.type;
      this.collection = metadata.collection;
    }
  }

  getElementTypeDescription(): HalFieldTypeDescription {
    if (!this.collection) {
      throw new TypeError('This HalFieldTypeDescription does not describe a collection.');
    }

    return new HalFieldTypeDescription({
      type: this.type
    });
  }
}

export function HalField(arg: string | Type | HalFieldMetadata): PropertyDecorator {
  return (target, key) => {
    if (typeof key === 'string') {
      let description = new HalFieldDescription(key, arg);
      defineDescriptionMetadata(description, target);
    }
    else {
      throw new TypeError('The @HalField decorator can only be applied to a field whose name is a String');
    }
  };
}

export function HalEmbedded(arg: string | Type | HalFieldMetadata): PropertyDecorator {
  return (target, key) => {
    if (typeof key === 'string') {
      let description = new HalFieldDescription(key, arg);
      description.section = HalFieldSection.EMBEDDED;
      defineDescriptionMetadata(description, target);
    }
    else {
      throw new TypeError('The @HalEmbedded decorator can only be applied to a field whose name is a String');
    }
  };
}

export function HalLink(arg: string | Type | HalFieldMetadata): PropertyDecorator {
  return (target, key) => {
    if (typeof key === 'string') {
      let description = new HalFieldDescription(key, arg);
      description.section = HalFieldSection.LINKS;
      defineDescriptionMetadata(description, target);
    }
    else {
      throw new TypeError('The @HalLink decorator can only be applied to a field whose name is a String');
    }
  };
}


function defineDescriptionMetadata(description: HalFieldDescription, target: any): void {
  Reflect.defineMetadata(HAL_COOKED_FIELD_METADATA_KEY, description, target.constructor, description.cookedName);
  Reflect.defineMetadata(HAL_RAW_FIELD_METADATA_KEY, description, target.constructor, description.rawName);
}

export function getCookedFieldDescription(target: any, key: string): HalFieldDescription {
  return Reflect.getMetadata(HAL_COOKED_FIELD_METADATA_KEY, target, key) || new HalFieldDescription(key, undefined);
}

export function getRawFieldDescription(target: any, key: string): HalFieldDescription {
  return Reflect.getMetadata(HAL_RAW_FIELD_METADATA_KEY, target, key) || new HalFieldDescription(key, undefined);
}

