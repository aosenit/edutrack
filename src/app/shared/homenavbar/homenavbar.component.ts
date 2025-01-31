import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homenavbar',
  templateUrl: './homenavbar.component.html',
  styleUrls: ['./homenavbar.component.css']
})
export class HomenavbarComponent implements OnInit {
  subdomain: string;
  displayAdminLogin = true;
  displayOtherLogin = true;

  constructor() { }

  ngOnInit() {
    this.getSubdomain();
    const sticky = 20;
    const nav = document.querySelector('nav');
    document.addEventListener('scroll', () => {
      if (window.scrollY > sticky) {
        nav.classList.add('nav-bg');
      } else {
        nav.classList.remove('nav-bg');

      }
    });
  }


  getSubdomain() {
    const domain = window.location.hostname;
    // // (domain)
    if (domain.indexOf('.') < 0 || domain.split('.')[0] === 'edutrack-black') {
      this.subdomain = domain.split('.')[0];
      localStorage.setItem('sub-domain', this.subdomain);
      this.displayAdminLogin = true;
      this.displayOtherLogin = true;
    }
    else if (domain.indexOf('.') < 0 ||
      domain.split('.')[0] === 'example' || domain.split('.')[0] === 'lvh' || domain.split('.')[0] === 'www' || domain.split('.')[0] === 'myEduTrack') {
      this.subdomain = '';
      this.displayAdminLogin = true;
      this.displayOtherLogin = false;
    } else {
      this.subdomain = domain.split('.')[0];
      // // (this.subdomain)
      localStorage.setItem('sub-domain', this.subdomain);
      this.displayAdminLogin = false;
      this.displayOtherLogin = true;
    }
   }



}
