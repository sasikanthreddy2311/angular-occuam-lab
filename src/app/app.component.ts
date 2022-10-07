import { Component } from '@angular/core';
import { ProfileService } from './services/profile.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-occuam-lab';
  isLoggedIn: boolean = false;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;

  constructor(private profileService: ProfileService, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.profileService.login().subscribe((data: any) => {
      console.log(data)
      if(data.status) {
        this.isLoggedIn = true;
        localStorage.setItem('auth_token', data.auth_token);
        this.openSnackBar("Login Successful", "Done",)
      }
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }
}
