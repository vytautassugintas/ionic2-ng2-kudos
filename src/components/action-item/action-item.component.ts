import {Component, OnInit} from '@angular/core';
import {Input} from "@angular/core/src/metadata/directives";
import {UserModalPage} from "../../pages/_modals/user-modal/user-modal";
import {ModalController} from "ionic-angular";

@Component({
  selector: 'kudos-action-item',
  templateUrl: 'action-item.component.html'
})
export class ActionItemComponent implements OnInit {

  @Input() action: any;
  @Input() noShadow: boolean;

  constructor(public modalCtrl: ModalController) {

  }

  ngOnInit() {
    
  }

  openUserModal(id) {
    this.modalCtrl.create(UserModalPage, {userId: id}).present();
  }

}
