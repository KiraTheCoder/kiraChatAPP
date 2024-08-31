import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../service/userService/user.service';
import { User } from '../interfaces/users';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatIconModule,RouterLinkActive,RouterLink,FormsModule,CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{
 
  constructor(private service:UserService){}

  activeButton: string = 'chats';

  users:User[]=[];
  @Output() userSelected = new EventEmitter<boolean>();

  getImageSrc(image: { contentType: string; data: string }): string {
    return `data:${image.contentType};base64,${image.data}`;
  }

  setActive(button: string) {
    this.activeButton = button;
  }

  ngOnInit(){
   this.getUsers()
  }
  
  getUsers(){
  this.service.getAllUser().subscribe({
    next:(res:any)=>{
      console.log(res);
      this.users = res.data.users
      console.log(this.users);
    },
    error:(res:any)=>{
      console.log(res)
    }
  })
  }

  onClick(userId:any){
    localStorage.setItem('userId',JSON.stringify(userId));
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

}
