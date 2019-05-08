import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: "login",
  template: `
    <div>Hello</div>
  `,
  styles: [
    `
      width: 100px;
    `
  ]
})
export class LoginComponent implements OnInit {
  isExpanded = false;

  constructor(private authService: AuthService, private http: HttpClient) {}

  async ngOnInit() {
    await this.authService.login();
    //await this.fakeClient();
    //await this.authService.api_login();
    //await this.fakeClient();
  }

  async fakeClient() {
    const headers = new HttpHeaders().set(
      "Authorization",
      "Bearer " + this.authService.access_token
    );
    var response = await this.http
      .get("http://localhost:5000/api/sampledata/weatherforecasts", { headers })
      .toPromise();
    console.log(response);
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
