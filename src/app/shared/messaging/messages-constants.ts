import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class MessagesConstant {
  static translateService: TranslateService;
  constructor(private translateService: TranslateService) {
    MessagesConstant.translateService = this.translateService;
  }

  public static readonly MESSAGES = {
    // Claves de traducción
    WARNING_TITLE: 'app.messages.title.warning',
    ERROR_TITLE: 'app.messages.title.error',
    SUCCESS_TITLE: 'app.messages.title.success',
    USER_AND_PASSWORD_WRONG: 'app.messages.errors.userAndPasswordWrong',
    GENERIC_ERROR: 'app.messages.errors.genericError',
    NOT_FOUND: 'app.messages.errors.notFound',
    FORBIDDEN: 'app.messages.errors.forbidden',
    BAD_REQUEST: 'app.messages.errors.badRequest',
    SESSION_EXPIRED: 'app.messages.errors.sessionExpired',
    INTERNAL_SERVER_ERROR: 'app.messages.errors.internalServerError',
    SERVICE_UNAVAILABLE: 'app.messages.errors.serviceUnavailable',
    SAVE_SUCCESS: 'app.messages.success.dataCreated',
    UPDATE_SUCCESS: 'app.messages.success.dataUpdated',
    DELETE_SUCCESS: 'app.messages.success.dataDeleted',
    DATE_VALIDATION: 'app.messages.errors.dateValidation',
  };

  /**
   * Método estático para obtener un mensaje traducido.
   * 
   * @param key La clave del mensaje a traducir (ej. 'messages.welcome').
   * @param translateService La instancia de TranslateService.
   * @returns El mensaje traducido.
   */
  public static getMessage(key: string): string {
    return this.translateService.instant(key);
  }
}