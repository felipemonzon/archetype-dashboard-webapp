import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms'

@Injectable()
export class GlobalFunction {
    static LETTERS_NUMBER_SPECIAL_PATTERN = /^[a-zA-Z0-9\-\_\.\t\b\s]*$/;
    static LETTERS_NUMBERS_PATTERN = /^[a-zA-Z0-9\.\t\b\s]*$/;
    static NUMBERS_PATTERN = /^[0-9\.\-]*$/;
    static LETTERS_PATTERN = /^[a-zA-Z\.\t\b\s]*$/;
    static MAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
    static SPECIAL_KEYS = ['Backspace', 'Tab', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
    static DATE_REPORTS_PATTERN = 'yyyy-MM-DD';
    static DATE_SCHEDULE_PATTERN = 'DD-MM-yyyy';

    public static lettersAndNumbersValidator(control: AbstractControl): {
        [key: string]: any
    } | null {
        const valid = GlobalFunction.LETTERS_NUMBERS_PATTERN.test(control.value);
        return valid ? null : {
            invalidNumber: {
                valid: false,
                value: control.value
            }
        };
    }

    public static numberValidator(control: AbstractControl): {
        [key: string]: any
    } | null {
        const valid = GlobalFunction.NUMBERS_PATTERN.test(control.value);
        return valid ? null : {
            invalidNumber: {
                valid: false,
                value: control.value
            }
        };
    }

    /**
     * Valida el formato del correo.
     * 
     * @param text correo
     * @return verdarero si el formato es correcto false caso contrario
     */
    public static validateEmail(text: string): boolean {
        return GlobalFunction.MAIL_PATTERN.test(text);
    }
}
