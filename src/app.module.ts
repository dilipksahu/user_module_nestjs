import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as fs from 'fs';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [],
      synchronize: true,
      ssl:  {
        rejectUnauthorized: true,
        ca: fs.readFileSync('./certs/rds-ca-bundle.pem').toString(),
      },
      extra: {
        trustServerCertificate: true,
        Encryt: true,
        IntegratedSecurity: false,
      }
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}

