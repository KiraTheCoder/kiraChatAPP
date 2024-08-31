import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SocketService } from '../service/web-socket/socket.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { IconsComponent } from '../icons/icons.component';
import { UsersComponent } from '../users/users.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [MatIconModule, FormsModule, CommonModule, RouterOutlet,IconsComponent,UsersComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent {
  messages: string[] = [
    // 'first','second','first','second','first','second','first','second','first','second','first','second','first','second','first','second','first','second'
  ];
  message: string = '';

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    // Listen for new messages
    this.socketService.on('receiveMessage').subscribe((message: string) => {
      this.messages.push(message);
      console.log(this.messages)
      console.log('socketService.on')
    });
  }

  // Send a message
  sendMessage(): void {
    this.socketService.emit('sendMessage', this.message);
    console.log(this.message);
    // console.log(this.messages)
    this.message = '';
  }
}
