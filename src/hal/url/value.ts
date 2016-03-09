export abstract class Value {
  variable: string;

  abstract evaluate_string(value: string, named: boolean): string;
  abstract evaluate_list(value: string[], named: boolean): string[];
  abstract evaluate_map(value: [string, string][], named: boolean): string[];

  evaluate(value: any, named: boolean): string[] {
    if (!(value instanceof String) && Symbol.iterator in value) {
      let array = Array.from(value);

      if (array.length > 0 && array[0] instanceof Array) {
        return this.evaluate_map(array, named);
      }

      return this.evaluate_list(array.map(x => x.toString()), named);
    }

    return [this.evaluate_string(value.toString(), named)];
  }
}

export function parse_value(str: string): Value {
  return undefined;
}

class VariableValue extends Value {
  constructor(public variable: string) {}

  evaluate_string(value: string, named: boolean): string {
    return (named ? this.variable + '=' : '') + value;
  }

  evaluate_list(value: string[], named: boolean): string[] {
    return [(named ? this.variable + '=' : '') + value.join()];
  }

  evaluate_map(value: [string, string][]): string[] {
    return [
      (named ? this.variable + '=' : '') +
        value.reduce((x, y) => x.concat(y)).join()
    ];
  }
}

class ExplodeValue extends Value {
  constructor(public variable: string) {}

  evaluate_string(value: string): string {
    return (named ? this.variable + '=' : '') + value;
  }

  evaluate_list(value: string[]): string[] {
    return value.map(x => (named ? this.variable + '=' : '') + x);
  }

  evaluate_map(value: [string, string][]): string[] {
    return value.map(([k, v]) => k + '=' + v);
  }
}

class PrefixValue {
  constructor(public variable: string, private length: number) {}

  evaluate(value: string): string {
    return (named ? this.variable + '=' : '') + value.substr(0, this.length);
  }

  evaluate_list(value: string[]): string[] {
    return undefined;
  }

  evaluate_map(value: [string, string][]): string[] {
    return undefined;
  }
}

