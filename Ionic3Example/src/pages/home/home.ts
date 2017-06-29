import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  destination:string;
  start:string;

  constructor(
      public navCtrl: NavController,
      private launchNavigator: LaunchNavigator
  ) {
    this.start = "";
    this.destination = "Westminster, London, UK";
  }

  navigate(){
    let options: LaunchNavigatorOptions = {
      start: this.start
    };

    this.launchNavigator.navigate(this.destination, options)
        .then(
            success => alert('Launched navigator'),
            error => alert('Error launching navigator: ' + error)
    );
  }
}
