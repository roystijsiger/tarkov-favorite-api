import { Body, Controller, Get, Post, UnauthorizedException, UseGuards, Request, Delete, Param } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UserDto } from '../users/user.dto';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';

@ApiTags('Users') 
@Controller('Users')
export class UserController {
  constructor(
    private readonly userService : UsersService
    ) {}

    @Get(':userId/favorites')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async findAll(@Request() req, @Param('userId') userId : string): Promise<String[]>{
        if(userId !== req.user.userId){
            throw new UnauthorizedException();
        }
      return this.userService.findAllFavoritesByUser(req.user.userId);
    }
  
    @Get(':userId/favorites/:uid')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async findByItemId(@Request() req, @Param('uid') itemId : string, @Param('userId') userId : string) : Promise<String>{
        if(userId !== req.user.userId){
            throw new UnauthorizedException();
        }
      return this.userService.findFavoriteByUserAndItemId(req.user.userId, itemId);
    }
   
    @Post(':userId/favorites')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async create(@Request() req, @Body('item') item: string, @Param('userId') userId : string) {
        if(userId !== req.user.userId){
            throw new UnauthorizedException();
        }
      this.userService.addFavoriteToUser(req.user.userId, item);
    }
  
    @Delete(':userId/favorites/:uid')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async delete(@Request() req, @Param('uid') itemId : string,  @Param('userId') userId : string) : Promise<Number>{
        if(userId !== req.user.userId){
            throw new UnauthorizedException();
        }
      return this.userService.deleteFavoriteByUser( req.user.userId, itemId);
    }
}