import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../service/userService/user.service';
import { User } from '../interfaces/users';
import { UserData } from '../interfaces/userDataInterface';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    MatIconModule,
    RouterLinkActive,
    RouterLink,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  ngOnInit() {
    this.getUsers();
  }

  constructor(private service: UserService) {}

  activeButton: string = 'chats';
  activeUserId: string | null = null;
  userChat:any;

  users: User[] = [];
  @Output() userSelected = new EventEmitter<boolean>();
  @Output() visibilityChanged = new EventEmitter<boolean>();

  selectUser(name: string, image: string) {
    const userData: UserData = {
      name,
      image,
    };
    this.service.userSelected.emit(userData);
    this.visibilityChanged.emit(true);
  }

  userDetails = new EventEmitter<boolean>();

  setActive(button: string) {
    this.activeButton = button;
  }

  getUsers() {
    this.service.getAllUser().subscribe({
      next: (res: any) => {
        this.users = res.data.users;
        // console.log(this.users);
      },
      error: (res: any) => {
        console.log(res);
      },
    });
  }

  onClick(userId: any) {
    localStorage.setItem('userId', JSON.stringify(userId));
    this.service.setVisibility(true,true);
    this.activeUserId = userId;
    this.visibilityChanged.emit(true);
  }

  onUserClick(_id:any) {
    this.userSelected.emit(true);
    this.service.setUserData(_id) // Emit true to show the chat when a user is clicked
  }


  isActive(userId: string): boolean {
    return this.activeUserId === userId; // Check if the current user is active
  }

  getSource(image: { contentType: string; data: string }): string {
    let img = this.service.getImageSrc(image);
    return img;
  }

  getUserChat() {
    console.log('😎😎  fetch user Details method starts');
    this.service.fetchUserChat().subscribe({
      next: (res: any) => {
        console.log(res);
        this.userChat = res.data.messages;
        this.service.setMessages(res.data.messages);
        console.log('user chat',this.userChat);
      },
      error: (res: any) => {
        console.log(res);
        this.userChat = '';
        this.service.setMessages(this.userChat);
      },
    });
  }

  selectUserId(user:boolean) {
    this.service.setSelectedUser(user); // Update user in the service
  }
}
