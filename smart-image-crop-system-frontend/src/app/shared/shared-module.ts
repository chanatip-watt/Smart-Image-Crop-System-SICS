import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowImg } from './components/show-img/show-img';
import { Alert } from './components/alert/alert';

@NgModule({
  declarations: [ ShowImg, Alert],
  imports: [CommonModule],
  exports: [
    ShowImg, 
    Alert
  ]
})
export class SharedModule {}
