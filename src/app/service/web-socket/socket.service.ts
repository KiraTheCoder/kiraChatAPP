import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private userId: string = '';
  // private apiUrl = 'https://kirachatapi-production.up.railway.app/'
  private apiUrl = environment.url;
  private socket!: Socket;
  private token: string | null = localStorage.getItem('token');

  constructor() {
    if (this.token) {
      let parsedToken;

      try {
        // Parse the token if it's not null
        parsedToken = JSON.parse(this.token);
        console.log('Parsed Token:', parsedToken);

        console.log('Initializing SocketService...');
        this.socket = io(this.apiUrl, {
          auth: {
            token: parsedToken, // Use the token value from parsed JSON
          },
          transports: ['websocket'], // Ensure WebSocket transport
        });

        this.socket.on('connect', () => {
          console.log('Socket connected:', this.socket.id);

          // Listen for the "welcome" event from the server
          this.socket.on('welcome', (data: any) => {
            console.log('Welcome event received:', data);
          });
        });

        this.socket.on('connect_error', (error) => {
          console.error('Socket connection error:', error);
        });

        this.socket.on('disconnect', () => {
          console.log('Socket disconnected');
        });
      } catch (error) {
        console.error('Failed to parse token:', error);
      }
    } else {
      console.error('No token found in local storage');
    }
  }

  // Emit an event to the server
  emit(eventName: string, data?: any): void {
    this.userId = localStorage.getItem('userId') || '';
    // console.log(this.userId);
    const user_id= JSON.parse(this.userId)
    if (this.socket) {
      this.socket.emit(eventName, { recipientId: user_id, message: data });
    } else {
      console.error('Socket is not initialized');
    }
  }

  // Listen for events from the server (generic method)
  on(eventName: string): Observable<any> {
    console.log('on method starts')
    return new Observable((observer) => {
      if (this.socket) {
        this.socket.on(eventName, (data: any) => {
          observer.next(data);
        });
      } else {
        console.error('Socket is not initialized');
      }
    });
  }

  // Disconnect the socket
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    } else {
      console.error('Socket is not initialized');
    }
  }
}
