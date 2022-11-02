import { Component, OnInit } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'test-main';
  modalPwaEvent: any;
  modalPwaPlatform: string | undefined;

  constructor(private platform: Platform) {
  }

  public ngOnInit(): void {
    this.loadModalPwa();
  }

  private loadModalPwa(): void {
    if (this.platform.ANDROID || this.platform.isBrowser) {
      window.addEventListener('beforeinstallprompt', (event: any) => {
        event.preventDefault();
        this.modalPwaEvent = event;
        event.userChoice.then((choiceResult: any) => {
          console.log(choiceResult.outcome); // either "accepted" or "dismissed"
        });
      });
    }

    // if (this.platform.IOS && this.platform.SAFARI) {
    //   const isInStandaloneMode =
    //     'standalone' in window.navigator &&
    //     (<any>window.navigator)['standalone'];
    //   if (!isInStandaloneMode) {
    //     this.modalPwaPlatform = 'IOS';
    //   }
    // }
  }

  public addToHomeScreen(): void {
    this.modalPwaEvent.prompt();
    this.modalPwaPlatform = undefined;
  }

  public closePwa(): void {
    this.modalPwaPlatform = undefined;
  }
}
