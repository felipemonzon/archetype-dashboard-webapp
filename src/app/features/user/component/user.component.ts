import { Component, ElementRef, input, Input, signal, ViewChild } from '@angular/core';
import { UserModel } from '../model/user-model';
import { MessagingNotification } from '../../../shared/messaging/messaging-notification';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html'
})
export class UserComponent {
  @ViewChild("btnSearch", { static: true })
  public btnSearch!: ElementRef;
  @ViewChild("search", { static: true })
  public search!: ElementRef;

  users = signal<UserModel[]>([]);

  pageSize = 10;
  page: number = 1;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.users.set(this.route.snapshot.data['users']);
  }

  searchBy() {
    console.log('searchBy');
  }

  update(user: UserModel) {
    console.log('update', user);
  }

  openModal() {
    MessagingNotification.create('info', 'Modal', 'Abrir modal de usuario');
  }
}
