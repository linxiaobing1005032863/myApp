import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BIDDING } from '../../../config/config';
import { HttpService } from '../../../providers/Http.service';


@IonicPage()
@Component({
  selector: 'page-biddetail',
  templateUrl: 'bid-detail.html',
})
export class bidDetailPage {
  city: string;
  id: string;
  detailList:any={};
  // bidType: string;
  // address: string;
  @ViewChild('areasSelect') areasSelect;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpService) {
    let demo = this.navParams.get('page')
  }
  ionViewDidLoad() {
    this.id = this.navParams.get('id');
    this.showDetail();
    // console.log('ionViewDidLoad FiltratePage');
    
  }
   
  showDetail () {
    this.http.get(BIDDING+ `api/index/tenderInfo`,{id:this.id})
    .then((res)=> {
      if(res.code == 200){
        var bidDetail=document.getElementById("bid-detail")
        bidDetail.innerHTML=res.data.content;
        bidDetail.style.marginTop = "58px";
        bidDetail.style.overflow = "auto";
        //this.detailList = res.data;
        
      }           
    }).catch((res) => {
      // console.log(res.data.msg)
      // this.http.presentToast(res.data.msg);
    })
  }
  
  // showAreasSelect() {//触发城市列表
  //     this.areasSelect.open();
  // }
  // done(data) {//选择确定城市列表
  //     this.city = data.value;
  //     this.bidFilter.address = this.city;
  // }
  // closeSelect() {//关闭城市列表
  //     // alert('你关闭了该功能')
  // }
  // submit() {
  //   console.log(this.bidFilter)
  //   this.navCtrl.push('biddingPage',this.bidFilter);
  // }
}
