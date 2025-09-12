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
              MessagesConstant.getMessage(MessagesConstant.MESSAGES.WARNING_TITLE),
              MessagesConstant.getMessage(MessagesConstant.MESSAGES.BAD_REQUEST + error.error.message),
            );
            console.error(error.status, errorMessage);
            break;
          case HttpStatusCode.Unauthorized:
            MessagingNotification.create(
              MessagingNotification.WARNING_TYPE,
              MessagesConstant.getMessage(MessagesConstant.MESSAGES.WARNING_TITLE),
              MessagesConstant.getMessage(MessagesConstant.MESSAGES.USER_AND_PASSWORD_WRONG),
            );
            console.error(error.status, errorMessage);
            break;
          case HttpStatusCode.Forbidden:
            MessagingNotification.sessionExpired(
              MessagingNotification.WARNING_TYPE,
              MessagesConstant.getMessage(MessagesConstant.MESSAGES.WARNING_TITLE),
              MessagesConstant.getMessage(MessagesConstant.MESSAGES.FORBIDDEN)
            ).then((response) => {        
              console.error(error.status, errorMessage);
              if (response) {
                logout.doLogout();
              }
            });
            break;
          case HttpStatusCode.NotFound:
            MessagingNotification.create(
              MessagingNotification.WARNING_TYPE,
              MessagesConstant.getMessage(MessagesConstant.MESSAGES.WARNING_TITLE),
              MessagesConstant.getMessage(MessagesConstant.MESSAGES.NOT_FOUND)
            );
            console.error(error.status, errorMessage);
            break;
          case HttpStatusCode.InternalServerError:
            MessagingNotification.create(
              MessagingNotification.ERROR_TYPE,
              MessagesConstant.getMessage(MessagesConstant.MESSAGES.ERROR_TITLE),
              MessagesConstant.getMessage(MessagesConstant.MESSAGES.GENERIC_ERROR)
            );
            console.error(error.status, errorMessage);
            break;
          default:
            MessagingNotification.create(
              MessagingNotification.ERROR_TYPE,
              MessagesConstant.getMessage(MessagesConstant.MESSAGES.ERROR_TITLE),
              MessagesConstant.getMessage(MessagesConstant.MESSAGES.GENERIC_ERROR)
            );
            console.error(error.status, errorMessage);
            break;
        }
        return throwError(() => new Error(errorMessage));
      })
  );
}