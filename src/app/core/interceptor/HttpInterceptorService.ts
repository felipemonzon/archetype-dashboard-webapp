import { HttpRequest, HttpEvent, HttpHandlerFn } from "@angular/common/http";
import { Observable } from "rxjs";
import { SecurityUtilities } from "../../shared/security/utils/security.utils";
import { v4 as uuidv4 } from 'uuid';

export function HttpInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    request = request.clone({
        setHeaders: {
            Authorization: `${SecurityUtilities.getToken()}`,
            'uuid': uuidv4()
        }
    });    
    return next(request);
}