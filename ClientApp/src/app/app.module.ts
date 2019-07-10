import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { AuthModule, OidcSecurityService } from "angular-auth-oidc-client";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";

import { LoginComponent } from "./components/login";
import { AuthCallbackComponent } from "./components/auth-callback";
import { AuthService } from "./services/auth";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AuthCallbackComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    HttpClientModule,
    FormsModule,
    AuthModule.forRoot(),
    RouterModule.forRoot([
      { path: "", component: HomeComponent, pathMatch: "full" }
    ])
  ],
  providers: [AuthService, OidcSecurityService],
  bootstrap: [AppComponent]
})
export class AppModule {}
