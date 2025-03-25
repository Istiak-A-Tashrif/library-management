import {
  Controller,
  Get,
  Param,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { LOGIN_TYPE } from '@prisma/client';
import { res } from 'src/common/response.helper';
import { SocialAuthService } from '../services/social-auth.service';
import { Role } from 'src/auth/dto/role.enum';

@Controller('auth')
export class SocialAuthController {
  constructor(private readonly socialService: SocialAuthService) {}

  /****Start Google Login And SignUP****/
  // @Get('google/redirect')
  // @UseGuards(AuthGuard('google'))
  // async googleAuthRedirect(@Req() req, @Res() res) {
  //   const validateUser = await this.socialService.loginValidation(req);
  //   const user = await this.socialService.googleUser(
  //     validateUser.user,
  //     'GOOGLE',
  //   );
  //   return res.redirect(
  //     `${process.env.WEBSITE_BASE_URL}/login?role=${user.role}&accessToken=${user.access_token}&existUser=${user.existEmail}`,
  //   );
  // }
 

  @Get('google/redirect/register/user')
  @UseGuards(AuthGuard('google-user'))
  async googleAuthRegistration(@Req() req, @Res() res) {
    const validateUser = await this.socialService.loginValidation(req);
    const { name, emails, photos, provider } = validateUser.user;
    const data = {
      email: String(emails[0]?.value),
      first_name: `${String(name.givenName)}`,
      last_name: `${String(name.familyName)}`,
      profile_image: String(photos[0]?.value),
    };
    const user = await this.socialService.socialRegister(
      data,
      LOGIN_TYPE.GOOGLE,
      Role.User,
    );
    return res.redirect(
      `${process.env.WEBSITE_BASE_URL}/login?role=${user.role}&accessToken=${user.access_token}&existUser=${user.existEmail}`,
    );
  }
  /****END Google Login And SignUP****/

  /****Start Facebook Login And SignUP****/

  @Get('facebook/redirect/register/user')
  @UseGuards(AuthGuard('facebook-user'))
  async facebookAuthRegistrationUser(@Req() req, @Res() res) {
    const validateUser = await this.socialService.loginValidation(req);
    // console.log("validateUser", validateUser.user)
    const { email, phone, name } = validateUser.user?.user;
    const data = {
      email: String(email),
      phone: String(phone),
      first_name: `${String(name?.givenName)}`,
      last_name: `${String(name?.familyName)}`,
    };
    const user = await this.socialService.socialRegister(
      data,
      LOGIN_TYPE.FACEBOOK,
      Role.User,
    );
    return res.redirect(
      `${process.env.WEBSITE_BASE_URL}/login?role=${user.role}&accessToken=${user.access_token}&existUser=${user.existEmail}`,
    );
  }
 

  /****END Facebook Login And SignUP****/

  @Get('social/validation')
  async valideTionUser(@Query() query) {
    const { accessToken, role } = query;
    const user = await this.socialService.validateUser(accessToken, role);
    return res.success(user, 'valid user');
  }
}
