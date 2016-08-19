declare interface RequireStatic {
  <T>(path: string): T;
  (paths: string[], callback: (...modules: any[]) => void): void;
  ensure(paths: string[], callback: (require: <T>(path: string) => T) => void): void;
  context(directory: string, useSubdirectories?: boolean, regExp?: RegExp): RequireContext;
}

declare interface RequireContext {
  keys(): string[];
  id: number;
  <T>(path: string): T;
}

declare var require: RequireStatic;

