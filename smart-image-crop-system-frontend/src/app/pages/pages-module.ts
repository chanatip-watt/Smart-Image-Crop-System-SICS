import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing-module';

import { SharedModule } from '../shared/shared-module';
import { Upload } from './upload/upload';

@NgModule({
  declarations: [Upload],
  imports: [CommonModule, PagesRoutingModule,SharedModule],
})
export class PagesModule {}
