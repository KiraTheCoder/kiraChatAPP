import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SocketService } from '../service/web-socket/socket.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [MatIconModule,FormsModule,CommonModule,RouterOutlet],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

  messages: string[] = [];
  message: string = '';

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    // Listen for new messages
    this.socketService.on('message').subscribe((message: string) => {
      
      this.messages.push(message);
    });
  }

  // Send a message
  sendMessage(): void {
    this.socketService.emit('message', this.message);
    console.log(this.message);
    console.log(this.messages)
    this.message = '';
  }
}
