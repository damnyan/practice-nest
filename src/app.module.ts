import { Module, UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entites/user.entity';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ResponseInterceptor } from './response.interceptor';
import { ValidationError } from 'class-validator';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'appuser',
      password: 'secret',
      database: 'appdb',
      entities: [User],
      synchronize: false,
    }),
    UserModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        exceptionFactory: (validationErrors: ValidationError[] = []) => {
          return new UnprocessableEntityException(validationErrors);
        },
      })
    }
  ],
})
export class AppModule {}
