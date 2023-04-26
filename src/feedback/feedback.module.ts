import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { AdminAuthMiddleware, AuthMiddleware } from 'src/auth/auth.middleware';
import { BcryptModule } from 'nest-bcrypt';

@Module({
  imports: [BcryptModule.register({ salt: 8 })],
  controllers: [FeedbackController],
  providers: [FeedbackService],
})
export class FeedbackModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminAuthMiddleware)
      .forRoutes(
        { path: 'feedback', method: RequestMethod.GET },
        { path: 'feedback', method: RequestMethod.PATCH },
        { path: 'feedback', method: RequestMethod.DELETE },
      );

    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'feedback', method: RequestMethod.POST });
  }
}
