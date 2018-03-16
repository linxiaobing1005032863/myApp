import { Component,ViewChild ,ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,Content } from 'ionic-angular';
import {DEMAND} from '../../config/config';
import {HttpService} from '../../providers/Http.service'
import { Loading } from 'ionic-angular/components/loading/loading';

/**
 * Generated class for the BidPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bid',
  templateUrl: 'bid.html',
})
export class BidPage {
  demand: string = this.navParams.get('demand');;//默认进入资料库的项目
  checkList:any={};
  companyList:Array<{}>=[];//企业需求数组
  ownerList:Array<{}>=[]; //业主信息
  checkList1:any={};
  checkList2:any={};
  hideBtn:boolean=true;
  @ViewChild(Content) content: Content;
  @ViewChild('abc') list: ElementRef;

  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl:LoadingController,public http:HttpService) {
  }
  ionViewWillEnter(){
  if(!this.demand){
      this.demand='company'
    }
    this.setHttp(this.demand);
  }

  ionViewDidLoad() {
  }
  doRefresh(refresher) {
   this.setHttp(this.demand);

    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }
  //
  sysChanged(demand){
   this.hideBtn=false;

  }
  //发送Http
  setHttp(page:string=this.demand){
    // let loading= this.loadingCtrl.create({
    //   content: "Please wait...",
    // });
   
    // loading.present();
    switch (page) {
      case 'company':  
      if(this.navParams.get('demand')=='company'){
        if(this.navParams.get('company')){
          this.checkList.company = this.navParams.get('company');

        }
        if(this.navParams.get('companyType')){
          this.checkList.companyType=this.navParams.get('companyType');

        }
        if(this.navParams.get('provinces')){
          this.checkList.provinces=this.navParams.get('provinces');

        }
        if(this.navParams.get('city')){
          this.checkList.city=this.navParams.get('city');

        }
        if(this.navParams.get('area')){
          this.checkList.area=this.navParams.get('area');
        }
        if(this.navParams.get('projectType')){
          this.checkList.projectType=this.navParams.get('projectType');
        }
        if(this.navParams.get('startTime')){
          this.checkList.startTime=this.navParams.get('startTime');

        }
        if(this.navParams.get('endTime')){
          this.checkList.endTime=this.navParams.get('endTime');

        }

      }
      this.http.get(DEMAND+'/bidunit/v1/maps',this.checkList)
      .then((res)=>{
        if(res.data){
      
          // loading.dismiss();
          this.companyList=res.data;

        }
      }).catch((res)=>{

      })
      break;
      case 'people':
      if(this.navParams.get('demand')=='people'){
        if(this.navParams.get('ownerName')){
          this.checkList1.ownerName=this.navParams.get('ownerName');

        }
        if(this.navParams.get('provinces')){
          this.checkList1.provinces=this.navParams.get('provinces');

        }
        if(this.navParams.get('city')){
          this.checkList1.city=this.navParams.get('city');

        }
        if(this.navParams.get('area')){
          this.checkList1.area=this.navParams.get('area');

        }
        if(this.navParams.get('owneraddress')){
          this.checkList1.owneraddress=this.navParams.get('owneraddress');

        }
        if(this.navParams.get('demandType')){
          this.checkList1.demandType=this.navParams.get('demandType');
        }
        if(this.navParams.get('startTime')){
          this.checkList1.startTime=this.navParams.get('startTime');

        }
        if(this.navParams.get('endTime')){
          this.checkList1.endTime=this.navParams.get('endTime');

        }
       

      }
      this.http.get(DEMAND+'owner/v1/maps',this.checkList1)
      .then((res)=>{
        if(res.data){

          this.ownerList=res.data;
      
        }

      })
      break;
     

    }
  


  }
  gotofiltrate(){
    switch(this.demand){
      case 'company':
      this.navCtrl.push('AddbidPage',{page:'company'});
      break;
      case 'people':
      this.navCtrl.push('AddbidPage',{page:'people'});
      break;
      case '':
      this.navCtrl.push('AddbidPage',{page:'station'});
      break;
    }
  }

  companyDatile(item){
    console.log(item)
   this.navCtrl.push('CompanyDetilePage',{page:'company',id:item.id})
  }
  peopleDetile(item){
    this.navCtrl.push('CompanyDetilePage',{page:'people',id:item.id})
  }

}
