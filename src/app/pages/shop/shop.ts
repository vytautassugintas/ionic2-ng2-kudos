import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html'
})
export class ShopPage {

  shopItems: Array<any> = [];

  constructor(public navCtrl: NavController) {
    this.mockShopItemsList();
  }

  ionViewDidLoad() {
    console.log('Hello ShopPage Page');
  }

  mockShopItemsList() {
    this.shopItems.push(this.mockShopItem(
      "Duo Bear",
      "Pay for one and get two",
      "http://4.bp.blogspot.com/-qExGQcn234Q/URB8JCRUsMI/AAAAAAAADcQ/8B1TA5AB1g8/s320/Teddyday_teddy_bear_wallpaper+(3).jpg",
      50),
      this.mockShopItem(
        "Teddy Bear",
        "This bear will cheer you up",
        "http://freebackgroundshd.com/wp-content/uploads/2016/02/Teddy-Bear-Baby-Toy-with-Roses-HD-320x240.jpg",
        30
      ),
      this.mockShopItem(
        "Pink Bear",
        "Roses are red or pink",
        "http://2.bp.blogspot.com/-9s1su9Gb4yg/UVqLCTc_wFI/AAAAAAAAAL0/Q9DcXZy0fBk/s320/Love+Teddy+Bear+Wallpapers+1+(5).jpg",
        30
    ));
  }

  mockShopItem(title, description, imageUrl, price) {
    return {
      title: title,
      description: description,
      imageUrl: imageUrl,
      price: price
    }
  }


}
