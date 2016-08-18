import { override } from 'core-decorators';

/**
 *
 */
export class HalError {
  constructor(public status: number, public message: string) {}

  @override
  toString(): string {
    return `${this.status}: ${this.message}`;
  }
}

