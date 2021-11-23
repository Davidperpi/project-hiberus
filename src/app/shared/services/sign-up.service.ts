import { Injectable } from '@angular/core';

import { BaseService } from './base.service';

import { User } from '../models/index';
import { UserAdapter } from '../models/user.model';
import { ApiService } from 'src/app/core/data-service/api.service';

@Injectable({ providedIn: 'root' })
export class SignUpService extends BaseService<User> {

    constructor(apiService: ApiService, adapter: UserAdapter) {
      super(apiService, adapter, 'auth/sign-up');
    }
}