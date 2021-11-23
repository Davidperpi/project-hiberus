
import { Injectable } from '@angular/core';
import { Adapter } from '../../core/adapter';

export class Login{
    constructor(
        public email: string,
        public password: string,
        ){ }   
}

@Injectable({
    providedIn: 'root'
})

export class LoginAdapter implements Adapter<Login>{
    adapt(item: any): Login{
        return new Login(
            item.email,
            item.password
        );
    }
}