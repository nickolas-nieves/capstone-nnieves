import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { EntityManager } from '@mikro-orm/mysql';
import { Feedback } from './entities/feedback.entity';
import { CustomRequest } from 'src/custom-request.interface';

@Injectable()
export class FeedbackService {
  constructor(private readonly em: EntityManager) {}

  async create(
    createFeedbackDto: CreateFeedbackDto,
    @Req() req: CustomRequest,
  ): Promise<Feedback> {
    const feedback = this.em.create(Feedback, createFeedbackDto);
    feedback.email_address = req.user.email_address;
    feedback.name = req.user.full_name;
    feedback.user_id = req.user;
    await this.em.persistAndFlush(feedback);
    return feedback;
  }

  //Returns all Feedbacks and returns a Promise of that type
  findAll(): Promise<Feedback[]> {
    return this.em.find(Feedback, {});
  }

  //Returns one Feedback by passed id as a Promise of that type
  findOne(id: string): Promise<Feedback> {
    return this.em.findOneOrFail(Feedback, { feedback_id: id });
  }

  //Updates all provided properties of Feedback by passed id
  async update(id: string, updateFeedbackDto: UpdateFeedbackDto) {
    const feedback = await this.em.findOne(Feedback, { feedback_id: id });

    if (feedback) {
      if (updateFeedbackDto.email_address)
        feedback.email_address = updateFeedbackDto.email_address;
      if (updateFeedbackDto.name) feedback.name = updateFeedbackDto.name;
      if (updateFeedbackDto.message)
        feedback.message = updateFeedbackDto.message;

      this.em.persistAndFlush(feedback);
      return feedback;
    }
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }

  //Removes Feedback by passed id and cascades
  async remove(id: string) {
    const feedback = await this.em.findOne(Feedback, { feedback_id: id });
    if (feedback) {
      this.em.removeAndFlush(feedback);
      return feedback;
    }
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }
}
