import { AuthService } from './auth.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Get('/wxsignin/:code')
  wxSignIn(@Param('code') code: string): Promise<{ accessToken: string }> {
    return this.authService.wxSignIn(code);
  }
}
