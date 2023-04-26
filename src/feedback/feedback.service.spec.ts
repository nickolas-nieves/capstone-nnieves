import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackService } from './feedback.service';
import { Feedback } from './entities/feedback.entity';
import { User } from 'src/user/entities/user.entity';
import { Scooter } from 'src/scooter/entities/scooter.entity';

describe('FeedbackService', () => {
  let service: FeedbackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeedbackService],
    }).compile();

    service = module.get<FeedbackService>(FeedbackService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new feedback record with the correct user data', async () => {
    // create a mock CreateFeedbackDto object
    const createFeedbackDto = {
      message: 'This is a test feedback message',
      feedback_id: "1",
      name: "Nick",
      email_address: "nnieves@southern.edu",
      user_id: new User(),
      scooter_id: new Scooter()
    };
    
    // create a mock CustomRequest object with user data
    const request = {
      user: {
        email_address: 'nnieves@southern.edu',
        full_name: 'Nick',
        user_id: 1,
      },
    };
  });
});