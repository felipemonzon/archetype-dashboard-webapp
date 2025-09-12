import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SecurityUtilities } from '../../../shared/security/utils/security.utils';
import { MessagingNotification } from '../../../shared/messaging/messaging-notification';
import { TranslateService } from '@ngx-translate/core';
import { MessagesConstant } from '../../../shared/messaging/messages-constants';
import { ProfileService } from '../service/profile.service';
import { AuthorityModel } from '../model/authority.model';
import { UserModel } from '../../user/model/user-model';
import { Subscription } from 'rxjs/internal/Subscription';
import { SocialNetworkModel } from '../../user/model/social-network.model';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit, OnDestroy {
  profileForm = signal<FormGroup>(new FormGroup({}));
  full_name: string = '';
  profiles: AuthorityModel[] = [];
  social_networks: SocialNetworkModel[] = [];
  translatedGenres: {value: string; label: string;}[] = [];
  private langChangeSubscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder, 
    private translate: TranslateService,
    private profileService: ProfileService) {}

  ngOnInit(): void {
    this.loadTranslations();
    this.profileMockData();
    this.getProfileForm(SecurityUtilities.getUser());
  }

  ngOnDestroy(): void {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }

  save() {    
    if (this.profileForm().valid) {
      MessagingNotification.create(
        MessagingNotification.SUCCESS_TYPE,
        this.translate.instant(MessagesConstant.MESSAGES.SUCCESS_TITLE),
        this.translate.instant(MessagesConstant.MESSAGES.UPDATE_SUCCESS)
      );
    } else {
      this.profileForm().markAllAsTouched();
      MessagingNotification.create(
        MessagingNotification.WARNING_TYPE,
        this.translate.instant(MessagesConstant.MESSAGES.WARNING_TITLE),
        this.translate.instant(MessagesConstant.MESSAGES.DATE_VALIDATION)
      );
    }
  }

  private getProfileForm(userData: UserModel){    
    this.full_name = userData.display_name;
    this.social_networks = userData.social_networks;
    this.profileForm.set(this.fb.group({
      first_name: [userData.first_name, Validators.required],
      last_name: [userData.last_name, Validators.required],
      company: [userData.enterprise_name, Validators.required],
      user_name: [{value: userData.username, disabled: true}, Validators.required],
      genre: [null, Validators.required],
      profiles: [null, Validators.required],
      email: [{value: userData.email, disabled: true}, [Validators.required, Validators.email]],
      address: [userData.address, Validators.required],
      city: [userData.city, Validators.required],
      country: [userData.country, Validators.required],
      postal_code: [userData.postal_code, Validators.required],
    }));

    setTimeout(() => {
      this.profileForm().get('profiles')?.setValue(userData.profiles.map(x => x.id));
      this.profileForm().get('genre')?.setValue(userData.genre);
    }, 100);
  }

  private loadGenres(){
    this.translate.get(['app.user.profile.form.genre.male', 'app.user.profile.form.genre.female'])
      .subscribe(translations => {
        this.translatedGenres = [
          {
            value: 'M',
            label: translations['app.user.profile.form.genre.male']
          },
          {
            value: 'F',
            label: translations['app.user.profile.form.genre.female']
          }
        ];
      });  
  }

  private profileMockData(){
    this.profileService.getDataMock().subscribe( response => {
      this.profiles = response;
    });
  }

  private loadTranslations() {
    this.loadGenres();
    this.langChangeSubscription = this.translate.onLangChange.subscribe(() => {
      this.loadGenres();
    });
  }

  validateForm(input_name: string) {
     return this.profileForm().get(input_name)?.invalid
      && this.profileForm().get(input_name)?.touched;
  }
}
