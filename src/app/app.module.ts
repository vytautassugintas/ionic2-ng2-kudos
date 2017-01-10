import {NgModule} from '@angular/core';
import {IonicApp, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';

import {HomePage} from './pages/home/home';
import {TabsPage} from './pages/tabs/tabs';
import {LoginPage} from './pages/login/login';
import {AuthenticationService} from "./services/authentication.service";
import {HomeService} from "./services/home.service";
import {KudosService} from "./services/kudos.service";
import {SignupPage} from "./pages/signup/signup";
import {KudosModalPage} from "./pages/_modals/kudos-modal/kudos-modal";
import {HistoryPage} from "./pages/history/history";
import {ShopPage} from "./pages/shop/shop";
import {UserModalPage} from "./pages/_modals/user-modal/user-modal";
import {UserIconComponent} from "./components/user-icon/user-icon.component";
import {ActionItemComponent} from "./components/action-item/action-item.component";
import {MenuPage} from "./pages/_popovers/menu/menu";
import {EndorsedTransactionsModalPage} from "./pages/_modals/endorsed-transactions-modal/endorsed-transactions-modal";
import {EndorsementsModalPage} from "./pages/_modals/endorsements-modal/endorsements-modal";
import {UserEndorsedTransactionsModalPage} from "./pages/_modals/user-endorsed-transactions-modal/user-endorsed-transactions-modal";
import {LeadersPage} from "./pages/leaders/leaders";
import {LeaderboardService} from "./services/leaderboard.service";
import {RelationsPage} from "./pages/relations/relations";
import {SearchUserModal} from "./pages/_modals/search-user-modal/search-user-modal";
import {ShopService} from "./services/shop.service";
import {OrdersModal} from "./pages/_modals/orders-modal/orders-modal";

@NgModule({
  declarations: [
    MyApp,
    HistoryPage,
    RelationsPage,
    HomePage,
    KudosModalPage,
    UserModalPage,
    EndorsedTransactionsModalPage,
    EndorsementsModalPage,
    UserEndorsedTransactionsModalPage,
    SearchUserModal,
    OrdersModal,
    MenuPage,
    ShopPage,
    LoginPage,
    SignupPage,
    LeadersPage,
    TabsPage,
    UserIconComponent,
    ActionItemComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HistoryPage,
    RelationsPage,
    HomePage,
    KudosModalPage,
    UserModalPage,
    EndorsedTransactionsModalPage,
    EndorsementsModalPage,
    UserEndorsedTransactionsModalPage,
    SearchUserModal,
    OrdersModal,
    MenuPage,
    ShopPage,
    LoginPage,
    SignupPage,
    LeadersPage,
    TabsPage,
    UserIconComponent,
    ActionItemComponent
  ],
  providers: [
    AuthenticationService,
    HomeService,
    KudosService,
    LeaderboardService,
    ShopService
  ]
})
export class AppModule {
}
