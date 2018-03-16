import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpService} from '../../../../providers/Http.service';
import { DEMAND } from "../../../../config/config"

/**
 * Generated class for the AddbidPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addbid',
  templateUrl: 'addbid.html',
})
export class AddbidPage {
  pageName:string;
  page:string=this.navParams.get('page');
  company:any={};
  people:any={};
  station:any={};
  provincesList:Array<{}>=[];
  ownerList:Array<{}>=[];
  siteList:Array<{}>=[];
  cityList:Array<{}>=[];
  cityList1:Array<{}>=[];
  cityList2:Array<{}>=[];
  areaList:Array<{}>=[];
  areaList1:Array<{}>=[];
  areaList2:Array<{}>=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http:HttpService) {
  }

  ionViewWillEnter() {
    switch(this.page){
      case 'company':
      this.pageName="企业需求";
      this.http.get(DEMAND+'/bidunit/v1/provinces')
      .then((res)=>{
        if(res.data){
           this.provincesList=res.data;
        
        }
      })

      
      break;
      case 'people':
      this.pageName=' 业主需求';
      this.http.get(DEMAND+'/owner/v1/maps')
      .then((res)=>{
        if(res.data){
          this.ownerList=res.data;
        }
      })
      break;
      case 'station':
      this.pageName="站点需求";
      this.http.get(DEMAND+'/site/v1/maps')
      .then((res)=>{
        if(res.data){
          this.siteList=res.data;
        }
      })
      break;
    }
    
  }
  getCity(){
    switch(this.page){
      case 'company':
      this.http.get(DEMAND+`/bidunit/v1/city/${encodeURI(this.company.provinces)}`)
      .then((res)=>{
        if(res.data){
          this.cityList=res.data;
        }
      })
      break;
      case 'people':
      this.http.get(DEMAND+`/bidunit/v1/area/${encodeURI(this.people.provinces)}`)
      .then((res)=>{
        if(res.data){
          this.cityList1=res.data;

        }
      })
      break;
      case 'station':
      this.http.get(DEMAND+`/site/v1/city/${encodeURI(this.station.provinces)}`)
      .then((res)=>{
        if(res.data){
          this.cityList2=res.data;
        }
       
      
      })
      break;
    }

  }
  getArea(){
    switch(this.page){
      case 'company':
      this.http.get(DEMAND+`/bidunit/v1/area/${encodeURI(this.company.provinces)}/${encodeURI(this.company.city)}`)
      .then((res)=>{
        if(res.data){
          this.areaList=res.data;
        }
      })
      break;
      case 'people':
      this.http.get(DEMAND+`/owner/v1/area/${encodeURI(this.people.provinces)}/${encodeURI(this.company.city)}`)
      .then((res)=>{
        if(res.data){
          this.areaList1=res.data;
        }
      
      })
      break;
      case 'station':
      this.http.get(DEMAND+`/site/v1/area/${encodeURI(this.station.provinces)}/${encodeURI(this.station.provinces)}`)
      .then((res)=>{
        this.areaList2=res.data;
      })

    }
  }
  gotofiltrate(){
    switch(this.page){
      case 'company':
    
      this.company.demand="company";
    
      this.navCtrl.push('BidPage',this.company) ;
      break;
      case 'people':
      this.people.demand="people";
      this.navCtrl.push('BidPage',this.people);
      break;
      case 'station':
      this.station.demand="station";
      this.navCtrl.push('BidPage',this.station);
      break;
    }
 
  }

}
