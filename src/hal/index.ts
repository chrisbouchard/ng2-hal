export {ValueType as UriValueType} from 'uri-templates';

import {HalClient} from './client';
export {HalClient};

export {HalEmbedded} from './embedded';
export {HalError} from './error';
export {HalFactory} from './factory';
export {HalFieldMetadata, HalField} from './field';
export {HalLinked} from './linked';
export {HalResource} from './resource';

export const HAL_PROVIDERS: any[] = [ HalClient ];

