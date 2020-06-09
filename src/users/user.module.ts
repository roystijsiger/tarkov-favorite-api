import { Module } from '@nestjs/common';
import { UserController} from './user.controller';
import { UsersService } from './users.service';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from './users.provider';

@Module({
  imports : [DatabaseModule],
  controllers: [UserController],
  providers: [UsersService, ...userProviders],
})

export class UsersModule {}