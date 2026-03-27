import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { UploadImageDTO } from '../dto/upload-Image.dto';

@Injectable({
  providedIn: 'root'
})
export class ImageApiService {

  private apiUrl = 'http://localhost:3000/image';

  constructor(private http: HttpClient) {}

  processImageApi(data: UploadImageDTO): Observable<Blob> {

    const formData = new FormData();
    formData.append('file', data.file);
    formData.append('type', data.type);

    return this.http.post(`${this.apiUrl}/process-image`, formData, {
      responseType: 'blob'
    });

  }

}