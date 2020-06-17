import { Body, Controller, Get, Post, UnauthorizedException, UseGuards, BadRequestException } from '@nestjs/common';
import { Request} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../users/user.dto';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService : AuthService,
    private readonly userService : UsersService
    ) {}

  @Post('login')
  @ApiOkResponse({
    status: 200, description: 'Successfully logged in'
  })

  @ApiUnauthorizedResponse({status: 401, description: 'login failed'})
  async login(@Body() user : UserDto) : Promise<any>{
    const userFound = await this.authService.validateUser(user);
    if(userFound){
      return this.authService.login(userFound);
    } 
    throw new UnauthorizedException();
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  getProfile(@Request() req){
    return req.user;
   }

   @Post('register')
   async register(@Body() user : UserDto) : Promise<any>{
     if(user.password.length < 8){
       throw new BadRequestException("Password is too short, should be at least 8 characters.");
     }

     if(/^[A-z]+$/.test(user.password)){
      throw new BadRequestException("password should contain at least 1 number");
     }
     
    if(/^[0-9]+$/.test(user.password)){
      throw new BadRequestException("password should contain at least 1 letter");
    }

    var userFound = await this.userService.findOne(user.username);
    if(userFound){
      throw new BadRequestException("User with this email already exists");
    }
     return this.userService.create(user);
   }
}