import { Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
    {path:'',component:SignupComponent},
    {path:'chat',component:ChatComponent}
];
