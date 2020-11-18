import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
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
// // setup your signature endpoint here: https://github.com/zoom/websdk-sample-signature-node.js
// signatureEndpoint = 'http://localhost:4000';
// apiKey = 'JTFle51tQkqmox4U-Dr7Bw';
// meetingNumber =  '99306720163' ;
// role = 0;
// leaveUrl = 'http://localhost:4200';
// userName = 'Angular';
// userEmail = '';
// passWord = '';
  constructor(public httpClient: HttpClient) { }

  ngOnInit() {
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

  back() {
    window.history.back();
  }

}
