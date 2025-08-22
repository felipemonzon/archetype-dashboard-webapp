import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";
import { SecurityUtilities } from "../security/utils/security.utils";

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective {
  constructor(private tpl: TemplateRef<any>, private vcr: ViewContainerRef) {}
  
  @Input() set appHasRole(allowedRoles: string[]) {
    const userRoles = SecurityUtilities.getProfiles();
    const hasPermission = userRoles.some(role => allowedRoles.includes(role.name));
    if (hasPermission) {
      this.vcr.createEmbeddedView(this.tpl);
    } else {
      this.vcr.clear();
    }
  }
}