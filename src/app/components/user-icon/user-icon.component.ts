import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'kudos-user-icon',
  templateUrl: 'user-icon.component.html'
})
export class UserIconComponent implements OnInit {

  firstName: string;
  lastName: string;

  @Input()
  set fullName(fullName: string) {
    this.firstName = fullName.split(' ')[0];
    this.lastName = fullName.split(' ')[1];
    this.ngOnInit();
  }

  @Input() size: number;

  initials: string;
  backgroundColors: Array<string>;
  backgroundColor: string;

  constructor() {
    this.backgroundColors = ["#1abc9c", "#16a085", "#3498db", "#2980b9", "#34495e", "#2c3e50", "#e74c3c", "#c0392b"];
  }

  ngOnInit() {
    this.initials = this.firstName.charAt(0) + " " + this.lastName.charAt(0);
    this.backgroundColor = this.backgroundColors[(this.firstName.charCodeAt(0) + this.lastName.charCodeAt(0)) % 8];
  }

}
