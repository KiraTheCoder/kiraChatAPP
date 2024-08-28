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
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgOtpInputModule,RouterOutlet],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signupForm: FormGroup;
  container: boolean = true;

  buttonClicked: boolean = false;
  otp: string = '';

  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private router: Router
  ) {
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
   
    this.buttonClicked = true;

    this.service.sendOtp(this.phoneNumber).subscribe({
      next: (res: any) => {
        console.log(res);
        let otpID = res.data.otpID;
        this.service.setId(otpID);
        if(res.success===true)
          this.container=false;
        
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
       if(res.success===true){
        this.router.navigate(['/chat'])
       }
       let token = res.data.token;
       localStorage.setItem('token',JSON.stringify(token));
      },
      error: (res: any) => {
        console.log(res);
        alert('Something went wrong')
      },
    });
    
  }

  onOtpChange(value: string) {
    this.otp = value;
  }
}
