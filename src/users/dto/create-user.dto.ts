import { IsString, IsNotEmpty, IsNumberString, Validate, IsMimeType, Matches} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsNumberString({}, { message: 'Number must be a valid number' })
  @IsNotEmpty({ message: 'Number is required' })
  @Matches(/^\d{10}$/, { message: 'Number must be exactly 10 digits' })
  number: string;
}

export class FileUploadDto {
  @Validate(IsMimeType, ['image/jpeg', 'image/png', 'image/gif'], { message: 'File must be a valid image type (jpeg, png, gif)' })
  @IsNotEmpty({ message: 'Display picture is required' })
  file: Express.Multer.File;
}
