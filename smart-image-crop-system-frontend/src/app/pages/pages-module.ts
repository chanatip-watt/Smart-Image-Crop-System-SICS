import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing-module';
import { Upload } from './upload/upload';

@NgModule({
  declarations: [Upload],
  imports: [CommonModule, PagesRoutingModule],
})
export class PagesModule {}
