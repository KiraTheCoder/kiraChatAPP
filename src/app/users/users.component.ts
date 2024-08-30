import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatIconModule,RouterLinkActive,RouterLink,FormsModule,CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  activeButton: string = '';

  setActive(button: string) {
    this.activeButton = button;
  }

  onClick(){
    alert('button clicked')
  }
}
