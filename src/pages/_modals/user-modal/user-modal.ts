import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {HomeService} from "../../../app/services/home.service";

/*
  Generated class for the UserModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-user-modal',
  templateUrl: 'user-modal.html'
})
export class UserModalPage {

  userId: string;
  userProfile: any = {};

  constructor(public navCtrl: NavController, public params: NavParams, public viewController: ViewController, public homeService: HomeService) {
    this.userId = params.get("userId");
  }

  ionViewDidLoad() {
    this.loadUserProfile(this.userId);
  }

  loadUserProfile(id){
    this.homeService.userProfile(id).subscribe(
      profile => this.userProfile = profile,
      error => console.log(error)
    )
  }

  getUserFullName(){
    return this.userProfile.firstName + ' ' + this.userProfile.lastName;
  }


  dismiss() {
    this.viewController.dismiss(null);
  }

}
