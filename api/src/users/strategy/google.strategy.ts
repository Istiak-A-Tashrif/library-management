import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET_KEY,
      callbackURL: `${process.env.APP_URL}/api/v1/auth/google/redirect`,
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string,
    profile: any, done: VerifyCallback): Promise<any> {
    done(null, profile);
  }
}

@Injectable()
export class GoogleFreelancerStrategy extends PassportStrategy(Strategy, 'google-user') {

  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET_KEY,
      callbackURL: `${process.env.APP_URL}/api/v1/auth/google/redirect/register/user`,
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string,
    profile: any, done: VerifyCallback): Promise<any> {
    // console.log("Freelancer Login");
    done(null, profile);
  }
}

@Injectable()
export class GoogleClientStrategy extends PassportStrategy(Strategy, 'google-organizer') {

  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET_KEY,
      callbackURL: `${process.env.APP_URL}/api/v1/auth/google/redirect/register/organizer`,
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string,
    profile: any, done: VerifyCallback): Promise<any> {
    // console.log("client Login");
    done(null, profile);
  }
}

@Injectable()
export class GoogleJobSeekerStrategy extends PassportStrategy(Strategy, 'google-job-seeker') {

  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET_KEY,
      callbackURL: `${process.env.APP_URL}/api/v1/auth/google/redirect/register/job-seeker`,
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string,
    profile: any, done: VerifyCallback): Promise<any> {
    console.log("Freelancer Login");
    done(null, profile);
  }
}

