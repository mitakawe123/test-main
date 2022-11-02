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

  constructor() {}

  ngOnInit(): void {
    this.loadModalPwa();
  }

  private loadModalPwa(): void {
    window.addEventListener('beforeinstallprompt', (event: any) => {
      event.preventDefault();
      this.modalPwaEvent = event;
      event.userChoice.then((choiceResult: any) => {
        console.log(choiceResult.outcome); // either "accepted" or "dismissed"
      });
    });
  }

  async addToHomeScreen() {
    // if (this.modalPwaEvent) {
    //   this.modalPwaEvent.prompt();
    // }

    // deferredPrompt is a global variable we've been using in the sample to capture the `beforeinstallevent`
    this.modalPwaEvent.prompt();
    // Find out whether the user confirmed the installation or not
    const { outcome } = await this.modalPwaEvent.userChoice;
    // The deferredPrompt can only be used once.
    this.modalPwaEvent = null;
    // Act on the user's choice
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt.');
    } else if (outcome === 'dismissed') {
      console.log('User dismissed the install prompt');
    }
  }
}
