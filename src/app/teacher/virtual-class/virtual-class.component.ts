import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
// import { ZoomMtg } from '@zoomus/websdk';
// import { DOCUMENT } from '@angular/common';

// ZoomMtg.preLoadWasm();
// ZoomMtg.prepareJssdk();
@Component({
  selector: 'app-virtual-class',
  templateUrl: './virtual-class.component.html',
  styleUrls: ['./virtual-class.component.css']
})
export class VirtualClassComponent implements OnInit {
  classDetails: any;
  myDate: any;
  @ViewChild('video', { static: true }) videoElement: ElementRef;
  constraints = {
    video: {
      facingMode: 'environment',
      width: { ideal: 4096 },
      height: { ideal: 2160 }
    }
  };
  // setup your signature endpoint here: https://github.com/zoom/websdk-sample-signature-node.js
  // signatureEndpoint = 'http://localhost:4000';
  // apiKey = 'JTFle51tQkqmox4U-Dr7Bw';
  // meetingNumber =  '9930672 0163' ;
  // role = 0;
  // leaveUrl = 'http://localhost:4200';
  // userName = 'Angular';
  // userEmail = '';
  // passWord = '';
  constructor(
    public httpClient: HttpClient,
    private renderer: Renderer2) { }

  ngOnInit() {
    this.myDate = new Date();

    this.startCamera();
    this.classDetails = JSON.parse(sessionStorage.getItem('current-class'));

  }

  startCamera() {
    if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
      navigator.mediaDevices.getUserMedia(this.constraints)
        .then(this.attachVideo.bind(this))
        .catch(this.handleError);

    } else {
      alert('Sorry, camera not available.');
    }
  }

  attachVideo(stream) {
    this.renderer.setProperty(this.videoElement.nativeElement, 'srcObject', stream);
  }

  handleError(error) {
    console.log('Error: ', error);
}

  back() {
    window.history.back();
  }

  timeConvert(input) {
    // tslint:disable-next-line:prefer-const
    let num = input;
    const hours = (num / 60);
    // tslint:disable-next-line:prefer-const
    let newHours = Math.floor(hours);
    // tslint:disable-next-line:prefer-const
    let minutes = (hours - newHours) * 60;
    // tslint:disable-next-line:prefer-const
    let newMinutes = Math.round(minutes);
    return newHours + ' hr(s) and ' + newMinutes + 'mins' ;
    }

  openSomething(id) {
    window.open('https://zoom.us/j/' + id , '_blank');
    console.log(id);
    // window.open(id , '_blank');
  }


  // getSignature() {
  //   this.httpClient.post(this.signatureEndpoint, {
  //     meetingNumber: this.meetingNumber,
  //     role: this.role
  //   }).toPromise().then((data: any) => {
  //     if (data.signature) {
  //       console.log(data.signature);
  //       this.startMeeting(data.signature);
  //     } else {
  //       console.log(data);
  //     }
  //   }).catch((error) => {
  //     console.log(error);
  //   });
  // }

  // startMeeting(signature) {

  //   document.getElementById('zmmtg-root').style.display = 'block';

  //   ZoomMtg.init({
  //     leaveUrl: this.leaveUrl,
  //     isSupportAV: true,
  //     success: (success) => {
  //       console.log(success);

  //       ZoomMtg.join({
  //         signature,
  //         meetingNumber: this.meetingNumber,
  //         userName: this.userName,
  //         apiKey: this.apiKey,
  //         userEmail: this.userEmail,
  //         passWord: this.passWord,
  //         success: (success) => {
  //           console.log(success);
  //         },
  //         error: (error) => {
  //           console.log(error);
  //         }
  //       });

  //     },
  //     error: (error) => {
  //       console.log(error);
  //     }
  //   });
  // }


}
