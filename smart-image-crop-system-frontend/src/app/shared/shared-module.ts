import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowImg } from './show-img/show-img';

@NgModule({
  declarations: [ShowImg],
  imports: [CommonModule],
  exports: [
    ShowImg
  ]

})
export class SharedModule {}
