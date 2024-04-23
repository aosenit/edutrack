import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {
  @ViewChild('video', { static: true }) videoElement: ElementRef;
  constraints = {
    video: {
      facingMode: 'environment',
      width: { ideal: 4096 },
      height: { ideal: 2160 }
    }
  };
  constructor(
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.startCamera();
  }


  startCamera() {
    if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
      navigator.mediaDevices.getUserMedia(this.constraints)
        .then(this.attachVideo.bind(this));

    } else {
      alert('Sorry, camera not available.');
    }
  }

  attachVideo(stream) {
    this.renderer.setProperty(this.videoElement.nativeElement, 'srcObject', stream);
  }
  comment() {
    const comment = document.querySelector('.comment');
    const screen = document.querySelector('.sideA');

    comment.classList.toggle('remove-comment');
    screen.classList.toggle('make-full');
  }

}
