import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogModule } from './blog/blog.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE_CONNECTION_STRING), // Setup the database
    AuthModule, // Add the auth module
    UserModule, // Add the user module
    BlogModule, // Add the blog module
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
