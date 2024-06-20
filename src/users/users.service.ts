import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { S3 } from 'aws-sdk';
// import { Express } from 'express'; 
// import Multer from 'multer'; //

@Injectable()
export class UsersService {
  private readonly s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(name: string, number: string, file: Express.Multer.File): Promise<User> {
    const uploadResult = await this.uploadFileToS3(file);

    const user = this.usersRepository.create({
      name,
      number,
      imageUrl: uploadResult.Location,
    });

    return this.usersRepository.save(user);
  }

  private uploadFileToS3(file: Express.Multer.File) {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `${Date.now()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    return this.s3.upload(params).promise();
  }
}
