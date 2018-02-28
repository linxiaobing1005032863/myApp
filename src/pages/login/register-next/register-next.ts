import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HttpService } from '../../../providers/Http.service';
import { USER_URL } from '../../../config/config';

@IonicPage()
@Component({
  selector: 'page-register-next',
  templateUrl: 'register-next.html',
})
export class RegisterNextPage {
  msg: string;
  showmsg: boolean;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpService,
    public loadingCtrl: LoadingController) {
  }
  ionViewDidLoad() {
    this.showmsg = false;
  }
  comfirm(a: string, b: string): void {
    if (a && b) {
      let loading = this.loadingCtrl.create({
        content: '正在提交...'
      });
      loading.present();
      this.http.get(USER_URL + `v1/checkPassword?password=${a}&repassword=${b}`)
        .then((res) => {
          loading.dismiss();
          if (res.code == 0) {
            this.navCtrl.push('RegisterTwoPage', { registerType: this.navParams.get('registerType'), password: a, authCode: this.navParams.get('authCode'), rePassword: b, phone: this.navParams.get('phone') });
          } else {
            this.msg = res.msg;
            this.showmsg = true;
          }
        })
    }
  }
}
