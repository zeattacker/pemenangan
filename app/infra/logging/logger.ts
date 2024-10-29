export interface ILogger {
  error(message: string, meta?: object): void;
  info(message: string, meta?: object): void;
}

export class ConsoleLogger implements ILogger {
  error(message: string, meta?: object) {
    console.error(message, meta);
  }

  info(message: string, meta?: object) {
    console.info(message, meta);
  }
}
