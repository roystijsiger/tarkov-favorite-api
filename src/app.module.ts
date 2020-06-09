import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import {UsersModule} from './users/user.module';
@Module({
  imports: [UsersModule, AuthModule] ,
  //controllers: [AppController],
  //providers: [AppService],
})
export class AppModule {}
