import { Param, ParseIntPipe } from '@nestjs/common';

export const IntParam = (name: string): ParameterDecorator => Param(name, ParseIntPipe);
