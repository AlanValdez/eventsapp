import { Injectable } from '@angular/core';
declare let toastr;

@Injectable({
  providedIn: 'root'
})
export class ToastrService {
  success(message: string, title?: string) {
    toastr.success(message, title);
  }
  info(message: string, title?: string) {
    toastr.info(message, title);
  }
  waring(message: string, title?: string) {
    toastr.waring(message, title);
  }
  error(message: string, title?: string) {
    toastr.error(message, title);
  }
}
