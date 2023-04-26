import { PartialType } from '@nestjs/mapped-types';
import { CreateScooterDto } from './create-scooter.dto';

export class UpdateScooterDto extends PartialType(CreateScooterDto) {
  scooter_id: string;

  current_location: string;

  battery_charge: number;

  //   trips = new Collection<Trip>(this);

  //   reports = new Collection<Report>(this)
}
