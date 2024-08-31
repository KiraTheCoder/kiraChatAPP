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

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [MatIconModule, FormsModule, CommonModule, RouterOutlet,IconsComponent,UsersComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent {
  messages:Messages[]=[];
  message: any = '';
  constructor(private socketService: SocketService,private service:UserService) {}
 
  visible:boolean=false;

  // user:any
  
  ngOnInit(): void {
    // Listen for new messages
    this.visible=this.service.getVisibility();
    this.socketService.on('receiveMessage').subscribe((message: any) => {
      console.log(message)
      this.messages.push(message)
    });

    // this.service.fetchUser().subscribe({
    //   next:(res)=>{
    //     console.log(res);
    //     this.user=res.data.name;
    //     console.log(this.user);
    //   },
    //   error:(res)=>{
    //     console.log(res);
    //   }
    // })
    
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

}
