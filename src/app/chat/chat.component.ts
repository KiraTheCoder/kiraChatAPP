import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SocketService } from '../service/web-socket/socket.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { IconsComponent } from '../icons/icons.component';
import { UsersComponent } from '../users/users.component';
import { Messages } from '../interfaces/users';
import { UserService } from '../service/userService/user.service';
import { UserData } from '../interfaces/userDataInterface';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [MatIconModule, FormsModule, CommonModule, RouterOutlet,IconsComponent,UsersComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})

export class ChatComponent {
  userDetails :UserData | undefined;
  messages:Messages[]=[];
  message: any = '';

  constructor(private socketService: SocketService,private service:UserService) {}
 
  visible:boolean=false;

  // user:any
  
  ngOnInit(): void {
    // Listen for new messages
    this.visible=this.service.getVisibility();
    this.socketService.on('receiveMessage').subscribe((message: any) => {
      // console.log(message)
      this.messages.push(message)
     
    });

    this.service.userSelected.subscribe(data => {
      this.userDetails = data;
      // console.log('Received User Data:', this.userDetails);
    });

    this.getUserChat()
    
  }
  
  // Send a message
  sendMessage(): void {
    this.socketService.emit('sendMessage', this.message);
     let newMessage =this.message
     let userId = localStorage.getItem('userId') || '';
    this.messages.push({message:newMessage,userId:userId,createdAt:Date.now()})
    console.log(this.message)
    this.message = '';
  }

  onUserSelected(visible: boolean) {
    this.visible = visible; // Set visibility to true when a user is selected
  }

  imgSource(image: { contentType: string; data: string }): string {
     let src = this.service.getImageSrc(image);
     return src;
  }

  getUserChat(){
    console.log('😎😎  fetch user Details method starts')
    this.service.fetchUserChat().subscribe({
      next:(res:any)=>{
        console.log(res);
      },
      error:(res:any)=>{
        console.log(res);
      }
    })
  }

}
























































































