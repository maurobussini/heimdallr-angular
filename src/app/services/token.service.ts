import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AccessTokenResponse } from '../models/access-token-response';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

    constructor(
        public http: HttpClient) {
    }

    public token(userName: string, password: string) {

        // Composizione dell'url finale
        const url = environment.idpBaseUrl + 'oauth2/token';

        // Forzo l'header a "x-www-form-urlencoded"
        const customHeaders = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        });

        const wwwFormParams = new HttpParams()
            .set('userName', userName)
            .set('password', password)
            .set('grantType', 'password')
            .set('clientId', environment.clientId);

        const formData = new FormData();
        formData.append('userName', userName);
        formData.append('password', password);
        formData.append('grantType', 'password');
        formData.append('clientId', environment.clientId);

        // const urlFormParams = new URLSearchParams();
        // urlFormParams.append('userName', userName);
        // urlFormParams.append('password', password);
        // urlFormParams.append('grantType', 'password');
        // urlFormParams.append('clientId', environment.clientId);

        // Options per chiamata HTTP
        const options = {
            headers: customHeaders,
            params: wwwFormParams
        };

        // Invoke del IDP
        return this.http.post<AccessTokenResponse>(url, null, options);
    }
}
