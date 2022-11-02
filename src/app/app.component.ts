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

  public ngOnInit(): void {
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

  public addToHomeScreen(): void {
    if (this.modalPwaEvent) {
      this.modalPwaEvent.prompt();
    }
  }
}
