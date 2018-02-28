import { Component, ViewChild } from '@angular/core';
import { IonicPage, Tabs, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('mainTabs') tabs: Tabs;
  tab1Client = 'HomePage';
  tab2Client = '';
  tab3Client = 'WorkPage';
  tab4Client = '';


  constructor(public alertCtrl: AlertController) {

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
