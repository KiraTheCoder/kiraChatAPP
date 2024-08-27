import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../service/userService/user.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signupForm: FormGroup;
  displayButton: boolean = true;

  buttonClicked:boolean = false;


  constructor(private fb: FormBuilder,private service:UserService) {
    this.signupForm = this.fb.group({
      fullName: [''],
      phoneNumber: ['', [
        Validators.required,
        Validators.pattern(/^[6-9]\d{9}$/) // Phone number starting with 6-9 followed by 9 digits
      ]]
    });

    this.signupForm.get('phoneNumber')?.valueChanges.subscribe(value => {
      // Optional real-time validation logic
    });
  }

  get phoneNumber() {
    return this.signupForm.get('phoneNumber')?.value;
  }

  get isEnabled() {
    return this.signupForm.get('phoneNumber')?.valid;
  }

  onClick() {
    this.displayButton = false;
    this.buttonClicked=true;
     
    // this.service.sendOtp(this.phoneNumber).subscribe({
    //   next:(res:any)=>{
    //     console.log(res);
    //   },
    //   error:(res:any)=>{
    //     console.log(res);
    //   }
    // })

  }

  onSubmit(name:string,phoneNumber:string,otp:string) {
    // this.service.addUser(name,phoneNumber,otp).subscribe({
    //   next:(res:any)=>{
    //     console.log(res);
    //   },
    //   error:(res:any)=>{
    //     console.log(res);
    //   }
    // })
  }

  // validatePhoneNumber() {
  //   console.log(this.isEnabled);
  // }
}
