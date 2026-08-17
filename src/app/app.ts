import { Component, signal, } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone : true,
  imports: [ NgIf, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  // 1. Variables (The State)
   imageSrc : string | ArrayBuffer | null = null;
   extractedText : string = ' ';
   isLoading : boolean = false;
   selectedFile : File | null = null;

   // 2. Methods (The Actions)

   onFileSelected(sevent: any) {};
  
   //Logic to read the selected file and ImageSrc

   



   extractText() {

    this.isLoading = true;

   };


   copyToClipboard() {};




}
