import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpService } from '../../../providers/Http.service';
import { DEMAND } from '../../../config/config'

/**
 * Generated class for the CompanyDetilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-detile',
  templateUrl: 'company-detile.html',
})
export class CompanyDetilePage {
  page: string = this.navParams.get('page');
  id: string = this.navParams.get('id');
  companyList: any = {};
  peoplelist:any={};
  stationList:any={};
  pangName:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpService) {
  }

  ionViewDidLoad() {
  }
  ionViewWillEnter() {
    switch (this.page) {
      case 'company':
      this.pangName='企业需求';
        this.http.get(DEMAND + `/bidunit/v1/findById/${this.id}`)
          .then((res) => {
            if (res.data) {
              this.companyList = res.data;
              console.log(this.companyList.area)
            }
          })
        break;
        case 'people':
        this.pangName='业主需求';
        this.http.get(DEMAND+`/owner/v1/findById/${this.id}`)
        .then((res)=>{
          if(res.data){
             this.peoplelist=res.data;
             console.log(this.peoplelist)
          }
        })
        break;
        case 'station':
        this.pangName='站点需求';
        this.http.get(DEMAND+`/site/v1/findById/${this.id}`)
        .then((res)=>{
          if(res.data){
            this.stationList=res.data;
  
          }
        })
        break;
    }
  }

}
