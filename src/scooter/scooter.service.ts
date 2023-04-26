import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import { CreateScooterDto } from './dto/create-scooter.dto';
import { UpdateScooterDto } from './dto/update-scooter.dto';
import { EntityManager } from '@mikro-orm/mysql';
import { Scooter } from './entities/scooter.entity';
import { CustomRequest } from 'src/custom-request.interface';

@Injectable()
export class ScooterService {
  constructor(private readonly em: EntityManager) {}

  async create(createScooterDto: CreateScooterDto): Promise<Scooter> {
    const scooter = this.em.create(Scooter, createScooterDto);
    await this.em.persistAndFlush(scooter);
    return scooter;
  }

  findAll(): Promise<Scooter[]> {
    return this.em.find(Scooter, {});
  }

  //Returns one Scooter by passed id as a Promise of that type

  findOne(id: string): Promise<Scooter> {
    return this.em.findOneOrFail(Scooter, { scooter_id: id });
  }

  //Updates all provided properties of Scooter by passed id
  async update(id: string, updateScooterDto: UpdateScooterDto) {
    const scooter = await this.em.findOne(Scooter, { scooter_id: id });

    if (scooter) {
      if (updateScooterDto.battery_charge)
        scooter.battery_charge = updateScooterDto.battery_charge;
      if (updateScooterDto.current_location)
        scooter.current_location = updateScooterDto.current_location;

      this.em.persistAndFlush(scooter);
      return scooter;
    }
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }

  //Removes Scooter by passed id and cascades

  async remove(id: string) {
    const scooter = await this.em.findOne(Scooter, { scooter_id: id });
    if (scooter) {
      this.em.removeAndFlush(scooter);
      return scooter;
    }
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }
}
