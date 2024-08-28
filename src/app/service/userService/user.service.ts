import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private apiUrl = 'http://localhost:8080/user/'
  constructor(private http:HttpClient) { }

  otpID:string =''

  setId(otpId:string){
    this.otpID=otpId
  }

  sendOtp( phoneNumber:string):Observable<any>{
   const body = {phoneNumber};
   return this.http.post(this.apiUrl+"send_otp",body);
  }

  getId(){
    return this.otpID;
  }

  addUser(name:string,phoneNumber:string,otp:string):Observable<any>{
    const formData = new FormData();
    formData.append('name',name);
    formData.append('phoneNumber',phoneNumber);
    formData.append('otp',otp);
    formData.append('otpID',this.getId())

    return this.http.post(this.apiUrl+"signup_login",formData);
  }

  getUser():Observable<any>{
    return this.http.get(this.apiUrl)
  }
}
