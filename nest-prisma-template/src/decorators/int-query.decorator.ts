import { Query, ParseIntPipe } from '@nestjs/common';

export const IntQuery = (name: string): ParameterDecorator => Query(name, ParseIntPipe);
