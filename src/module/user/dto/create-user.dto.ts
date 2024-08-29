import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty({ message: 'Tên là bắt buộc' })
    @IsString({ message: 'Tên phải là một chuỗi' })
    firstName: string;

    @IsNotEmpty({ message: 'Họ là bắt buộc' })
    @IsString({ message: 'Họ phải là một chuỗi' })
    lastName: string;

    @IsNotEmpty({ message: 'Email bắt buộc' })
    @IsEmail({}, { message: 'Sai định dạng email' })
    email: string;

    @IsNotEmpty({ message: 'Mật khẩu bắt buộc' })
    @IsString({ message: 'Mật khẩu phải là một chuỗi' })
    @MinLength(6, { message: 'Mật khẩu cần ít nhất 6 kí tự' })
    password: string;
}
