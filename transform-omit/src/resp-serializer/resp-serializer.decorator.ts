import { SetMetadata } from '@nestjs/common';
import { RespSerializerOptions } from './resp-serializer.interceptor';
import { CLASS_SERIALIZER_OPTIONS } from './resp-serialzer.constants';

export const RespSerializeOptions = (options: RespSerializerOptions) =>
  SetMetadata(CLASS_SERIALIZER_OPTIONS, options);
