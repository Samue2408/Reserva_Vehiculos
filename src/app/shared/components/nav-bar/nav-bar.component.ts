import { Component, Input, OnInit } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent implements OnInit {
  //Icons
  faSearch = faSearch;
  faBars = faBars;

  @Input() cssClass!: string;
  @Input() isHomeView!: boolean;

  ngOnInit(): void {
    document.querySelector('.nav')?.classList.add(this.cssClass);
  }
}
