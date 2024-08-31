import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SocketService } from '../service/web-socket/socket.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { IconsComponent } from '../icons/icons.component';
import { UsersComponent } from '../users/users.component';
import { Messages } from '../interfaces/users';

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

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    // Listen for new messages
     this.socketService.on('receiveMessage').subscribe((message: any) => {
       console.log(message)
       this.messages.push(message)
    });
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
}
