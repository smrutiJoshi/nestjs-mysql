import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile as ProfileEntity } from '../../../typeorm/entities/Profile';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import {
  CreateUserParams,
  createUserProfileParams,
  UpdateUserParams,
} from 'src/utils/types';
import { Repository } from 'typeorm';
import { User as UserEntity } from '../../../typeorm/entities/User';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRespository: Repository<UserEntity>,
    @InjectRepository(ProfileEntity)
    private profileRespository: Repository<ProfileEntity>,
  ) {}
  findUsers() {
    return this.userRespository.find({ relations: ['profile'] });
  }
  createUser(userDetails: CreateUserParams) {
    const newUser = this.userRespository.create({
      ...userDetails,
      createdAt: new Date(),
    });
    return this.userRespository.save(newUser);
  }

  updateUser(id: number, updateUserDetails: UpdateUserParams) {
    return this.userRespository.update({ id }, { ...updateUserDetails });
  }

  async deleteUser(id: number) {
    const result = await this.userRespository.delete({ id });

    if (result.affected == 0) {
      throw new HttpException(
        `User with ID ${id} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createUserProfile(
    id: number,
    createUserProfileDetails: createUserProfileParams,
  ) {
    const user = await this.userRespository.findOneBy({ id });

    if (!user)
      throw new HttpException(
        'User Not Found, Cannot Create Profile',
        HttpStatus.BAD_REQUEST,
      );

    const newProfile = this.profileRespository.create(createUserProfileDetails);
    const savedProfile = await this.profileRespository.save(newProfile);

    user.profile = savedProfile;

    return this.userRespository.save(user);
  }
}
