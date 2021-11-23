import { Injectable } from '@angular/core';
import { ApiService } from '../../core/data-service/api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Adapter } from '../../core/adapter';

@Injectable()
export abstract class BaseService<T> {

    private baseRoute: string;

    constructor(public apiService: ApiService, public adapter: Adapter<T>, baseRoute: string) {
        this.baseRoute = baseRoute;
    }

    public getAll(): Observable<T> {
        return this.apiService.get(this.baseRoute)
            .pipe(
                map((item) => item)
            );
    }

    public getById(id: any): Observable<T> {
        return this.apiService.get(this.baseRoute + id)
            .pipe(
                map((item: T) => item ? this.adapter.adapt(item) : item)
            );
    }

    public update(id, type: T): Observable<T> {
        return this.apiService.put(this.baseRoute + id, type);
    }

    public add(type: T): Observable<T> {
        return this.apiService.post(this.baseRoute, type)
            .pipe(
                map((item: T) => item ? this.adapter.adapt(item) : item)
            );
    }

    public delete(id): Observable<T> {
        return this.apiService.delete(this.baseRoute + id);
    }
    
    public getMe(): Observable<T> {
        return this.apiService.get(`${this.baseRoute}me`)
            .pipe(
                map((item: T) => item ? this.adapter.adapt(item) : item)
            );
    }

    public login(type: T) {
        return this.apiService.post(this.baseRoute, type)
            .pipe(map(token => {
                return token;
            }));
    }
}