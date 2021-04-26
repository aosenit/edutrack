import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homenavbar',
  templateUrl: './homenavbar.component.html',
  styleUrls: ['./homenavbar.component.css']
})
export class HomenavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const sticky = 20;
    const nav = document.querySelector('nav');
    document.addEventListener('scroll', () => {
      if (window.scrollY > sticky) {
        console.log(window.scrollY);
        nav.classList.add('nav-bg');
      } else {
        nav.classList.remove('nav-bg');
        
      }
    });
  }



}
