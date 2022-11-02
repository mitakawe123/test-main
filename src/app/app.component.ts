import { Component, OnInit } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter, map } from 'rxjs/operators';
import { Platform } from '@angular/cdk/platform';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  modalPwaEvent: any;
  modalPwaPlatform: string | undefined;

  constructor(private platform: Platform) {}

  public ngOnInit(): void {
    if (this.platform.ANDROID || this.platform.isBrowser) {
      this.loadModalPwa();
    }
  }

  private loadModalPwa(): void {
    console.log(this.platform);
    window.addEventListener('beforeinstallprompt', (event: any) => {
      event.preventDefault();
      this.modalPwaEvent = event;
      this.modalPwaPlatform = 'ANDROID';
      event.userChoice.then((choiceResult: any) => {
        console.log(choiceResult.outcome); // either "accepted" or "dismissed"
      });
    });
  }

  public addToHomeScreen(): void {
    this.modalPwaEvent.prompt();
    this.modalPwaPlatform = undefined;
  }

  public closePwa(): void {
    this.modalPwaPlatform = undefined;
  }
}
