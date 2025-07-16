import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signuoUsers: any[] = [];
  signupObj: any = {
    name: '',
    email: '',
    password: '',
  }
  loginObj: any = {
    name: '',
    password: '',
  }

  constructor(private router: Router) {}

  ngOnInit(): void {
    const localData = localStorage.getItem('signuoUsers');
    if (localData != null) {
      this.signuoUsers = JSON.parse(localData);
    }
  }

  onSignup() {
    this.signuoUsers.push(this.signupObj);
    localStorage.setItem('signuoUsers', JSON.stringify(this.signuoUsers));
    this.signupObj = {
      name: '',
      email: '',
      password: '',
    };
  }

  onLogin() {
    const isUserExist = this.signuoUsers.find(m => m.name === this.loginObj.name && m.password === this.loginObj.password);
    if (isUserExist != undefined) {
      localStorage.setItem('isLoggedIn', 'true'); // Set logged-in status
      this.router.navigate(['/customers']); // Redirect to Customers page
      this.localLoginToRemote();
    } else {
      alert('Invalid Credentials');
    }
  }
  localLoginToRemote(){
    console.warn("Lodin called????????????")
  }
}
