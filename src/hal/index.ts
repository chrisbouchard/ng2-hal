import {HalClient} from './client';
export {HalClient};

export {HalEmbedded} from './embedded';
export {HalError} from './error';
export {HalFactory} from './factory';
export {HalLinked} from './linked';
export {HalResource} from './resource';

export const HAL_PROVIDERS: Array<any> = [ HalClient ];

