import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { AccessTokenResponse } from '../models/access-token-response';
import { Observable, Subject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SessionHolderService {

    public accessToken: AccessTokenResponse = null;

    constructor(
        private token: TokenService) {
    }

    public getHeaders(): HttpHeaders {

        const headers: HttpHeaders = new HttpHeaders({
            Authorization: 'Bearer ' + this.accessToken.access_token
        });

        return headers;
    }

    public authenticate(userName: string, password: string): Observable<void> {

        // Creazione manuale di una observable
        const subject: Subject<void> = new Subject<void>();

        // Chiamata ad IDP
        this.token.token(userName, password).subscribe(

            // Success dell'IDP
            (data: AccessTokenResponse) => {

                // Salvo la response ottenuta da IDP
                this.accessToken = data;

                // Chiudo e confermo
                subject.next();
                subject.complete();
            },

            // Fail dell''IDP
            (error: any) => {

                // Inserisco errore e chiudo canale
                subject.error(error);
                subject.complete();
            }
        );

        // Ritorno come osservabile
        return subject.asObservable();
    }
}
