
import { Injectable } from '@angular/core';
import { Adapter } from '../../core/adapter';

export class User{
    public items?: [];
    public count?: number;
    constructor(
        public name: string = "",
        public surname: string = "",
        public email: string = "",
        public password: string = "",
        public id?: string
        ){ }   
}

@Injectable({
    providedIn: 'root'
})

export class UserAdapter implements Adapter<User>{
    adapt(item: any): User{
        return new User(
            item.name,
            item.surname,
            item.email,
            item.password,
            item.id         
        );
    }
}