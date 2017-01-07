import {Component} from '@angular/core';

import {HomePage} from '../home/home';
import {HistoryPage} from "../history/history";
import {ShopPage} from "../shop/shop";
import {LeadersPage} from "../leaders/leaders";
import {RelationsPage} from "../relations/relations";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = HomePage;
  tab2Root: any = HistoryPage;
  tab3Root: any = RelationsPage;
  leadersRoot: any = LeadersPage;
  tab4Root: any = ShopPage;

  constructor() {

  }
}
