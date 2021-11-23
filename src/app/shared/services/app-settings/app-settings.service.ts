import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from '../../models/app-settings/app-settings.model';

@Injectable()
export class AppSettingsService {

    static settings: AppSettings;

    constructor(private http: HttpClient) { }

    static getstaticsettings() {
        return AppSettingsService.settings;
    }

    /**
     * Función que se usa al inicio de la aplicación para cargar datos del app-settings.json en la variable  settings
     * @returns promise
     */
    load() {
        const jsonFile = 'assets/app-settings/app-settings.json';

        var promise = this.http.get(jsonFile)
            .toPromise();

        promise.then(
            (response: AppSettings) => AppSettingsService.settings = <AppSettings>response,
            error => console.error('Error al cargar el fichero de configuración')
        );
        return promise;
    }

    /**
     * Función que devuelve la variable settings
     * @returns AppSettings(model)
     */
    getSettings() {
        return AppSettingsService.settings;
    }

}
