import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
// import { SocialRegisterDto } from '../dto/register.dto';
import { LOGIN_TYPE } from '@prisma/client';
import { JwtSignService } from 'src/auth/jwt.sign.service';
import { Role } from 'src/auth/dto/role.enum';

@Injectable()
export class SocialAuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly JwtSignService: JwtSignService,
    // private readonly notificationService: NotificationService,
  ) {}

  async checkIfEmailExists(email: string, userRole: string): Promise<boolean> {
    let check: any;
    if (userRole === Role.User) {
      check = await this.prismaService.user.findFirst({
        where: {
          email,
          login_type: {
            not: LOGIN_TYPE.EMAIL,
          },
        },
      });
    }
    return !!check;
  }

  loginValidation(req) {
    if (!req.user) {
      throw new HttpException('not found', HttpStatus.NOT_ACCEPTABLE);
    }

    return {
      message: 'User information from Social',
      user: req.user,
    };
  }

  async saveTokens(req) {}

  // async googleUser(profile: any, login_type) {
  //   const { name, emails, photos, provider } = profile;
  //   const data = {
  //     email: String(emails[0]?.value),
  //     first_name: `${String(name.givenName)}`,
  //     last_name: `${String(name.familyName)}`,
  //     profile_image: String(photos[0]?.value),
  //     login_type: login_type,
  //   };

  //   const existEmail = await this.checkIfEmailExists(data.email);
  //   if (existEmail) {
  //     const user = await this.prismaService.user.findFirst({
  //       where: { email: data?.email, login_type: LOGIN_TYPE.GOOGLE },
  //     });
  //     const access_token = this.JwtSignService.signJwt(
  //       { email: user.email, phone: user?.phone, id: user.id, role: Role.User },
  //       Role.User,
  //     );
  //     delete user['password'];
  //     return {
  //       // ...user,
  //       access_token,
  //       role: Role?.User,
  //       existEmail,
  //     };
  //   } else {
  //     return {
  //       existEmail,
  //       access_token: null,
  //       role: null,
  //     };
  //   }
  // }

  // async facebookUser(profile: any, login_type) {
  //   const { email, phone, name } = profile.user;

  //   const data = {
  //     email: String(email),
  //     phone: String(phone),
  //     first_name: `${String(name?.givenName)}`,
  //     last_name: `${String(name?.familyName)}`,
  //     login_type: login_type,
  //   };

  //   const existEmail = await this.checkIfEmailExists(data.email);
  //   if (existEmail) {
  //     const user = await this.prismaService.user.findFirst({
  //       where: {
  //         OR: [{ email: data?.email }, { phone: data?.phone }],
  //         login_type: LOGIN_TYPE.FACEBOOK,
  //       },
  //     });
  //     const access_token = this.JwtSignService.signJwt(
  //       { email: user.email, phone: user?.phone, id: user.id },
  //       Role.User,
  //     );
  //     delete user['password'];
  //     return {
  //       // ...user,
  //       access_token,
  //       role: Role.User,
  //       existEmail,
  //     };
  //   } else {
  //     return {
  //       access_token: null,
  //       existEmail,
  //       role: null,
  //     };
  //   }
  // }

  async socialRegister(user: any, LOGIN_TYPE: LOGIN_TYPE, userRole: string) {
    const existEmail = await this.checkIfEmailExists(user.email, userRole);
    let existUser = null;
    const query: any = [];
    if (user?.email) {
      query.push({ email: user?.email });
    }
    if (user?.phone) {
      query.push({ phone: user?.phone });
    }
    if (user?.first_name) {
      query.push({ first_name: user?.first_name });
    }
    if (user?.last_name) {
      query.push({ last_name: user?.last_name });
    }
    if (existEmail) {
      if (userRole === Role.User) {
        // Check if user exists in the User table
        existUser = await this.prismaService.user.findFirst({
          where: {
            OR: query,
            login_type: LOGIN_TYPE,
          },
        });
      }

      if (!existUser) {
        // If no matching user found, return early to avoid null access errors
        return {
          access_token: null,
          role: null,
          existEmail: false,
          message: 'No matching user found for the provided role.',
        };
      }

      // Generate access token for the existing user
      const access_token = this.JwtSignService.signJwt(
        {
          email: existUser.email,
          phone: existUser?.phone,
          id: existUser.id,
          role: userRole,
        },
        userRole,
      );

      // Ensure sensitive fields are not exposed
      delete existUser.password;

      return {
        access_token,
        role: userRole,
        existEmail: true,
      };
    } else {
      // Create a new user based on the role
      let newUser;
      if (userRole === Role.User) {
        newUser = await this.prismaService.user.create({
          data: {
            ...user,
            login_type: LOGIN_TYPE,
            is_verified: true,
          },
        });
      }

      // Generate access token for the new user
      const access_token = this.JwtSignService.signJwt(
        {
          email: newUser.email,
          phone: newUser?.phone,
          id: newUser.id,
          role: userRole,
        },
        userRole,
      );

      return {
        access_token,
        role: userRole,
        existEmail: false,
      };
    }
  }

  async validateUser(accessToken: string, role: string) {
    const verifyJwt = await this.JwtSignService.verifyAsync(accessToken);

    if (!verifyJwt?.id || !verifyJwt?.email) {
      throw new HttpException('Invalid access token', HttpStatus.UNAUTHORIZED);
    }

    // Query based on the provided role
    const entity = await this.prismaService.user.findFirst({
      where: {
        id: verifyJwt.id,
        email: verifyJwt.email,
        login_type: {
          not: LOGIN_TYPE.EMAIL,
        },
      },
    });

    // If no entity exists
    if (!entity) {
      throw new HttpException(`${role} not found`, HttpStatus.NOT_FOUND);
    }

    // Update verification status if not already verified
    if (!entity.is_verified) {
      if (role === Role.User) {
        await this.prismaService.user.update({
          where: { id: entity.id },
          data: { is_verified: true },
        });
      }
    }

    // Remove sensitive fields
    if (entity.password) {
      delete entity.password;
    }

    return {
      ...entity,
      access_token: accessToken,
      role,
    };
  }
}
