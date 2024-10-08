import { NgFor } from '@angular/common';
import { Component, Injectable, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { AccountService } from './_services/account.service';
import { HomeComponent } from './home/home.component';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { FileUploadModule } from 'ng2-file-upload';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavComponent,
    HomeComponent,
    NgxSpinnerComponent,
    FileUploadModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
@Injectable()
export class AppComponent implements OnInit {
  title = 'Dating App';

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }
}
