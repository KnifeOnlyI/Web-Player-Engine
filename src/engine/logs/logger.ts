import {LogLevel} from './log-level.ts';

export class Logger {
    constructor(private readonly name: string) {
    }

    log(level: LogLevel, message: string): void {
        switch (level) {
            case LogLevel.DEBUG:
                console.debug(`[${this.name}] ${message}`);
                break;
            case LogLevel.INFO:
                console.info(`[${this.name}] ${message}`);
                break;
            case LogLevel.WARNING:
                console.warn(`[${this.name}] ${message}`);
                break;
            case LogLevel.ERROR:
                console.error(`[${this.name}] ${message}`);
                break;
        }
    }

    debug(message: string): void {
        this.log(LogLevel.DEBUG, message);
    }

    info(message: string): void {
        this.log(LogLevel.INFO, message);
    }

    warn(message: string): void {
        this.log(LogLevel.WARNING, message);
    }

    error(message: string): void {
        this.log(LogLevel.ERROR, message);
    }

}