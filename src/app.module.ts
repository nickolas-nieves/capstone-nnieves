import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserModule } from './user/user.module';
import { ScooterModule } from './scooter/scooter.module';
import { TripModule } from './trip/trip.module';
import { TransactionModule } from './transaction/transaction.module';
import { LocationModule } from './location/location.module';
import { FeedbackModule } from './feedback/feedback.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BcryptModule } from 'nest-bcrypt';
import { Transaction } from './transaction/entities/transaction.entity';
import { Trip } from './trip/entities/trip.entity';
import { User } from './user/entities/user.entity';
import { Scooter } from './scooter/entities/scooter.entity';
import { Feedback } from './feedback/entities/feedback.entity';
import { Location } from './location/entities/location.entity';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    UserModule,
    ScooterModule,
    TripModule,
    TransactionModule,
    LocationModule,
    FeedbackModule,
    BcryptModule.register({ salt: 8 }),
  ],
  controllers: [AppController],
  providers: [AppService, AuthMiddleware],
})
export class AppModule {}
