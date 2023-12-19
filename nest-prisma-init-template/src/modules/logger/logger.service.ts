import { ConsoleLogger, Injectable, LogLevel, Scope } from '@nestjs/common';
import _ from 'lodash';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends ConsoleLogger {
  /**
   *
   * Override the format pid
   * @param pid
   * @returns
   */
  protected formatPid(pid: number): string {
    return `[${process.env.APP_NAME}] ${pid}  - `;
  }

  /**
   *
   * Override the message body string
   * @param message
   * @param logLevel
   * @returns
   */
  protected stringifyMessage(message: unknown, logLevel: LogLevel): string {
    if (_.isFunction(message)) {
      return this.stringifyMessage(message(), logLevel);
    }

    if (_.isPlainObject(message) || Array.isArray(message)) {
      return `${this.colorize('Object:', logLevel)}\n${JSON.stringify(
        message,
        (key, value) => (typeof value === 'bigint' ? value.toString() : value),
        2,
      )}\n`;
    }
    return this.colorize(message as string, logLevel);
  }

  /**
   * Override the format message
   * @param logLevel
   * @param message
   * @param pidMessage
   * @param formattedLogLevel
   * @param contextMessage
   * @param timestampDiff
   * @returns
   */
  protected formatMessage(
    logLevel: LogLevel,
    message: unknown,
    pidMessage: string,
    formattedLogLevel: string,
    contextMessage: string,
    timestampDiff: string,
  ): string {
    const output = this.stringifyMessage(message, logLevel);
    pidMessage = this.colorize(pidMessage, logLevel);
    formattedLogLevel = this.colorize(formattedLogLevel, logLevel);
    return `${pidMessage}${this.getTimestamp()} ${contextMessage}${output}${timestampDiff}\n`;
  }
}
