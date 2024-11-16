import { Component, OnInit } from '@angular/core';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { faCarRear } from '@fortawesome/free-solid-svg-icons';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHouseChimneyWindow } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit{

    // icons
    faList = faList
    faCarRear = faCarRear
    faBagShooping = faBagShopping
    faHeart = faHeart
    faHouseChimneyWindow = faHouseChimneyWindow
    faUser = faUser
    faGear = faGear
    faArrowRightFromBracket = faArrowRightFromBracket

    ngOnInit(): void {
      
    }

}
