import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpService } from '../../../providers/Http.service';
import { DATABASE } from '../../../config/config';
import { PhotoViewer } from '@ionic-native/photo-viewer';


@IonicPage()
@Component({
  selector: 'page-project-details',
  templateUrl: 'project-details.html',
})
export class ProjectDetailsPage {
  id: string;
  token: string;
  detailsList: any = {};
  prefix: any = 'https://wl.bjike.com';
  // prefix: any = 'http://192.168.0.93:8080';

  puploadType: string;//甲方和中标单位的文件类型
  suploadType: string;//选址政策的文件类型
  cuploadType: string;//与中标单位的文件类型

  isImagep: boolean = false;//甲方和中标单位显示图片还是文件
  isImages: boolean = false;//与中标单位显示图片还是文件
  isImagec: boolean = false;//选址政策显示图片还是文件
  
  pUrl: string;//甲方和中标单位拿到的url
  cUrl: string;//与中标单位拿到的url
  sUrl: string;//选址政策拿到的url
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpService,
    public photoViewer: PhotoViewer,
  ) {
    this.id = navParams.get('id');
    this.token = navParams.get('token');
  }
  showBig(url: string) {
    this.photoViewer.show(url, '我的图片展示', { share: false });
  }
  ionViewDidLoad() {
    this.http.get(DATABASE + `customer/index/projectInfo?id=${this.id}&token=${this.token}`)
      .then(res => {
        if (res.code) {
          this.detailsList = res.data;

          if (this.detailsList.party_a_bid_contract_url) {
            this.pUrl = this.detailsList.party_a_bid_contract_url;
            this.puploadType = this.pUrl.substring(this.pUrl.lastIndexOf('.') + 1).toLowerCase();
            if (this.puploadType != 'png' && this.puploadType != 'jpg') {
              this.isImagep = false;
            } else {
              this.isImagep = true;
            }
          }

          if (this.detailsList.bid_contract_url) {
            this.cUrl = this.detailsList.bid_contract_url;
            this.cuploadType = this.cUrl.substring(this.cUrl.lastIndexOf('.') + 1).toLowerCase();
            if (this.cuploadType != 'png' && this.cuploadType != 'jpg') {
              this.isImagec = false;
            } else {
              this.isImagec = true;
            }
          }

          if (this.detailsList.site_selection_url) {
            this.sUrl = this.detailsList.site_selection_url;
            this.suploadType = this.sUrl.substring(this.sUrl.lastIndexOf('.') + 1).toLowerCase();
            if (this.suploadType != 'png' && this.suploadType != 'jpg') {
              this.isImages = false;
            } else {
              this.isImages = true;
            }
          }
        } else {
          this.http.presentToast(res.msg);
        }
      }).catch(() => {
        this.http.presentToast('服务器错误,请联系管理员');
      })
  }

}
