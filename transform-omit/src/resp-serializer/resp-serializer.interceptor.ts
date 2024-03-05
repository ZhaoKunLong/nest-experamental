import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Type,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { plainToClass } from 'class-transformer';
import { Observable, map } from 'rxjs';
import { CLASS_SERIALIZER_OPTIONS } from './resp-serialzer.constants';

export interface RespSerializerOptions {
  Role: string[];
  RespClass: any;
}

@Injectable()
export class RespSerializerInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // console.log(this.reflector.get<string>('returnType', context.getHandler()));
    // console.log(context.getType());
    // const targetClass = context.getClass();
    // const targetMethodName = context.getHandler().name;
    // const targetMethod = context.getHandler();
    // const metadataKeys = Reflect.getMetadataKeys(
    //   targetClass.prototype,
    //   targetMethodName,
    // );
    // console.log(metadataKeys);

    // const returnType = Reflect.getMetadata(
    //   metadataKeys[0],
    //   targetClass.prototype,
    //   targetMethodName,
    // );

    // console.log(returnType.name);

    // console.log(Reflect.getMetadataKeys(context.getHandler()));
    // const option = this.reflector.get('option', context.getHandler());
    // console.log(option);
    // // console.log(this.reflector.getAll('*', context.getType()));
    // console.log(context);
    // return next.handle();

    const option = this.getContextOptions(context);
    if (this.isEnabledRole(context, option)) {
      return next.handle().pipe(map((res) => this.transformResp(option, res)));
    }
    return next.handle();
  }

  transformResp(option: RespSerializerOptions, resp: any): any {
    console.log(option, resp);
    return plainToClass(option.RespClass, resp);
  }

  private isEnabledRole(
    context: ExecutionContext,
    option: RespSerializerOptions,
  ) {
    const request = context.switchToHttp().getRequest();
    request.user = { name: 'xx', role: 'user' };
    console.log(request.user);
    const user = request.user;
    return option?.Role?.includes(user.role);
  }

  // 通过 setMetaData 将配置注入。 类型也是一个配置项参数。
  private getContextOptions(
    context: ExecutionContext,
  ): RespSerializerOptions | undefined {
    return (
      this.reflectSerializeMetadata(context.getHandler()) ||
      this.reflectSerializeMetadata(context.getClass())
    );
  }

  private reflectSerializeMetadata(
    obj: Type<any> | Function,
  ): RespSerializerOptions | undefined {
    return this.reflector.get(CLASS_SERIALIZER_OPTIONS, obj);
  }
}
