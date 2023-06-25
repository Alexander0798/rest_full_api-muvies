import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/createUser.dto';
import { UserResponseInterface } from './interface/userResponse.interface';
import { LoginUserDto } from './dto/loginUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userRepository: Model<UserDocument>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password } = createUserDto;
    const userByEmail = await this.userRepository.findOne({
      email: email,
    });
    if (userByEmail) {
      throw new HttpException(
        'the email is already registered',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const hashPassword = await hash(password, +process.env.BCRYPT_SALT);
    const newUser = new this.userRepository({
      name,
      email,
      password: hashPassword,
    });
    return await newUser.save();
  }

  async login(loginUserDto: LoginUserDto): Promise<User> {
    const { email, password } = loginUserDto;
    const user = await this.userRepository.findOne({
      email: email,
    });
    if (!user) {
      throw new HttpException(
        'the user does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new HttpException(
        'incorrect password',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return user;
  }

  findById(id: string): Promise<User> {
    return this.userRepository.findById(id);
  }
  generateJwt(user: User): string {
    return sign(
      {
        _id: user.id,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
    );
  }

  buildUserResponse(user: User): UserResponseInterface {
    return {
      _id: user.id,
      name: user.name,
      email: user.email,
      token: this.generateJwt(user),
    };
  }
}
