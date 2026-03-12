import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Upload } from './upload/upload';

const routes: Routes = [
  {
    path: '',
    component: Upload
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}