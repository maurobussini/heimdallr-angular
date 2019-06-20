import { Injectable } from '@angular/core';
import { SampleContract } from '../models/sample-contract';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { SessionHolderService } from './session-holder.service';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticsService {

    constructor(
        private http: HttpClient,
        private sessionHolder: SessionHolderService) {
    }

    public getSampleData(): Observable<SampleContract> {

        return this.http.post<SampleContract>(
            environment.resourceBaseUrl + 'api/Diagnostics/GetSampleData',
            null,
            { headers: this.sessionHolder.getHeaders() });
    }
}
