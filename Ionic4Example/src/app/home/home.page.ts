import { Component } from '@angular/core';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
    destination:string;
    start:string;

    constructor(
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
