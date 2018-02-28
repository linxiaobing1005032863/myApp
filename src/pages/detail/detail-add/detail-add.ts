import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpService } from '../../../providers/Http.service';
import { WAITMANAGE } from '../../../config/config';
/**
 * Generated class for the DetailAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-add',
  templateUrl: 'detail-add.html',
})
export class DetailAddPage {
  isStatus:boolean=false;
  detailAddData:any={
    content:'',
    status:"待审核",
  startTime:'',
  endTime:"",
  startDate:'',
  permissions :"ADUIT",
  eventId:'',
  functionEnglishName:"rilidaiban",
  functionChineseName:"日历待办",
  projectEnglishName:"rilidaiban",
  projectChineseName: "日历待办",
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpService) {
  }
  ionViewDidLoad() {
  }
  detailAdd () {
    if(this.isStatus==false){
      this.detailAddData.eStatus="MORMAL";
    }else{
      this.detailAddData.eStatus="FREEZE";
    }
    this.detailAddData.name=localStorage.getItem('userName');
    this.detailAddData.eventId=parseInt('123')
     this.detailAddData.startDate=this.detailAddData.startTime.split("T")[0];
     this.detailAddData.startTime=this.detailAddData.startTime.replace("Z",'').split('T').join(' ')
     this.detailAddData.endTime=this.detailAddData.endTime.replace("Z",'').split('T').join(' ')

    this.http.post(WAITMANAGE + 'event/v1/saveEvTo', this.detailAddData)
      .then(res => {
        if(res.code==0){
          this.navCtrl.push('DetailPage')
        }else{
          this.http.presentToast(res.msg);
        }
      })
  }
}
