import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BIDDING } from '../../../config/config';
import { HttpService } from '../../../providers/Http.service';


@IonicPage()
@Component({
  selector: 'page-bid-filtrate',
  templateUrl: 'bid-filtrate.html',
})
export class bidFiltratePage {
  city: string;
  bidFilter:any={};
  areaList: any=[];
  bidType: string;
  
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpService) {
    let demo = this.navParams.get('page')
  }

  ionViewWillEnter() {
    this.http.post(BIDDING+ `api/index/gainAddress`)
    .then((res)=> {
      if(res.code == 200){
        if(res.data){
          this.areaList = res.data;
          console.log(this.areaList)
        }
        
      }           
    }).catch((res) => {
      // console.log(res.data.msg)
      // this.http.presentToast(res.data.msg);
    })
    // console.log('ionViewDidLoad FiltratePage');
    
  }
  submit() {
    if(this.bidType == "招标"){
      this.bidFilter.class=1;
    }
    if(this.bidType == "中标"){
      this.bidFilter.class=2;
    }
    // console.log(this.bidFilter)
    this.navCtrl.push('biddingPage',this.bidFilter);
  }
}
