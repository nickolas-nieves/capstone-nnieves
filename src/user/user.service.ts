import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityManager } from '@mikro-orm/mysql';
import { User } from './entities/user.entity';
import { AppService } from 'src/app.service';
import { BcryptService } from 'nest-bcrypt';

@Injectable()
export class UserService {
  constructor(
    private readonly em: EntityManager,
    private readonly bcryptService: BcryptService,
  ) {}

  public async hashData(data: string) {
    return this.bcryptService.hash(data, 10);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.em.create(User, createUserDto);
    user.password = await this.bcryptService.hashSync(
      createUserDto.password,
      8,
    );
    await this.em.persistAndFlush(user);
    return user;
  }

  //Returns all Users and returns a Promise of that type
  findAll(): Promise<User[]> {
    return this.em.find(User, {});
  }

  //Returns one User by passed id as a Promise of that type
  findOne(id: string): Promise<User> {
    return this.em.findOneOrFail(User, { user_id: id });
  }

  //Updates all provided properties of User by passed id
  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.em.findOne(User, { user_id: id });

    if (user) {
      if (updateUserDto.full_name) user.full_name = updateUserDto.full_name;
      if (updateUserDto.email_address)
        user.email_address = updateUserDto.email_address;
      if (updateUserDto.password) user.password = updateUserDto.password;
      if (updateUserDto.balance) user.balance = updateUserDto.balance;
      this.em.persistAndFlush(user);
      return user;
    }
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }

  //Removes User by passed id and cascades
  async remove(id: string) {
    const user = await this.em.findOne(User, { user_id: id });
    if (user) {
      this.em.removeAndFlush(user);
      return user;
    }
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }
}
function genSaltSync(arg0: number) {
  throw new Error('Function not implemented.');
}
