import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
