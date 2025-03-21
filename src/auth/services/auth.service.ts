import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { Users } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { TokenPayload } from '../types/types';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async signIn(response: Response, user: Users, redirect: boolean = false) {
    const payload: TokenPayload = {
      sub: user.id,
      email: user.email,
      username: user.username,
    };

    const { access_token } = await this.generateAccessToken(response, payload);
    const { refresh_token } = await this.generateRefreshToken(
      payload,
      user,
      response,
    );

    if (redirect) {
      response.redirect(this.configService.getOrThrow('AUTH_UI_REDIRECT'));
    }
    return {
      access_token,
      refresh_token,
    };
  }

  // async authMe() {
  //   const token = this.request.headers['authorization'];
  //   const updatedToken = token?.replace('Bearer ', '');
  //   try {
  //     const { sub: userId } = await this.jwtService.verifyAsync(updatedToken, {
  //       secret: this.configService.getOrThrow('JWT_SECRET_KEY'),
  //     });
  //     const currentUser = await this.usersService.findUserByRelations(userId);
  //     if (!currentUser) {
  //       throw new UnauthorizedException();
  //     }
  //     return currentUser;
  //   } catch (error) {
  //     return error;
  //   }
  // }

  async signUp(signUpDto: CreateUserDto, response: Response) {
    const payload = {
      username: signUpDto.email.trim(),
      email: signUpDto.email.trim(),
      password: signUpDto.password,
    };
    const isUserExist = await this.usersService.findOne(signUpDto.email.trim());

    if (isUserExist) {
      throw new BadRequestException('email already exists');
    }

    const { password, ...rest } = payload;

    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    const user: Users = await this.usersService.create({
      password: hash,
      ...rest,
    });

    const userPayload: TokenPayload = {
      sub: user.id,
      email: user.email,
      username: user.username,
    };

    const { access_token } = await this.generateAccessToken(
      response,
      userPayload,
    );

    const { refresh_token } = await this.generateRefreshToken(
      userPayload,
      user,
      response,
    );

    return {
      access_token,
      refresh_token,
    };
  }

  async generateAccessToken(response: Response, payload: TokenPayload) {
    const expiresAccessToken = new Date();
    expiresAccessToken.setMilliseconds(
      expiresAccessToken.getTime() +
        parseInt(
          this.configService.getOrThrow<string>(
            'JWT_ACCESS_TOKEN_EXPIRATION_MS',
          ),
        ),
    );

    const access_token = this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow('JWT_SECRET_KEY'),
      expiresIn: `${this.configService.getOrThrow(
        'JWT_ACCESS_TOKEN_EXPIRATION_MS',
      )}ms`,
    });

    response.cookie('access_token', access_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'none',
      expires: expiresAccessToken,
      path: '/', // Ensure path is correct
    });

    return {
      access_token,
    };
  }

  async generateRefreshToken(
    payload: TokenPayload,
    user: Users,
    response: Response,
  ) {
    // refresh token
    const expiresRefreshoken = new Date();
    expiresRefreshoken.setMilliseconds(
      expiresRefreshoken.getTime() +
        parseInt(
          this.configService.getOrThrow<string>(
            'JWT_REFRESH_TOKEN_EXPIRATION_MS',
          ),
        ),
    );

    const refresh_token = await this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow('JWT_REFRESH_SECRET_KEY'),
      expiresIn: `${this.configService.getOrThrow(
        'JWT_REFRESH_TOKEN_EXPIRATION_MS',
      )}ms`,
    });

    const hashedRefreshToken = await bcrypt.hash(refresh_token, 10);
    this.userRepository.update(user.id, {
      refresh_token: hashedRefreshToken,
    });

    response.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'none',
      expires: expiresRefreshoken,
      path: '/', // Ensure path is correct
    });

    return { refresh_token };
  }

  async changePassword(id: string, password: string): Promise<void> {
    // Find the user in the database
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Update the user's password
    user.password = hashedPassword;
    await this.userRepository.update(id, user);
  }
}
