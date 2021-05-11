import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/store/store.service';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent implements OnInit {

    user = null;

    constructor(public store: StoreService) { }

    ngOnInit() {
        this.store.user$.subscribe( value => {
            this.user = value;
        })
    }

}
