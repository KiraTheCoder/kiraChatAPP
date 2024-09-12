import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { UserData } from '../../interfaces/userDataInterface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  visibility: boolean = false;
  hasCalledApi:boolean = false;
  // messages:any=[];

  private selectedUserSource = new BehaviorSubject<boolean>(false); // Default empty string
  public messages = new BehaviorSubject<string[]>([]); // Default empty string
  private userId = new BehaviorSubject<string>(''); // Default empty string
  selectedUser$ = this.selectedUserSource.asObservable(); // Observable for the selected user

  // Method to change the selected user
  setSelectedUser(user: boolean) {
    this.selectedUserSource.next(user);
  }

  setMessages(message:any){
  this.messages.next( message);
  }

  getMessages(){
    return this.messages;
  }

  setVisibility(visible: boolean,apiCall:boolean) {
    this.visibility = visible;
    this.hasCalledApi = apiCall;
  }

  getVisibility() {
    return this.visibility;
  }

  getApiCalledValue(){
    return this.hasCalledApi;
  }

  private apiUrl = environment.url + 'user/';
  constructor(private http: HttpClient) {}

  users_list: [] = [];

  userSelected = new EventEmitter<UserData>();

  setUser(users: any) {
    this.users_list = users;
  }

  getUsers() {
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

  sendToken() {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${JSON.parse(token)}`,
    });

    return headers;
  }

  getAllUser(): Observable<any> {
    let headers = this.sendToken();
    return this.http.get(this.apiUrl + 'all', { headers });
  }

  getImageSrc(image: { contentType: string; data: string }): string {
    return `data:${image.contentType};base64,${image.data}`;
  }

  fetchUserChat() {
    console.log('fetchUserChat method starts:');

    let headers = this.sendToken();

    let otherUserId: any = localStorage.getItem('userId') || undefined;
    otherUserId = JSON.parse(otherUserId);
    console.log(otherUserId);

    const urlWithParams =
      this.apiUrl + `chat/single/data?otherUserId=${otherUserId}`;

    return this.http.get(urlWithParams, { headers });
  }

  setUserData(id:any){
    this.userId.next(id)
    this.getUserChat();
  }

  getUserChat() {
    console.log('😎😎  fetch user Details method starts');
    this.fetchUserChat().subscribe({
      next: (res: any) => {
        console.log(res.data.messages);
        // this.messages = res.data.messages;
        // console.log(this.messages);
        this.setMessages(res.data.messages);
      },
      error: (res: any) => {
        console.log(res);
        this.setMessages([]);
      },
    });
  }

}
