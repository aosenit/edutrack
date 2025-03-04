import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'trustedHtml'
})
export class TrustedHtmlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  transform(content) {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
}
