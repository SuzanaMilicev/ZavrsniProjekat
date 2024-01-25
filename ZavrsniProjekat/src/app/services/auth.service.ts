import { Injectable } from '@angular/core';
import { MyUser } from '../models/My User';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { sendEmailVerification } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: MyUser;

  constructor(
    private angularFirestore: AngularFirestore,
    private angularFireAuth: AngularFireAuth,
    public router: Router,
  ) {
    this.angularFireAuth.authState.subscribe((user: any) => {
      if (user) {
        this.userData = user;
        if (localStorage) {
          localStorage.setItem('user', JSON.stringify(this.userData));
        }
      }
      else {
        //za logg out
        if (localStorage) {
          localStorage.setItem('user', 'null');
        }
      }
    })
  }

  signIn(email: string, password: string) {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
        this.setUserData(result.user);
        //navigate'
        if (localStorage) {
          localStorage.setItem('user', JSON.stringify(result.user));
        }
        // debugger;
        this.router.navigate(['/']);
      })
      .catch((error) => {
        alert(error.message);
      })
  }

  setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.angularFirestore.doc(`user/${user.uid}`);
    this.userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      displaySurname: user.displaySurname,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(this.userData, {
      merge: true
    })
  }

  signOut() {
    return this.angularFireAuth.signOut()
      .then(() => {
        if (localStorage) {
          localStorage.removeItem('user');
        }
        this.router.navigate(['sign-in']);
      })
  }

  signUp(email: string, password: string) {
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.sendVerificationMail(result.user);
        this.setUserData(result.user);
      })
      .catch((error) => {
        alert(error.message);
      })
  }

  sendVerificationMail(currentUser: any) {
    if (currentUser) {
      sendEmailVerification(currentUser)
        .then(() => {
          this.router.navigate(['thanks-for-registering'])
        })
    }
  }

  get isLoggedIn(): boolean {
    let user = null;
    if (localStorage) {
      user = JSON.parse(localStorage.getItem('user')!);
    }
    return user !== null && user.emailVerified !== false ? true : false;
  }

  getToken() {
    let user = null;
    if(localStorage){
      user = JSON.parse(localStorage.getItem('user')!);
    }
    const token = user !== null ? user.stsTokenManager.accessToken : null;
    return token;
  }

}
