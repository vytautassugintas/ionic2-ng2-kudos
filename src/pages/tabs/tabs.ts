import {Component} from '@angular/core';

import {HomePage} from '../home/home';
import {ContactPage} from '../contact/contact';
import {HistoryPage} from "../history/history";
import {ShopPage} from "../shop/shop";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = HistoryPage;
  tab3Root: any = ContactPage;
  tab4Root: any = ShopPage

  constructor() {

  }
}
