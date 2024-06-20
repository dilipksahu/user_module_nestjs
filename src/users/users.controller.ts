import { Controller, Post, Body, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { CreateUserDto, FileUploadDto } from './dto/create-user.dto';
import { validate } from 'class-validator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // Validate file upload separately
    const fileUploadDto = new FileUploadDto();
    fileUploadDto.file = file;
    const fileErrors = await validate(fileUploadDto);
    if (fileErrors.length > 0) {
      throw new BadRequestException(fileErrors);
    }

    // Create user with validated data
    const user = await this.usersService.createUser(createUserDto.name, createUserDto.number, file);
    return {
      id: user.id,
      name: user.name,
      number: user.number,
      imageUrl: user.imageUrl,
    };
  }
}
