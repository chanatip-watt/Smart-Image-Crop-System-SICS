import { ChangeDetectorRef, Component } from '@angular/core';
import { ImageApiService } from '../../service/api/image-api.service';
import { DetectType, UploadImageDTO } from '../../service/dto/upload-Image.dto';

@Component({
  selector: 'app-upload',
  standalone: false,
  templateUrl: './upload.html',
  styleUrl: './upload.css',
})
export class Upload {

  alertMessage: string = '';
  url_img: string = '';
  result_img: string = '';
  selectedFile: File | null = null;
  detectType: DetectType = 'face';
  loading: boolean = false;

  constructor(
    private imageApi: ImageApiService,
    private cdr: ChangeDetectorRef
  ) {}

  showAlert(message: string) {
    this.alertMessage = message;
  }

  onDetectTypeChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.detectType = value as DetectType;
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    this.selectedFile = file;
    this.url_img = URL.createObjectURL(file);
    this.result_img = '';
  }

  sendToAI() {

    if (!this.selectedFile) {
      this.showAlert('กรุณาเลือกรูปก่อน');
      return;
    }

    if (!this.selectedFile.type.startsWith('image/')) {
      this.showAlert('ไฟล์ไม่ถูกต้อง');
      return;
    }

    this.loading = true;
    this.alertMessage = '';

    const dto: UploadImageDTO = {
      file: this.selectedFile,
      type: this.detectType
    };

    this.imageApi.processImage(dto).subscribe({

      next: (res: Blob) => {
        const img = URL.createObjectURL(res);
        this.result_img = img;
        this.loading = false;
        this.cdr.detectChanges();
      },

      error: async (err: any) => {
        let message = 'เกิดข้อผิดพลาด';

        if (err.error instanceof Blob) {
          try {
            const text = await err.error.text();
            const json = JSON.parse(text);
            message = json.message;
          } catch {
            message = 'ไม่สามารถอ่าน error ได้';
          }
        }

        this.showAlert(message);
        this.loading = false;
        this.cdr.detectChanges();
      }

    });
  }
}