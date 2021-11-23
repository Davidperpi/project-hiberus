import { Injectable } from '@angular/core';

import { ApiService } from '../../core/data-service/api.service';
import { BaseService } from './base.service';

import { User } from '../models/index';
import { UserAdapter } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class UsersService extends BaseService<User> {

  constructor(apiService: ApiService, adapter: UserAdapter) {
    super(apiService, adapter, 'users/');
  }
}
