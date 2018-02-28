import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpService } from '../../../providers/Http.service';
import { DATABASE } from '../../../config/config';
import { PhotoViewer } from '@ionic-native/photo-viewer';

@IonicPage()
@Component({
  selector: 'page-owner-details',
  templateUrl: 'owner-details.html',
})
export class OwnerDetailsPage {
  id: string;
  token: string;
  detailsList: any = {};
  prefix: any = 'https://wl.bjike.com';
  // prefix: any = 'http://192.168.0.93:8080';
  showImg: any = [];
  isImg: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpService,
    public photoViewer: PhotoViewer, ) {
    this.id = this.navParams.get('id');
    this.token = this.navParams.get('token');

  }

  ionViewDidLoad() {
    this.http.get(DATABASE + `customer/index/ownerInfo?id=${this.id}&token=${this.token}`)
      .then(res => {
        if (res.code) {
          this.detailsList = res.data;
          if (this.detailsList.identity_prove == '有') {
            this.detailsList.prove_url = JSON.parse(res.data.prove_url);
            for (let i = 0, len = this.detailsList.prove_url.length; i < len; i++) {
              var url = this.detailsList.prove_url[i];
              var a = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
              var b;
              if (a != 'png' && a != 'jpg') {
                b = { url: url, isImg: false }
              } else {
                b = { url: url, isImg: true }
              }
              this.showImg.push(b);
            }
          }
        } else {
          this.http.presentToast(res.msg);
        }
      }).catch((err) => {
        this.http.presentToast(err);
      })
  }
  showBig(url: string) {
    this.photoViewer.show(url, '我的图片展示', { share: false });
  }
}
