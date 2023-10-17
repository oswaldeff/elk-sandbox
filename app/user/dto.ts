import { IsString } from 'class-validator';
import 'reflect-metadata';

// SECTION [user] 로그인
export class UserLoginDTO {
  @IsString()
  userId: string;

  @IsString()
  password: string;
}
// !SECTION
