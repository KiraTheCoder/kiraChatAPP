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
  imports: [
    MatIconModule,
    FormsModule,
    CommonModule,
    RouterOutlet,
    IconsComponent,
    UsersComponent,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent {
  userDetails: UserData | undefined;
  messages: Messages[] = [];
  message: any = '';
  hasCalledApi: boolean = false;
  visible: boolean = false;

  constructor(
    private socketService: SocketService,
    private service: UserService
  ) {}
  userId: any = '';

  ngOnInit(): void {
    this.visible = this.service.getVisibility();
    this.hasCalledApi = this.service.getApiCalledValue();
    this.socketService.on('receiveMessage').subscribe((message: any) => {
      this.messages.push(message);
    });

    this.service.userSelected.subscribe((data) => {
      this.userDetails = data;
    });
    this.service.messages.subscribe((messages: any) => {
      // console.log('Updated messages:', messages);
      if(messages){
        this.messages = messages
      }else{
        this.message=''
      }
    });
  }

  // Send a message
  sendMessage(): void {
    this.socketService.emit('sendMessage', this.message);
    let newMessage = this.message;
    let userId = localStorage.getItem('userId') || '';
    this.messages.push({
      message: newMessage,
      userId: userId,
      createdAt: Date.now(),
    });
    // console.log(this.message);
    this.message = '';
  }

  onUserSelected(visible: boolean) {
    this.visible = visible; // Set visibility to true when a user is selected
  }

  imgSource(image: { contentType: string; data: string }): string {
    let src = this.service.getImageSrc(image);
    return src;
  }
}
