import { Component } from '@angular/core';
import { TokenService } from './services/token.service';
import { DiagnosticsService } from './services/diagnostics.service';
import { AccessTokenResponse } from './models/access-token-response';
import { SampleContract } from './models/sample-contract';
import { ToastService } from './services/toast.service';
import { SessionHolderService } from './services/session-holder.service';
import { TokenizeResult } from '@angular/compiler/src/ml_parser/lexer';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(
        private sessionHolder: SessionHolderService,
        private diagnostics: DiagnosticsService,
        private toast: ToastService) {
    }

    public userName: string = 'Administrator';
    public password: string = 'password';
    public sampleData: SampleContract = null;
    public token: any = null;

    public signIn(): void {

        // Invoke del servizio su IDP
        this.sessionHolder.authenticate(this.userName, this.password).subscribe(
            (data: any) => {
                this.token = this.sessionHolder.accessToken;
                this.toast.success('Token received: ' + this.token.expiration);
            },
            (error: any) => {
                this.toast.warning('Invalid credentials (' + error.status + ')');
            }
        );
    }

    public getSampleData(): void {

        // Invoke del servizio su IDP
        this.diagnostics.getSampleData().subscribe(
            (data: SampleContract) => {
                this.sampleData = data;
                this.toast.success('Sample response: ' + this.sampleData.title);
            },
            (error: any) => {
                this.toast.warning('Resource server error (' + error.status + ')');
            }
        );
    }
}
