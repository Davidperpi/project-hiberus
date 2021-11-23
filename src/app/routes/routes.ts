import { Routes } from '@angular/router';
import { LoggedinGuard } from '../shared/guards/loggedin.guard';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { SignupComponent } from './signup/signup.component';
import { LogoutComponent } from './logout/logout.component';

export const routes: Routes = [
    {
        path: '',
        children: 
        [
            { path: '', component: LoginComponent  },
            { path: 'signup', component: SignupComponent },
            { path: 'user', component: UsersComponent, canActivate:[LoggedinGuard] },     
            { path: 'logout', component: LogoutComponent, canActivate:[LoggedinGuard] }         
        ]
    },

    // Not found
    { path: '**', redirectTo: '' }
];