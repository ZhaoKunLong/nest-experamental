/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable no-case-declarations */
/* eslint-disable prettier/prettier */
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { LoggerService } from './modules/logger/logger.service';
import { Prisma } from '.prisma/client';

type PrismaClientKnownRequestError = Prisma.PrismaClientKnownRequestError & {
  meta: any;
};

/**
 * Base service to provide basic CRUD functionality for services.
 *
 * Unfortunately, 'any' needs to be used for the repository that is being passed
 * due to the way Prisma is designed.
 * @see https://github.com/prisma/prisma/discussions/3929
 */
export abstract class Service<T, FM, FF, FU, C, CM, U, UM, D, DM, CT, US, G, GO, A, AO> {
  constructor(private readonly loggerService: LoggerService, private readonly repository: any) {}

  async findMany(findManyArgs?: FM): Promise<T[]> {
    try {
      return await this.repository.findMany(findManyArgs);
    } catch (err) {
      this.loggerService.error('Could not find all entities');
      this.loggerService.error(err);
      this.handleError(err);
    }
  }

  async findFirst(findFirstArgs: FF): Promise<T> {
    try {
      return await this.repository.findFirst(findFirstArgs);
    } catch (err) {
      this.loggerService.error('Could not find an entity');
      this.loggerService.error(err);
      this.handleError(err);
    }
  }

  async findUnique(findUniqueArgs: FU): Promise<T> {
    try {
      return await this.repository.findUnique(findUniqueArgs);
    } catch (err) {
      this.loggerService.error('Could not find an entity by unique value');
      this.loggerService.error(err);
      this.handleError(err);
    }
  }

  async create(createArgs: C): Promise<T> {
    try {
      return await this.repository.create(createArgs);
    } catch (err) {
      this.loggerService.error('Could not create entity');
      this.loggerService.error(err);
      this.handleError(err);
    }
  }

  async createMany(createManyArgs: CM): Promise<Prisma.BatchPayload> {
    try {
      return await this.repository.createMany(createManyArgs);
    } catch (err) {
      this.loggerService.error('Could not create many entities');
      this.loggerService.error(err);
      this.handleError(err);
    }
  }

  async update(updateArgs: U): Promise<T> {
    try {
      return await this.repository.update(updateArgs);
    } catch (err) {
      this.loggerService.error('Could not update entity by id');
      this.loggerService.error(err);
      this.handleError(err);
    }
  }

  async updateMany(updateManyArgs: UM): Promise<Prisma.BatchPayload> {
    try {
      return await this.repository.updateMany(updateManyArgs);
    } catch (err) {
      this.loggerService.error('Could not update many entities');
      this.loggerService.error(err);
      this.handleError(err);
    }
  }

  async delete(deleteArgs: D): Promise<T> {
    try {
      return await this.repository.delete(deleteArgs);
    } catch (err) {
      this.loggerService.error('Could not delete entity by id');
      this.loggerService.error(err);
      this.handleError(err);
    }
  }

  async deleteMany(deleteManyArgs: DM): Promise<Prisma.BatchPayload> {
    try {
      return await this.repository.deleteMany(deleteManyArgs);
    } catch (err) {
      this.loggerService.error('Could not delete many entities');
      this.loggerService.error(err);
      this.handleError(err);
    }
  }

  async count(countArgs: CT): Promise<number> {
    try {
      return await this.repository.count(countArgs);
    } catch (err) {
      this.loggerService.error('Could not count entities');
      this.loggerService.error(err);
      this.handleError(err);
    }
  }

  async upsert(upsertArgs: US): Promise<T> {
    try {
      return await this.repository.upsert(upsertArgs);
    } catch (err) {
      this.loggerService.error('Could not upsert entity');
      this.loggerService.error(err);
      this.handleError(err);
    }
  }

  async groupBy(groupByArgs: G): Promise<GO> {
    try {
      return await this.repository.groupBy(groupByArgs);
    } catch (err) {
      this.loggerService.error('Could not group by entities');
      this.loggerService.error(err);
      this.handleError(err);
    }
  }

  async aggregate(aggregateArgs: A): Promise<AO> {
    try {
      return await this.repository.aggregate(aggregateArgs);
    } catch (err) {
      this.loggerService.error('Could not aggregate entities');
      this.loggerService.error(err);
      this.handleError(err);
    }
  }

  /**
   * Custom error message for Prisma Client (Query Engine) error
   * which starts with 'P2'
   * @see https://www.prisma.io/docs/reference/api-reference/error-reference
   */
  private handleError(err: PrismaClientKnownRequestError): void {
    if (!err.code?.startsWith('P')) {
      throw new InternalServerErrorException(err);
    }

    let errorMessage;

    switch (err.code) {
      case 'P2000':
        errorMessage = `The provided value for the column is too long for the column's type. Column: ${err.meta?.column_name}`;
        break;
      case 'P2001':
        errorMessage = `The record searched for in the where condition (${err.meta?.model_name}.${err.meta?.argument_name} = ${err.meta?.argument_value}) does not exist"`;
        break;
      case 'P2002':
        // Add spaces to camel case
        const regex = /([A-Z])/g;
        // Unique constraint errors, for example: mobile, email, name etc.
        errorMessage =
          err.meta?.target?.length === 1
            ? `${err.meta.target[0]} already exists`
            : `Unique constraint failed on the (${err.meta?.target.join(', ').replace(regex, ' $1').toLowerCase()})`;
        break;
      case 'P2003':
        errorMessage = `Foreign key constraint failed on the field: ${err.meta?.field_name}`;
        break;
      case 'P2004':
        errorMessage = `A constraint failed on the database: ${err.meta?.database_error}`;
        break;
      case 'P2005':
        errorMessage = `The value ${err.meta?.field_value} stored in the database for the field ${err.meta?.field_name} is invalid for the field's type`;
        break;
      case 'P2006':
        errorMessage = `The provided value ${err.meta?.field_value} for ${err.meta?.model_name} field ${err.meta?.field_name} is not valid`;
        break;
      case 'P2007':
        errorMessage = `Data validation error ${err.meta?.database_error}`;
        break;
      case 'P2008':
        errorMessage = `Failed to parse the query ${err.meta?.query_parsing_error} at ${err.meta?.query_position}`;
        break;
      case 'P2009':
        errorMessage = `Failed to validate the query: ${err.meta?.query_validation_error} at ${err.meta?.query_position}`;
        break;
      case 'P2010':
        errorMessage = `Raw query failed`;
        break;
      case 'P2011':
        errorMessage = `Null constraint violation on the ${err.meta?.target[0]}`;
        break;
      case 'P2012':
        errorMessage = `Missing a required value at ${err.meta?.path}`;
        break;
      case 'P2013':
        errorMessage = `Missing the required argument ${err.meta?.argument_name} for field ${err.meta?.field_name} on ${err.meta?.object_name}.`;
        break;
      case 'P2014':
        errorMessage = `The change you are trying to make would violate the required relation between the ${err.meta?.model_a_name} and ${err.meta?.model_b_name} models`;
        break;
      case 'P2015':
        errorMessage = `A related record could not be found. ${err.meta?.details}`;
        break;
      case 'P2016':
        errorMessage = `Query interpretation error. ${err.meta?.details}`;
        break;
      case 'P2017':
        errorMessage = `The records for relation ${err.meta?.relation_name} between the ${err.meta?.parent_name} and ${err.meta?.child_name} models are not connected`;
        break;
      case 'P2018':
        errorMessage = `The required connected records were not found. ${err.meta?.details}`;
        break;
      case 'P2019':
        errorMessage = `Input error. ${err.meta?.details}`;
        break;
      case 'P2020':
        errorMessage = `Value out of range for the type. ${err.meta?.details}`;
        break;
      case 'P2022':
        errorMessage = `The column ${err.meta?.column} does not exist in the current database`;
        break;
      case 'P2023':
        errorMessage = `Inconsistent column data: ${err.message}`;
        break;
      case 'P2025':
        errorMessage = `${err.meta?.cause}`;
        break;
      default:
        errorMessage = `Prisma error. Code: ${err.code}`;
        break;
    }

    throw new BadRequestException(errorMessage);
  }
}
