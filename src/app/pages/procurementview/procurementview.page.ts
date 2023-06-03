import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AnimationController } from '@ionic/angular';


@Component({
  selector: 'app-procurementview',
  templateUrl: './procurementview.page.html',
  styleUrls: ['./procurementview.page.scss'],
})
export class ProcurementviewPage implements OnInit {

  // variables
  procurementData: any = [];
  procurementDataById: any = [];
  isModalOpen: boolean = false;

  constructor(private apiService: ApiService, private animationCtrl: AnimationController,) {
   }

  setOpen(id: number, isOpen: boolean) {
    if (id) {
      // get procurement data by id for modal
      this.apiService.getProcurementDataById(id).subscribe((res) => {
        this.procurementDataById = res;
        console.log('procurementDataById', this.procurementDataById);
      })
    }

    this.isModalOpen = isOpen;
  }
  // modal animation
  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot!;

    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  }



  ngOnInit() {
    this.apiService.getProcurementData().subscribe((res) => {
      this.procurementData = res;
    }, (err) => {
      console.log(err);
    });
  }// end of ngOnInit
}










