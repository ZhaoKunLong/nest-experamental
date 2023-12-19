import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import _ from 'lodash';
import qs from 'qs';

function cleanQuery(query: any, operators: any, filters: any): any {
  if (Array.isArray(query)) {
    return query.map((value) => cleanQuery(value, operators, filters));
  }

  if (_.isObject(query) && query.constructor === {}.constructor) {
    const result: { [key: string]: any } = {};

    _.each(query, (value: string | any[] | Record<string, any>, key) => {
      if (key[0] === '$') {
        if (['$in', '$nin', '$all'].includes(key) && typeof value === 'string') {
          // eslint-disable-next-line no-param-reassign
          value = value.indexOf(',') !== -1 ? (value as string).split(',').map((v) => v.trim()) : [value];
        }

        // If the key is $query then make it incase-sensitive
        if (key === '$regex' && typeof value === 'string') {
          // eslint-disable-next-line no-param-reassign
          value = new RegExp(_.escapeRegExp(value as string), 'i');
        }
      }
      if (key === 'contains') {
        // eslint-disable-next-line no-param-reassign
        value = `~${value}`;
      }

      // Query again
      result[key] = cleanQuery(value, operators, filters);
    });

    Object.getOwnPropertySymbols(query).forEach((symbol) => {
      result[symbol as any] = query[symbol];
    });
    // Return the resolve result one by one
    return result;
  }

  // Use tilde character (~) to prevent parsing.
  if (typeof query === 'string' && query[0] === '~') {
    // eslint-disable-next-line no-param-reassign
    query = query.slice(1);
  } else if (typeof query === 'string') {
    // Parse dates
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/g.test(query)) {
      // eslint-disable-next-line no-param-reassign
      query = new Date(query);
    }

    // Parse booleans
    if (['true', 'false'].includes(query)) {
      // eslint-disable-next-line no-param-reassign
      query = query === 'true';
    }

    // Parse floats
    if (/^-?\d+\.\d+$/g.test(query)) {
      // eslint-disable-next-line no-param-reassign
      query = parseFloat(query);
    }

    // Parse integers
    if (/^-?\d+$/g.test(query)) {
      // eslint-disable-next-line no-param-reassign
      query = Number(query);
    }

    // Parse null
    if (query === 'null') {
      // eslint-disable-next-line no-param-reassign
      query = null;
    }
  }

  // Resolve the value
  return query;
}

const OPERATORS = ['$in', '$nin', '$lt', '$lte', '$gt', '$gte', '$ne', '$or', '$regex', '$all'];

// Converts Feathers special query parameters and pagination settings
// and returns them separately a `filters` and the rest of the query
// as `query`
function filterQuery(query: any, options: any = {}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { filters: additionalFilters = {}, operators: additionalOperators = [] } = options;
  const result: { [key: string]: any } = {};

  result.query = cleanQuery(query, OPERATORS.concat(additionalOperators), result.filters);
  return result.query;
}

/**
 * A wrapper method for the above code, taken from the feathersjs codebase.
 */
export const FilterQuery = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  if (request.method.toUpperCase() === 'GET') {
    const rawQueryString = request.url.split('?')[1];
    request.query = qs.parse(rawQueryString, { depth: 16 });
    return filterQuery(request.query, {
      paginate: {
        default: 20,
        max: 50,
      },
    });
  }
});
