import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing-module';

import { Upload } from './upload/upload';
import { ServiceModule } from '../service/service-module';
import { SharedModule } from '../shared/shared-module';

@NgModule({
  declarations: [Upload],
  imports: [CommonModule, PagesRoutingModule,ServiceModule, SharedModule],
})
export class PagesModule {}
