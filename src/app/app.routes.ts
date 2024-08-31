import { Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { SignupComponent } from './signup/signup.component';
import { GroupsComponent } from './users/groups/groups.component';
import { ContactsComponent } from './users/contacts/contacts.component';

export const routes: Routes = [
    {path:'',component:SignupComponent},
    {path:'chat',component:ChatComponent},
    {path:'groups',component:GroupsComponent},
    {path:'contacts',component:ContactsComponent}
];
