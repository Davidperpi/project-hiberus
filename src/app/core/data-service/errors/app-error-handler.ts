import { Router } from '@angular/router';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Unauthorized } from './unauthorized';

@Injectable()
export class AppErrorHandler extends ErrorHandler {

    private router: Router;

    constructor(injector: Injector) {
        setTimeout(() => this.router = injector.get(Router));
        super();
    }

    handleError(error) {
        console.log('Unhandled Error', error);

        if (error instanceof Unauthorized) {
            console.log('Authentication error. Redirect to login!');
            this.router.navigate(['login']);
        }

        super.handleError(error);
    }
}
