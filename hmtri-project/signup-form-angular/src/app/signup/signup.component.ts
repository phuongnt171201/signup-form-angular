import {Component, OnInit} from '@angular/core';
import {User} from './user';
import {HttpClient} from '@angular/common/http';
import {NgModel} from '@angular/forms';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  // usernameModel: string;
  // passwordModel: string;
  // emailModel: string;
  // confirmModel: string;
  user: User;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  pwdPattern = '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$';
  url = 'http://localhost:8080/api';

// checkingUserName(): boolean{
  //   if (this.user.username === undefined){
  //     return false;
  //   }
  // }
  // tslint:disable-next-line:typedef
  submitted = false;

  // tslint:disable-next-line:typedef
  // @ts-ignore
  constructor(private http: HttpClient) {
  }

  // tslint:disable-next-line:typedef
  onSubmit(formValue) {
    if (!formValue.username || !formValue.password){
      alert('Required fields is not fullfilled yet.');
      return false;
    }
    this.user = {
      username: formValue.username,
      password: formValue.password,
      email: formValue.email
    };
    this.addUser(this.user);
  }

  addUser(user: User): void{
    this.http.post<User>(this.url, user).subscribe(
      (val) => {
        console.log('POST call successful value returned in body',
          val);
      },
      response => {
        console.log('POST call in error', response);
      },
      () => {
        console.log('The POST observable is now completed.');
      });
  }
  // tslint:disable-next-line:typedef
  // validateName() {
  //   console.log(this.usernameModel);
  //   if (this.usernameModel?.length > 0 && this.usernameModel?.length < 5) {
  //     console.log('non');
  //     return true;
  //   }
  // }

  // tslint:disable-next-line:typedef
  get diagnostic() {
    return JSON.stringify(this.user);
  }

  ngOnInit(): void {
  }

  //   // tslint:disable-next-line:typedef
  // onSubmit() {
  //   console.log('nana');
  // }
  // tslint:disable-next-line:typedef
  checkEqualPwd(pwd, con) {
    console.log(pwd.value);
    console.log(con.value);
    if (pwd.value !== con.value && con.value?.length > 0) {
      return true;
    }
  }
}
