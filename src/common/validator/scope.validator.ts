import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
  } from 'class-validator';
  
  const ALLOWED_SCOPES = [
    'transfer.read',
    'workitem.create',
  ];
  
  export function IsValidScopes(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
      registerDecorator({
        name: 'IsValidScopes',
        target: object.constructor,
        propertyName,
        options: validationOptions,
        validator: {
          validate(value: any) {
            if (typeof value !== 'string') {
              return false;
            }
  
            const scopes = value
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean);
  
            // Must contain at least one scope
            if (scopes.length === 0) {
              return false;
            }
  
            // No duplicates
            if (new Set(scopes).size !== scopes.length) {
              return false;
            }
  
            // Every scope must be allowed
            return scopes.every((scope) =>
              ALLOWED_SCOPES.includes(scope),
            );
          },
  
          defaultMessage(args: ValidationArguments) {
            return `${args.property} must be a comma-separated list containing only: transfer.read, workitem.create`;
          },
        },
      });
    };
  }