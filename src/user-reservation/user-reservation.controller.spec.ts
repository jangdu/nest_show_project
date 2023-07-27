import { Test, TestingModule } from '@nestjs/testing';
import { UserReservationController } from './user-reservation.controller';

describe('UserReservationController', () => {
  let controller: UserReservationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserReservationController],
    }).compile();

    controller = module.get<UserReservationController>(UserReservationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
