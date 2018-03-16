import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams, ModalController, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public alertCtrl: AlertController, ) {

  }
  gotoDatabase() {
    this.navCtrl.push('DatabasePage')
  }
  gotoMarket() {
    this.navCtrl.push('MarketDemandPage')
  }
  gotoDetailbase() {
    this.navCtrl.push('DetailPage')
  }
  gotoBidding() {
    this.navCtrl.push('biddingPage')
  }
  gotoBid(){
    this.navCtrl.push('BidPage');
  }
  xx() {
    let confirm = this.alertCtrl.create({
      title: '消息提示',
      message: "正在开发...敬请期待",
      buttons: [
        {
          text: '确认',
          handler: () => {
          }
        }
      ]
    });
    confirm.present();
  }
}
