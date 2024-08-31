import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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

  setUsersList(){
    this.service.setUser(this.users);
  }

  onClick(userId:any){
    localStorage.setItem('userId',JSON.stringify(userId));
  }
}
