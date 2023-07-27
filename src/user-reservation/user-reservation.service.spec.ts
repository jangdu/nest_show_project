import { Test, TestingModule } from '@nestjs/testing';
import { UserReservationService } from './user-reservation.service';

describe('UserReservationService', () => {
  let service: UserReservationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserReservationService],
    }).compile();

    service = module.get<UserReservationService>(UserReservationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
