import { Component } from '@angular/core';
import {NgOtpInputModule} from 'ng-otp-input'
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-icons',
  standalone: true,
  imports: [NgOtpInputModule,MatIconModule],
  templateUrl: './icons.component.html',
  styleUrl: './icons.component.css'
})
export class IconsComponent {

}
