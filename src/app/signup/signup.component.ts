import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOtpInputModule } from 'ng-otp-input';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../service/userService/user.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgOtpInputModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signupForm: FormGroup;
  displayButton: boolean = false;

  buttonClicked: boolean = false;
  otp:string=''

  constructor(private fb: FormBuilder, private service: UserService) {
    this.signupForm = this.fb.group({
      fullName: [''],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[6-9]\d{9}$/), // Phone number starting with 6-9 followed by 9 digits
        ],
      ],
    });

    this.signupForm.get('phoneNumber')?.valueChanges.subscribe((value) => {});
  }

  get phoneNumber() {
    return this.signupForm.get('phoneNumber')?.value;
  }

  get isEnabled() {
    return this.signupForm.get('phoneNumber')?.valid;
  }

  onClick() {
    this.displayButton = false;
    this.buttonClicked = true;

    this.service.sendOtp(this.phoneNumber).subscribe({
      next: (res: any) => {
        console.log(res);
        let otpID = res.data.otpID;
        this.service.setId(otpID);
        console.log(otpID);
      },
      error: (res: any) => {
        console.log(res);
      },
    });
  }

  onSubmit(name: string, phoneNumber: string) {

    this.service.addUser(name, phoneNumber, this.otp).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (res: any) => {
        console.log(res);
      },
    });
  }

  onOtpChange(value: string) {
    this.otp = value;  
  }
}
