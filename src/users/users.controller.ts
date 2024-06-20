import { Controller, Post, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createUser(
    @Body('name') name: string,
    @Body('number') number: string,
    @UploadedFile() file: Express.Multer.File,
  ) {    
    const user = await this.usersService.createUser(name, number, file);
    return {
      id: user.id,
      name: user.name,
      number: user.number,
      imageUrl: user.imageUrl,
    };
  }
}
