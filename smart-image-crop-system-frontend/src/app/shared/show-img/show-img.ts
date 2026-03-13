import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-show-img',
  standalone: false,
  templateUrl: './show-img.html',
  styleUrl: './show-img.css',
})
export class ShowImg implements OnChanges {

  @Input() title!: string;
  @Input() imageUrl!: string;

  currentImage: string = '';

  ngOnChanges(changes: SimpleChanges) {

    if (changes['imageUrl'] && this.imageUrl) {
      this.currentImage = this.imageUrl;
    }

  }

}