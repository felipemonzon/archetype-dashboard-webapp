import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable()
export class MessagingNotification {
  static ERROR_TYPE = 'error';
  static SUCCESS_TYPE = 'success';
  static WARNING_TYPE = 'warning';
  static QUESTION_TYPE = 'question';

  static create(icon: any, title: string, text: string) {
    Swal.fire({
      title,
      text,
      icon,
      allowOutsideClick: false,
      allowEscapeKey: false
    });
  }

  static reaload(icon: any, title: string, text: string) {
    Swal.fire({
      icon,
      title,
      text,
      allowOutsideClick: false,
      allowEscapeKey: false
    }).then(() => {
      location.reload();
    });
  }

  static delete(icon: any, title: string, text: string) {
    return Swal.fire({
      icon,
      title,
      text,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showCancelButton: true,
    }).then((result) => {
      return result.value !== undefined;
    })
  }

  static async sessionExpired(icon: any, title: string, text: string){
    const result = await Swal.fire({
      icon,
      title,
      text,
      allowOutsideClick: false,
      allowEscapeKey: false,
    });
    return result.value !== undefined;
  }
}