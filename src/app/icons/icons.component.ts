import { Component } from '@angular/core';
import {NgOtpInputModule} from 'ng-otp-input'
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-icons',
  standalone: true,
  imports: [NgOtpInputModule,MatIconModule,RouterOutlet],
  templateUrl: './icons.component.html',
  styleUrl: './icons.component.css'
})
export class IconsComponent {

}
