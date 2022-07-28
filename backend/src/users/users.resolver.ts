import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(
    private readonly userService: UsersService,
  ){}

  @Mutation(() => UserEntity)
  async createUser(@Args('createUser') createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(createUserDto)
  }

  @Query(() => UserEntity, {nullable: true, description: 'Find user by email'})
  async findOne(@Args('username') username: string): Promise<UserEntity> {
    return this.userService.findOne(username)
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [UserEntity])
  async findAll(): Promise<UserEntity[]> {
    return this.userService.findAll()
  }

}
