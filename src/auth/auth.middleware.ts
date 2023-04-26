import { EntityManager } from '@mikro-orm/mysql';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
  Req,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { User } from 'src/user/entities/user.entity';
import { BcryptService } from 'nest-bcrypt';
import { CustomRequest } from 'src/custom-request.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly em: EntityManager,
    private readonly bcryptService: BcryptService,
  ) {}

  async use(@Req() req: CustomRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const credentials = Buffer.from(
        authHeader.split(' ')[1],
        'base64',
      ).toString('utf-8');
      const [username, password] = credentials.split(':');

      const user = await this.em.findOne(User, {
        email_address: username,
      });

      if (!user)
        return next(new HttpException('Not Found', HttpStatus.FORBIDDEN));

      if (user && this.bcryptService.compareSync(password, user.password)) {
        req.user = user;
        console.log(req.user, user)
        return next();
      }
    }
    return next(new HttpException('Forbidden', HttpStatus.FORBIDDEN));
  }
}

@Injectable()
export class AdminAuthMiddleware implements NestMiddleware {
  constructor(
    private readonly em: EntityManager,
    private readonly bcryptService: BcryptService,
  ) {}

  async use(@Req() req: CustomRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const credentials = Buffer.from(
        authHeader.split(' ')[1],
        'base64',
      ).toString('utf-8');
      const [username, password] = credentials.split(':');

      const user = await this.em.findOne(User, {
        email_address: username,
      });

      if (!user)
        return next(new HttpException('Forbidden', HttpStatus.FORBIDDEN));

      if (
        user &&
        user.isAdmin &&
        this.bcryptService.compareSync(password, user.password)
      ) {
        req.user = user;
        return next();
      }
    }
    return next(new HttpException('Forbidden', HttpStatus.FORBIDDEN));
  }
}
