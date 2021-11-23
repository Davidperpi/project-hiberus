import { Injectable } from '@angular/core';

import { BaseService } from './base.service';

import { UserAdapter } from '../models/user.model';
import { ApiService } from 'src/app/core/data-service/api.service';
import { Login } from '../models/login.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService extends BaseService<Login> {

    constructor(apiService: ApiService, adapter: UserAdapter) {
      super(apiService, adapter, 'auth/log-in');
    }
}