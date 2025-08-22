import { Injectable } from '@angular/core';

@Injectable()
export class MessagesConstant {
    // TITLES
    static WARNING_TITLE = '¡Advertencia!';
    static ERROR_TITLE = '¡Error!';
    static SUCCESS_TITLE = '¡Éxito!';
    // MESSAGE
    static USER_AND_PASSWORD_WRONG = "Usuario Y/o Contraseña Incorrecta.";
    static GENERIC_ERROR = 'Ocurrio un Error. \n ¡Contacte con el Administrador!';
    static NOT_FOUND = 'Servicio no Disponible';
    static FORBIDDEN = '¡No Tiene los Permisos Necesarios Para Seguir Navegando!';
    static BAD_REQUEST = "Ocurrio un Error al Enviar los Datos. ";
    //SUCCESS PROCESS
    static SAVE_SUCCESS = 'Datos Registrados con Éxito';
    static UPDATE_SUCCESS = 'Datos Actualizados con Éxito';
    static DELETE_SUCCESS = 'Datos Eliminados con Éxito';

    static DELETE_USER_QUESTION = '¿Deseas Eliminar el Usuario?';
    static DATE_VALIDATION = 'Campos Vacios o Formato de Fechas No Valido';
}