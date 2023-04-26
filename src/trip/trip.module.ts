import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TripService } from './trip.service';
import { TripController } from './trip.controller';
import { AdminAuthMiddleware, AuthMiddleware } from 'src/auth/auth.middleware';
import { BcryptModule } from 'nest-bcrypt';

@Module({
  imports: [BcryptModule.register({ salt: 8 })],
  controllers: [TripController],
  providers: [TripService],
})
export class TripModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminAuthMiddleware)
      .forRoutes(
        { path: 'trip', method: RequestMethod.GET },
        { path: 'trip', method: RequestMethod.PATCH },
        { path: 'trip', method: RequestMethod.DELETE },
      );

    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'trip', method: RequestMethod.POST });
  }
}
