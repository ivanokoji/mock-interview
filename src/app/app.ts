import { Component, ChangeDetectorRef } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  standalone : true,
  imports: [ NgIf, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  constructor(private appService: AppService, private cdr : ChangeDetectorRef) {} 

  // 1. Variables (The State)
   imageSrc : string | ArrayBuffer | null = null;
   extractedText : string = ' ';
   isLoading : boolean = false;
   selectedFile : File | null = null;

   // 2. Methods (The Actions)

   onFileSelected(event: any) {

  //Logic to read the selected file and ImageSrc

   const file = event.target.files[0];

  if(file) {
    this.resetSelection(); // Reset previous selection
    this.selectedFile = file;
    const reader = new FileReader();

   reader.onload = () => {

    this.imageSrc = reader.result; // This sets my component variable
    this.cdr.detectChanges(); // Manually trigger change detection
   };
   reader.readAsDataURL(file);
  }
   }
  
  
   extractText() {
   if(!this.selectedFile) {
    alert('Please select an image file first.');
    return;
   }

    this.isLoading = true;
   
    const formData = new FormData();
    formData.append('image',this.selectedFile);

    const headers = new HttpHeaders({
      'X-Api-Key': 'X8BcKCsqxEhbq3ZVgsNbFiiPDdyQsOGH4p0FaMMW'
   });

   this.appService.extractText(this.selectedFile).subscribe({
     next : (response) => {
    this.isLoading = false;
    //API Ninjas return an array of detected text blocks,
    // e.g. [{text: 'Detected text 1'}, {text: 'Detected text 2'}]
    //We can combine them into a single string for display
    this.extractedText = response.map((item: any)  => item.text).join(' ');
    this.cdr.detectChanges(); // Manually trigger change detection
    },
    error : (err) => {
      this.isLoading = false;
      console.error('OCR Error:', err);
      alert('Failed to extract text. Please try again.');
    }
   });

  }

   copyToClipboard() {
    if(!this.extractedText) {
      alert('There is no text to copy.Please extract first');
      return;
    }
    navigator.clipboard.writeText(this.extractedText)
     .then(() => {
      alert('Text copied to clipboard!');
     })
     .catch((err) => {
      console.error('Could not copy text: ', err);
     });

   }

  resetSelection() {

    this.imageSrc = null;
    this.extractedText = '';
    this.selectedFile = null;


  }
}
