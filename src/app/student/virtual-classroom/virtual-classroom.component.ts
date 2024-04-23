import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-virtual-classroom',
  templateUrl: './virtual-classroom.component.html',
  styleUrls: ['./virtual-classroom.component.css']
})
export class VirtualClassroomComponent implements OnInit {
  classDetails: any;

  @ViewChild('video', { static: true }) videoElement: ElementRef;
  // constraints = {
  //   video: {
  //     facingMode: 'environment',
  //     width: { ideal: 4096 },
  //     height: { ideal: 2160 }
  //   }
  // };
  constructor(
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.classDetails = JSON.parse(sessionStorage.getItem('current-class'));

    // this.startCamera();
  }


  // startCamera() {
  //   if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
  //     navigator.mediaDevices.getUserMedia(this.constraints)
  //       .then(this.attachVideo.bind(this));

  //   } else {
  //     alert('Sorry, camera not available.');
  //   }
  // }

  // attachVideo(stream) {
  //   this.renderer.setProperty(this.videoElement.nativeElement, 'srcObject', stream);
  // }
  comment() {
    const comment = document.querySelector('.comment');
    const screen = document.querySelector('.sideA');

    comment.classList.toggle('remove-comment');
    screen.classList.toggle('make-full');
  }
  openSomething(id) {
    window.open('https://zoom.us/j/' + id , '_blank');
  }


}
