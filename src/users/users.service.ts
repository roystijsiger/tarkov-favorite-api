import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { User } from './user.interface';
import { UserDto } from './user.dto';

@Injectable()
export class UsersService {

  constructor(
    @Inject('USER_MODEL')
    private userModel : Model<User>
  ) {
  }

  async create (user : UserDto) : Promise<UserDto>{
    this.userModel.create(user);

    return user;
  }

  async findOne(username: string): Promise<User> {
    return this.userModel.findOne({username: username}).exec();
  }
  
 /**
  * Favorite section
  */

 async addFavoriteToUser(userId: string, itemId : string) {
  console.log(itemId);
  var user = await this.userModel.findOne({_id : userId});
  user.favorites.push(itemId);
  
  return user.save();
}

async findAllFavoritesByUser(userId : string): Promise<String[]> {
  var user =  await this.userModel.findOne({_id : userId}).exec();
  return  user.favorites
}

async findFavoriteByUserAndItemId(userId: string, itemId: string ) : Promise<String>{
  var user = await this.userModel.findOne({_id: userId});
  if(user.favorites.includes(itemId)){
    return itemId;
  }
  return ""
}

  async deleteFavoriteByUser(userId: string,itemId : string) : Promise<Number>{
 
    var user = await this.userModel.findOne({_id: userId});
    if(user.favorites.includes(itemId)){
      var index = user.favorites.indexOf(itemId);
      user.favorites.splice(index, 1);
      user.save();
      return 1;
    }
    return 0;
  }
}