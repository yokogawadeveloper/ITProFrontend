import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-attachmentsform',
  templateUrl: './attachmentsform.component.html',
  styleUrls: ['./attachmentsform.component.scss'],
})


export class AttachmentsformComponent implements OnInit {
  attachments: File[] = [];

  constructor(private modalCtrl: ModalController,) { }


  ngOnInit() { }

  handleAttachment(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        this.attachments.push(file);
      }
    }
  }

  deleteAttachment(index: number) {
    this.attachments.splice(index, 1);
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    console.log(this.attachments);
    return this.modalCtrl.dismiss(this.attachments, 'confirm');


  }

}

