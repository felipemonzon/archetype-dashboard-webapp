import { HttpStatusCode, HttpInterceptorFn } from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { inject } from "@angular/core";
import { MessagesConstant } from "../../shared/messaging/messages-constants";
import { MessagingNotification } from "../../shared/messaging/messaging-notification";
import { SecurityUtilities } from "../../shared/security/utils/security.utils";

export const ServerErrorInterceptor: HttpInterceptorFn = (request, next) => {
  const logout = inject(SecurityUtilities);
  return next(request).
    pipe(
      catchError((error) => { 
        let errorMessage = "";
        // if true = client-side error else backend error
        errorMessage =
          error instanceof ErrorEvent
            ? `Error: ${error.error.message}`
            : (errorMessage = `Server-side error: ${error.status} ${error.message}`);
            
        switch (error.status) {
          case HttpStatusCode.BadRequest:
            MessagingNotification.create(
              MessagingNotification.WARNING_TYPE,
              MessagesConstant.WARNING_TITLE,
              MessagesConstant.BAD_REQUEST + error.error.message
            );
            console.error(error.status, errorMessage);
            break;
          case HttpStatusCode.Unauthorized:
            MessagingNotification.create(
              MessagingNotification.WARNING_TYPE,
              MessagesConstant.WARNING_TITLE,
              MessagesConstant.USER_AND_PASSWORD_WRONG
            );
            console.error(error.status, errorMessage);
            break;
          case HttpStatusCode.Forbidden:
            MessagingNotification.sessionExpired(
              MessagingNotification.WARNING_TYPE,
              MessagesConstant.WARNING_TITLE,
              MessagesConstant.FORBIDDEN
            ).then((response) => {              
              if (response) {
                logout.doLogout();
              }
            });
            console.error(error.status, errorMessage);
            break;
          case HttpStatusCode.NotFound:
            MessagingNotification.create(
              MessagingNotification.WARNING_TYPE,
              MessagesConstant.WARNING_TITLE,
              MessagesConstant.NOT_FOUND
            );
            console.error(error.status, errorMessage);
            break;
          case HttpStatusCode.InternalServerError:
            MessagingNotification.create(
              MessagingNotification.ERROR_TYPE,
              MessagesConstant.ERROR_TITLE,
              MessagesConstant.GENERIC_ERROR
            );
            console.error(error.status, errorMessage);
            break;
          default:
            MessagingNotification.create(
              MessagingNotification.ERROR_TYPE,
              MessagesConstant.ERROR_TITLE,
              MessagesConstant.GENERIC_ERROR
            );
            console.error(error.status, errorMessage);
            break;
        }
        return throwError(() => new Error(errorMessage));
      })
  );
}