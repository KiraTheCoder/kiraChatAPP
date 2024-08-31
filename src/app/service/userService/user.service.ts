import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

visibility:boolean= false;

setVisibility(visible:boolean){
this.visibility=visible;
}

getVisibility(){
  return this.visibility;
}

  private apiUrl = 'https://kirachatapi-production.up.railway.app/user/';
  constructor(private http: HttpClient) {}

  users_list:[]=[];

  setUser(users:any){
   this.users_list=users;
  }

  getUsers(){
    return this.users_list;
  }

  otpID: string = '';

  setId(otpId: string) {
    this.otpID = otpId;
  }

  sendOtp(phoneNumber: string): Observable<any> {
    const body = { phoneNumber };
    return this.http.post(this.apiUrl + 'send_otp', body);
  }

  getId() {
    return this.otpID;
  }

  addUser(name: string, phoneNumber: string, otp: string): Observable<any> {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('phoneNumber', phoneNumber);
    formData.append('otp', otp);
    formData.append('otpID', this.getId());

    return this.http.post(this.apiUrl + 'signup_login', formData);
  }

  getUser(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  sendToken(){
    const token = localStorage.getItem('token');
    if(!token){
      throw new Error('Token not found');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${JSON.parse(token)}`,
    });

    return headers;
  }

  getAllUser(): Observable<any> {
    let headers = this.sendToken();
    return this.http.get(this.apiUrl+'all', { headers });
  }

  fetchUser():Observable<any>{
    // alert('fetch user called')
    let headers = this.sendToken();
     return this.http.get(this.apiUrl+'details',{headers});
  }
}
