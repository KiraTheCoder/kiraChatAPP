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

  users: User[] = [];
  @Output() userSelected = new EventEmitter<boolean>();

  selectUser(name:string,image:string) {
    const userData: UserData = {
        name,image
    };
    this.service.userSelected.emit(userData);
  }

  userDetails = new EventEmitter<boolean>();

 

  setActive(button: string) {
    this.activeButton = button;
  }

  getUsers() {
    this.service.getAllUser().subscribe({
      next: (res: any) => {
        this.users = res.data.users;
        console.log(this.users);
      },
      error: (res: any) => {
        console.log(res);
      },
    });
  }

  onClick(userId: any) {
    localStorage.setItem('userId', JSON.stringify(userId));
    this.service.setVisibility(true);
    this.activeUserId = userId;
  }

  onUserClick() {
    this.userSelected.emit(true); // Emit true to show the chat when a user is clicked
  }

  activeUserId: string | null = null; // To track the currently active user

  isActive(userId: string): boolean {
    return this.activeUserId === userId; // Check if the current user is active
  }

  getSource(image: { contentType: string; data: string }):string{
   let img= this.service.getImageSrc(image);
   return img;
  }
}
