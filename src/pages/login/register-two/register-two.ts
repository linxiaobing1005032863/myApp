import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HttpService } from '../../../providers/Http.service';
import { USER_URL } from '../../../config/config';
import { GlobalData } from '../../../providers/GlobalData';

@IonicPage()
@Component({
  selector: 'page-register-two',
  templateUrl: 'register-two.html',
})
export class RegisterTwoPage {
  msg: string;
  showmsg: boolean;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpService,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public globalData: GlobalData) {
  }
  ionViewDidLoad() {
    this.showmsg = false;
  }

  comfirm(a: string, b: string): void {
    if (a) {
      let loading = this.loadingCtrl.create({
        content: '正在提交...'
      });
      loading.present();
      this.http.post(USER_URL + `v1/registerUser`, { registerType: this.navParams.get('registerType'), phone: this.navParams.get('phone'), authCode: this.navParams.get('authCode'), username: a, password: this.navParams.get('password'), rePassword: this.navParams.get('rePassword'), })
        .then((res) => {
          loading.dismiss();
          if (res.code == 0) {
            let confirm = this.alertCtrl.create({
              title: '温馨提示',
              message: '注册成功',
              buttons: [
                {
                  text: '确认',
                  handler: () => {
                    if (!res.code) {
                      localStorage.setItem('userPhone', '');
                      localStorage.setItem('password', '');
                      this.globalData.userPhone = this.navParams.get('phone');

                      this.navCtrl.popToRoot()
                    }
                  }
                }
              ]
            });
            confirm.present();
          } else {
            this.msg = res.msg;
            this.showmsg = true;
          }
        })
    }
  }
}
