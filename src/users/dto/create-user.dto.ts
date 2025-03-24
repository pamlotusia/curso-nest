import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, minLength, MinLength } from "class-validator";

export class CreateUserDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;
  
  @IsString()
  @MinLength(6)
  @IsStrongPassword({
    minLength: 6,
    minUppercase:1,
    minNumbers:1,
    minSymbols:1
  })  
  password: string;

}