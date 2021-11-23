import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppSettingsService } from '../../shared/services/app-settings/app-settings.service';
import { AppError } from './errors/app-error';
import { BackendOffline, BadRequest, Forbidden, InternalServerError, NotFoundError, Unauthorized } from './errors/index';
import { JwtTokenService } from './jwt-token.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private http: HttpClient, private jwtToken: JwtTokenService) { }

  public apiUrl: String =  AppSettingsService.settings.apiUrl;

  // Construcción de la cabecera
  private setHeaders(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'x-functions-key': AppSettingsService.settings.apiUrl
    };
    if (this.jwtToken.getToken()) {
      headersConfig['Authorization'] = `Bearer ${this.jwtToken.getToken()}`;
    }

    return new HttpHeaders(headersConfig);
  }


  // Control de errores de las peticiones
  private formatErrors(response: HttpErrorResponse | any) {
    const applicationError = response.headers.get('Application-Error');

    if (applicationError) {
      return throwError(applicationError);
    }

    if (response.status === 0) {
      return throwError(new BackendOffline('Servidor no disponible'));
    } else if (response.status === 404) {
      return throwError(new NotFoundError(response));
    } else if (response.status === 500) {
      return throwError(new InternalServerError(response));
    } else if (response.status === 400) {
      return throwError(new BadRequest(response));
    } else if (response.status === 401) {
      return throwError(new Unauthorized(response));
    } else if (response.status === 403) {
      return throwError(new Forbidden(response));
    }

    return throwError(new AppError(response));
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${this.apiUrl}${path}`, { headers: this.setHeaders(), params: params })
      .pipe(
        map((res: Object) => res),
        catchError((error: HttpErrorResponse) => this.formatErrors(error))
      );
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(`${this.apiUrl}${path}`, JSON.stringify(body), { headers: this.setHeaders() })
      .pipe(
        map((res: Object) => res),
        catchError((error: HttpErrorResponse) => this.formatErrors(error))
      );
  }


  patch(path: string, body: Object = {}): Observable<any> {
    return this.http.patch(`${this.apiUrl}${path}`, JSON.stringify(body), { headers: this.setHeaders() })
      .pipe(
        map((res: Object) => res),
        catchError((error: HttpErrorResponse) => this.formatErrors(error))
      );
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(`${this.apiUrl}${path}`, JSON.stringify(body), { headers: this.setHeaders() })
      .pipe(
        map((res: Object) => res),
        catchError((error: HttpErrorResponse) => this.formatErrors(error))
      );
  }

  delete(path): Observable<any> {
    return this.http.delete(`${this.apiUrl}${path}`, { headers: this.setHeaders() })
      .pipe(
        map((res: Object) => res),
        catchError((error: HttpErrorResponse) => this.formatErrors(error))
      );
  }
}