import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import * as fs from 'fs';
import { User } from './users/entities/user.entity'; 

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST || "localhost",
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD || "postgres123",
      database: process.env.DB_NAME || "postgres",
      entities: [User],
      synchronize: true,
      ssl: process.env.DB_SSL ? { rejectUnauthorized: false } : false,
      extra: {
        trustServerCertificate: true,
        Encryt: true,
        IntegratedSecurity: false,
      }
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}

