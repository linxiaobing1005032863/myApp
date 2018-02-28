import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpService } from '../../../providers/Http.service';
import { DATABASE } from '../../../config/config';

@IonicPage()
@Component({
  selector: 'page-company-details',
  templateUrl: 'company-details.html',
})
export class CompanyDetailsPage {
  id: string;
  token: string;
  detailsList: any = {};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpService) {
    this.id = this.navParams.get('id');
    this.token = this.navParams.get('token');
    this.http.get(DATABASE + `customer/index/bidCompanyInfo?id=${this.id}&token=${this.token}`)
      .then(res => {
        if (res.code) {
          this.detailsList = res.data;
        } else {
          this.http.presentToast(res.msg);
        }
      }).catch(() => {
        this.http.presentToast('服务器错误,请联系管理员');
      })
  }

  ionViewDidLoad() {
  }

}
