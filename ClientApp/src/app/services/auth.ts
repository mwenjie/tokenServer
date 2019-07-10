import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { UserManager, UserManagerSettings, User } from "oidc-client";

@Injectable()
export class AuthService {
  private _access_token = "";
  private manager = new UserManager(getClientSettings());
  private _user: User | null;

  constructor(protected http: HttpClient) {}

  async api_login() {
    var response = await this.http
      .get<string>("http://localhost:5000/api/identity/connect/authorize")
      .toPromise();
    this._access_token = response["access_token"];
    console.log(response);
  }

  async login() {
    return this.manager.signinRedirect();
  }

  async completeAuthentication() {
    this._user = await this.manager.signinRedirectCallback();
  }

  get access_token() {
    return this._access_token;
  }

  get user() {
    return this._user;
  }
}

export function getClientSettings(): UserManagerSettings {
  return {
    authority: "http://localhost:5000",
    client_id: "angular",
    redirect_uri: "http://localhost:5000/auth-callback",
    post_logout_redirect_uri: "http://localhost:5000/",
    response_type: "code",
    scope: "openid profile api2.full_access",
    filterProtocolClaims: true,
    loadUserInfo: true,
    automaticSilentRenew: true,
    silent_redirect_uri: "http://localhost:5000/silent-refresh.html"
  };
}
