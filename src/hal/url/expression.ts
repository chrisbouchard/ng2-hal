import {Value, VariableValue} from './value';

export interface Expression {
  evaluate(mapping: Map<string, any>): string;
  variables(): Set<string>;
}

export class ConstantExpression implements Expression {

  constructor(private value: string) {}

  evaluate(mapping: Map<string, any>): string {
    return value;
  }

  variables(): Set<string> {
    return new Set();
  }

}

export class ExpansionExpression implements Expression {

  constructor(private operation: string, private values: Value[]) {}

}

