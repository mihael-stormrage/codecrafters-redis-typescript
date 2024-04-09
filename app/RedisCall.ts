import Commands, { ComKey } from './commands.ts';

class RedisCall {
  readonly length: number;
  readonly method: (...args: string[]) => string;
  argumentsList: string[] = [];

  constructor(public command: ComKey) {
    this.method = Commands[command];
    this.length = this.method.length;
  }

  get isWaitingArgs() {
    return this.argumentsList.length < this.length;
  }

  get query() {
    return `${this.method.name} ${this.argumentsList.join(' ')}`;
  }

  get call() {
    return () => this.method(...this.argumentsList);
  }

  exec = () => this.call();

  push(arg: typeof this.argumentsList[number]) {
    if (!this.isWaitingArgs) {
      throw new Error(`Too many arguments: ${this.query}`);
    }
    this.argumentsList.push(arg);
  }
}

export default RedisCall;
