import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}
  

  async findOne(username: string): Promise<UserEntity> { 
    return await this.userRepository.findOne({where: {name: username}})
  }

  async findAll(): Promise<UserEntity[]> { 
    return await this.userRepository.find()
  }

  async createUser(user: CreateUserDto): Promise<UserEntity> {
    return this.userRepository.save({...user})
  }
}
