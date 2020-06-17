import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    name: 'email',
    description: 'Email',
    example: "roy@delcom.nl"

  })
  public username: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 30)
  @ApiProperty({
    name: "password",
    description: 'Password',
    example: "changeme"
  })
  public password: string;
}