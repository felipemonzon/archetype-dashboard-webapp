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
    WARNING_TITLE: 'messages.titles.warning',
    ERROR_TITLE: 'messages.titles.error',
    SUCCESS_TITLE: 'messages.titles.success',
    USER_AND_PASSWORD_WRONG: 'messages.errors.userAndPasswordWrong',
    GENERIC_ERROR: 'messages.errors.genericError',
    NOT_FOUND: 'messages.errors.notFound',
    FORBIDDEN: 'messages.errors.forbidden',
    BAD_REQUEST: 'messages.errors.badRequest',
    SESSION_EXPIRED: 'messages.errors.sessionExpired',
    INTERNAL_SERVER_ERROR: 'messages.errors.internalServerError',
    SERVICE_UNAVAILABLE: 'messages.errors.serviceUnavailable',
    SAVE_SUCCESS: 'messages.success.saveSuccess',
    UPDATE_SUCCESS: 'messages.success.updateSuccess',
    DELETE_SUCCESS: 'messages.success.deleteSuccess',
    DATE_VALIDATION: 'messages.validations.dateValidation',
  };

  /**
   * Método estático para obtener un mensaje traducido.
   * @param key La clave del mensaje a traducir (ej. 'messages.welcome').
   * @param translateService La instancia de TranslateService.
   * @returns El mensaje traducido.
   */
  public static getMessage(key: string): string {
    return this.translateService.instant(key);
  }
}