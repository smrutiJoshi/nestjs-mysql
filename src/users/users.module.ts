import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from '../typeorm/entities/Profile';
import { User } from '../typeorm/entities/User';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';

@Module({
  imports : [TypeOrmModule.forFeature([User, Profile])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
