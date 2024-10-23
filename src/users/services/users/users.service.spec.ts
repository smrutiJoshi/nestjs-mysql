import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User} from '../../../typeorm/entities/User';
import { Repository } from 'typeorm';

describe('UsersService', () => {
  let service: UsersService;
  const USER_REPOSITORY_TOKEN = getRepositoryToken(User);
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useClass: Repository
        }],
    }).compile();

    service = module.get<UsersService>(UsersService);
    // userRepository = module.get<Repository<User>>(USER_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // it('userRepository should be defined', () => {
  //   expect(userRepository).toBeDefined();
  // });
});