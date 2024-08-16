import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatTooltip } from "@angular/material/tooltip";
import { MatIcon } from "@angular/material/icon";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-img-selector",
  standalone: true,
  imports: [MatIcon, MatTooltip, CommonModule],
  templateUrl: "./img-selector.component.html",
  styleUrls: ["./img-selector.component.scss"],
})
export class ImgSelectorComponent {
  @Input() urlCurrentImg: string | null = null;
  @Output() selectedImage: EventEmitter<File> = new EventEmitter<File>();

  imgBase64: string | null = null;
  icUpload = 'upload'; // Utiliza un nombre de icono directamente

  selectedImg(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      const inputElement: HTMLInputElement = event.target;
      if (inputElement.files && inputElement.files.length > 0) {
        const file: File = inputElement.files[0];
        this.toBase64(file).then((value: string) => (this.imgBase64 = value));
        this.selectedImage.emit(file);
        this.urlCurrentImg = null;
      }
    }
  }

  toBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }
}
