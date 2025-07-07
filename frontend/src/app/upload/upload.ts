import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from './service';

@Component({
  selector: 'app-upload',
  standalone: false,
  templateUrl: './upload.html',
  styleUrl: './upload.css'
})
export class Upload {
  private service = inject(Service);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  selectedFile: File | null = null;
  uploadSuccess = false;
  uploadError = false;

  constructor() {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.uploadSuccess = false;
      this.uploadError = false;
    }
  }

  async onUpload(event: Event) {
    event.preventDefault();
    if (!this.selectedFile) return;
    if (this.selectedFile.type !== 'text/csv') {
      this.uploadError = true;
      this.uploadSuccess = false;
      this.cdr.detectChanges();
      return;
    }
    try {
      await this.service.uploadFile(this.selectedFile);
      this.uploadSuccess = true;
      this.uploadError = false;
      this.cdr.detectChanges(); // 
    } catch {
      this.uploadSuccess = false;
      this.uploadError = true;

      this.cdr.detectChanges(); // 
    }
  }
}
