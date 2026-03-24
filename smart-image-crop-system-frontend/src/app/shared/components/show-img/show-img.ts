import { Component, Input, OnChanges, SimpleChange} from '@angular/core';

@Component({
  selector: 'app-show-img',
  standalone: false,
  templateUrl: './show-img.html',
  styleUrl: './show-img.css',
})
export class ShowImg implements OnChanges {

  @Input() title?: string;
  @Input() imageUrl?: string;

  currentImage: string = '';

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (changes['imageUrl'] && this.imageUrl) {
      
      this.currentImage = this.imageUrl;
    }

  }

}