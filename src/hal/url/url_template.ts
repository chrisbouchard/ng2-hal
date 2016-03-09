export class UrlTemplate {

  private expressions: Expression[];

  constructor(private template: string) {
    this.variables = new Set();
  }

  variables(): Set<string>;

}


interface Expression {
  evaluate(mapping: Map<string, string>): string;
  variables(): Set<string>;
}

class ConstantExpression implements Expression {

  constructor(private value: string) {}

  evaluate(mapping: Map<string, string>): string {
    return value;
  }

  variables(): Set<string> {
    return new Set();
  }

}

class ExpansionExpression implements Expression {

  constructor(private operation: string, private values: Value[]) {}
}


interface Value {
  variable: string;
  evaluate(mapping: Map<string, string>): string;
}

class Variable {
  constructor(private 
}

