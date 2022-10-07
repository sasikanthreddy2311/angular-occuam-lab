import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private loginUrl = "https://api.occamlab.com.sg/demo-occamlab/login-test";
  private uploadDoc = "https://api.occamlab.com.sg/demo-occamlab/upload-test"
  constructor(private http: HttpClient) { }

  login() {
    let loginData = {
      "email": "sample-user@test.com",
      "password": "sample-password"
    }
    return this.http.post(this.loginUrl, loginData);
  }

  uploadImage(file: File) {
    let auth_token = localStorage.getItem("auth_token") || "";
    console.log(file)
    let formParams = new FormData();
    formParams.append('file', file, file.name)
    return this.http.post(this.uploadDoc, formParams, {headers: new HttpHeaders(
      {
        Authorization: auth_token,
        accept: "application/json",
        "content-type": "image/jpeg"
      }
    )})
  }
}
