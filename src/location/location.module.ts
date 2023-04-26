import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { AdminAuthMiddleware } from 'src/auth/auth.middleware';
import { BcryptModule } from 'nest-bcrypt';

@Module({
  imports: [BcryptModule.register({ salt: 8 })],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminAuthMiddleware)
      .forRoutes(
        { path: 'location', method: RequestMethod.GET },
        { path: 'location', method: RequestMethod.PATCH },
        { path: 'location', method: RequestMethod.DELETE },
        { path: 'location', method: RequestMethod.POST },
      );
  }
}
