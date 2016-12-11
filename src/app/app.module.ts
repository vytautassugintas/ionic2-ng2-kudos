import {NgModule} from '@angular/core';
import {IonicApp, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';
import {ContactPage} from './pages/contact/contact';
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

@NgModule({
  declarations: [
    MyApp,
    HistoryPage,
    ContactPage,
    HomePage,
    KudosModalPage,
    UserModalPage,
    EndorsedTransactionsModalPage,
    EndorsementsModalPage,
    MenuPage,
    ShopPage,
    LoginPage,
    SignupPage,
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
    ContactPage,
    HomePage,
    KudosModalPage,
    UserModalPage,
    EndorsedTransactionsModalPage,
    EndorsementsModalPage,
    MenuPage,
    ShopPage,
    LoginPage,
    SignupPage,
    TabsPage,
    UserIconComponent,
    ActionItemComponent
  ],
  providers: [
    AuthenticationService,
    HomeService,
    KudosService
  ]
})
export class AppModule {
}
