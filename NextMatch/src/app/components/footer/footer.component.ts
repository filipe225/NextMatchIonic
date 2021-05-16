import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

    constructor(public router: Router) { }

    ngOnInit() {}

    handleNavigation(path) {
        switch(path) {
            case 'teams':
                this.router.navigateByUrl('/teams');
                break;
            case 'matches':
                this.router.navigateByUrl('/matches');
                break;
            case 'settings':
                this.router.navigateByUrl('/settings');
                break;
            default: 
                break;
        }
    }
}
