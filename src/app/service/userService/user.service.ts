import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { UserData } from '../../interfaces/userDataInterface';

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

  private apiUrl = environment.url+'user/';
  // private apiUrl = 'https://kirachatapi-production.up.railway.app/user/';
  constructor(private http: HttpClient) {}

  users_list:[]=[];

  userSelected = new EventEmitter<UserData>();

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

  getImageSrc(image: { contentType: string; data: string }): string {
    return `data:${image.contentType};base64,${image.data}`;
  }

  fetchUserChat() {
    console.log('fetchUserChat method starts:');
    
    // Get the token and prepare the headers
    let headers = this.sendToken();
    console.log(headers);
    
    // Get the otherUserId from localStorage
    let otherUserId: any = localStorage.getItem('userId') || undefined;
    otherUserId = JSON.parse(otherUserId);
    console.log('other user id', otherUserId);
    
    // Append the otherUserId as a query parameter in the URL
    const urlWithParams = `http://localhost:8080/user/chat/single/data?otherUserId=66d2f0cd36c06d02b72dcb0e`;
    
    // Make the GET request with headers
    return this.http.get(urlWithParams, { headers });
  }
}
