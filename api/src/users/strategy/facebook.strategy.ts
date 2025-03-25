import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-facebook";

@Injectable()
export class FacebookUserStrategy extends PassportStrategy(Strategy, 'facebook-user') {

  constructor() {
    super({
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET_KEY,
      callbackURL: `${process.env.APP_URL}/api/v1/auth/facebook/redirect/register/user`,
      scope: "email",
      profileFields: ["emails", "name"],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void
  ): Promise<any> {
    const { name, emails } = profile;
    const payload = {
      user: profile,
      accessToken,
    };

    done(null, payload);
  }
}


@Injectable()
export class FacebookOrganizerStrategy extends PassportStrategy(Strategy, 'facebook-organizer') {

  constructor() {
    super({
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET_KEY,
      callbackURL: `${process.env.APP_URL}/api/v1/auth/facebook/redirect/register/organizer`,
      scope: "email",
      profileFields: ["emails", "name"],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void
  ): Promise<any> {
    const { name, emails } = profile;
    console.log(profile);
    
    const payload = {
      user: profile,
      accessToken,
    };

    done(null, payload);
  }
}
