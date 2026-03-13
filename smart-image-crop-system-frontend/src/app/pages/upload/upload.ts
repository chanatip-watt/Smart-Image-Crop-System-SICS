import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-upload',
  standalone: false,
  templateUrl: './upload.html',
  styleUrl: './upload.css',
})
export class Upload {

  url_img: string = '';
  result_img: string = '';

  onFileSelected(event: any) {

    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

     this.url_img = URL.createObjectURL(file);
  }

  sendToAI(){
    console.log("ส่งภาพไป AI");
  }

}