import { Injectable } from '@angular/core';

import * as toastr from 'toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

    public info(message: string) {
        toastr.info(message);
    }

    public warning(message: string) {
        toastr.warning(message);
    }

    public error(message: string) {
        toastr.error(message);
    }

    public success(message: string) {
        toastr.success(message);
    }

}
