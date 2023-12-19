/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { registerDecorator, ValidationOptions, ValidationArguments, isDateString } from 'class-validator';

const isoUtcRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/;

export function IsISODateString(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsISODateString',
      target: object.constructor,
      propertyName,
      constraints: [propertyName],
      options: {
        message: `${propertyName} must be iso date string format`,
        ...validationOptions,
      },
      validator: {
        /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
        validate(value: any, args: ValidationArguments) {
          return isDateString(value, { strict: true }) && isoUtcRegex.test(value);
        },
      },
    });
  };
}
