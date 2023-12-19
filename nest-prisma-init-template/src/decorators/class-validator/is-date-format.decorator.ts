/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import moment from 'moment';

export function IsDateTimeFormat(format: string, validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsDateTimeFormat',
      target: object.constructor,
      propertyName,
      constraints: [propertyName, format],
      options: {
        message: `${propertyName} must be ${format} format`,
        ...validationOptions,
      },
      validator: {
        /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
        validate(value: any, args: ValidationArguments) {
          return moment(value, format, true).isValid();
        },
      },
    });
  };
}
