export class UrlTemplate {

  private expressions: Expression[];

  constructor(private template: string) {
    this.variables = new Set();
  }

  function variables(): Iterable<string>;

}

interface Expression {
  function evaluate(mapping: Map<string, string>): string;
  function variables(): Iterable<string>;
}

class ConstantExpression implements Expression {

  constructor(private value: string);

  function evaluate(mapping: Map<string, string>): string {
    return value;
  }

  function variables(): Iterable<string> {
    return [];
  }

}

