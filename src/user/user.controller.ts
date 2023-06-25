import {
  Controller,
  UseGuards,
  Header,
  Body,
  Req,
  HttpCode,
  HttpStatus,
  ValidationPipe,
  UsePipes,
  Post,
  Get,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { UserService } from './user.service';
import { UserResponseInterface } from './interface/userResponse.interface';
import { ExpressRequestInterface } from 'src/types/expressRequest.interface';
import { AuthGuard } from './guard/auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('registration')
  @Header('Content-Type', 'application/json')
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildUserResponse(user);
  }
  @Post('login')
  @Header('Content-Type', 'application/json')
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.login(loginUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Get()
  @Header('Content-Type', 'application/json')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async currentUser(
    @Req() request: ExpressRequestInterface,
  ): Promise<UserResponseInterface> {
    const user = request.user;
    return this.userService.buildUserResponse(user);
  }
}
