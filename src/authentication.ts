import { ServiceAddons, Params } from "@feathersjs/feathers";
import { AuthenticationService, JWTStrategy } from "@feathersjs/authentication";
import { LocalStrategy } from "@feathersjs/authentication-local";
import {
  expressOauth,
  OAuthStrategy,
  OAuthProfile,
} from "@feathersjs/authentication-oauth";

import { Application } from "./declarations";

declare module "./declarations" {
  interface ServiceTypes {
    authentication: AuthenticationService & ServiceAddons<any>;
  }
}
class GitHubStrategy extends OAuthStrategy {
  async getEntityData(profile: OAuthProfile, existing: any, params: Params) {
    const baseData = await super.getEntityData(profile, existing, params);
    console.log(baseData);
    console.log(profile);
    return {
      ...baseData,
      // You can also set the display name to profile.name
      name: profile.login,
      // The GitHub profile image
      avatar: profile.avatar_url,
      // The user email address (if available)
      email: profile.email,
    };
  }

  async getRedirect(authResult: any) {
    console.log(authResult);
    const { user } = authResult;
    // Get the redirect url e.g. from the users organization

    // This is necessary if it should work with the standard Authentication
    // client (which could be customized as well)
    // const query = authResult.accessToken
    //   ? {
    //       access_token: authResult.accessToken,
    //     }
    //   : {
    //       error: data.message || "OAuth Authentication not successful",
    //     };

    return `http://localhost:4200/cart?accessToken=${authResult.accessToken}&email=${authResult.user.email}&name=${authResult.login}`;
  }
}

export default function (app: Application): void {
  const authentication = new AuthenticationService(app);

  authentication.register("jwt", new JWTStrategy());
  authentication.register("local", new LocalStrategy());
  authentication.register("github", new GitHubStrategy());
  app.use("/authentication", authentication);
  app.configure(expressOauth());
}
