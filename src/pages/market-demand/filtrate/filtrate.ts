import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpService } from '../../../providers/Http.service';
import { DEMAND } from '../../../config/config';

@IonicPage()
@Component({
  selector: 'page-filtrate',
  templateUrl: 'filtrate.html',
})
export class FiltratePage {
  city: string;
  pageName: string;
  demand: string;
  page: string = this.navParams.get('page');
  company: any = {};
  people: any = {};
  station: any = {};
  provinces: any = [];
  cities: any = [];
  areas: any = [];
  areaList: any = [];
  aa:any = [];
  @ViewChild('areasSelect') areasSelect;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpService,) {
  }

  ionViewWillEnter() {
    
    switch (this.page) {
      case 'company':
      this.pageName = "企业需求";
      this.http.get(DEMAND + `bidunit/v1/provinces`)
        .then((res)=> {
          
          if(res.data){
            this.provinces = res.data;            
          }           
        }).catch((res) => {
          // console.log(res.data.msg)
          // this.http.presentToast(res.data.msg);
        })
        
        
      break;
      case 'people':
      this.pageName = "业主需求";
      this.http.get(DEMAND + `owner/v1/provinces`)
      .then((res)=> {
        
        if(res.data){
          this.provinces = res.data;
        }           
      }).catch((res) => {
        // console.log(res.data.msg)
        // this.http.presentToast(res.data.msg);
      })
      break;
      case 'station':
      this.pageName = "站点需求";
      this.http.get(DEMAND + `site/v1/provinces`)
      .then((res)=> {
        
        if(res.data){
          this.provinces = res.data;
        }           
      }).catch((res) => {
        // console.log(res.data.msg)
        // this.http.presentToast(res.data.msg);
      })
      break;
    }

  }
  
  showAreasSelect() {//触发城市列表
    this.areasSelect.open();
    // let bbb = document.getElementsByClassName('picker-opts');
    // for(let i = 0;i<bbb.length;i++){
    //   // bbb[i].style[maxWidth] = "151px";
    //   // bbb[i].removeAttribute('style');
    //   // bbb[i].style.maxWidth = "151px";
    // }
    // console.log(bbb)
    
        
      
      
  }
  getCities() {
    switch (this.page) {
      case 'company':
        this.http.get(DEMAND + `bidunit/v1/city/${encodeURI(this.company.provinces)}`)
        .then((res)=> {          
          if(res.data){
            this.cities = res.data;            
          }else{
            this.cities = [];
          }           
        })
        
        break;
      case 'people':
        this.http.get(DEMAND + `owner/v1/city/${encodeURI(this.people.provinces)}`)
        .then((res)=> {          
          if(res.data){
            this.cities = res.data;            
          }else{
            this.cities = [];
          }           
        })        
        break;
      case 'station':
      console.log(this.station)
        this.http.get(DEMAND + `/owner/v1/city/${encodeURI(this.station.provinces)}`)
        .then((res)=> {    
          console.log(res)      
          if(res.data){
            this.cities = res.data;
                       
          }else{
            this.cities = [];
          }    
          console.log(this.cities)        
        })        
        break;
  }
}
getAreas() {
  switch (this.page) {
    case 'company':
      this.http.get(DEMAND + `bidunit/v1/area/${encodeURI(this.company.provinces)}/${encodeURI(this.company.city)}`)
      .then((res)=> {          
        if(res.data){
          this.areas = res.data;            
        }else{
          this.areas = [];
        }           
      })
      
      break;
    case 'people':
      this.http.get(DEMAND + `owner/v1/area/${encodeURI(this.people.provinces)}/${encodeURI(this.people.city)}`)
      .then((res)=> {          
        if(res.data){
          this.areas = res.data;            
        }else{
          this.areas = [];
        }           
      })        
      break;
    case 'station':
    console.log(this.station)
      this.http.get(DEMAND + `site/v1/area/${encodeURI(this.station.provinces)}/${encodeURI(this.station.city)}`)
      .then((res)=> {          
        if(res.data){
          this.areas = res.data;            
        }else{
          this.areas = [];
        }            
      })        
      break;
    }
  }
  done(data) {//选择确定城市列表
      this.city = data.value;
  }
  closeSelect() {//关闭城市列表
      alert('你关闭了该功能')
  }
  submit() :void{
    switch (this.page) {
      case 'company':            
      this.company.demand = "company";
      console.log(this.company)
      this.navCtrl.push('MarketDemandPage',this.company);
        // this.http.get(DEMAND + `bidunit/v1/findById/${this.id}`)
        // .then((res)=> {
        //   if(res.data){
        //     this.companyList = res.data;
        //   }           
        // }).catch((res) => {
        //   // console.log(res.data.msg)
        //   // this.http.presentToast(res.data.msg);
        // })
        break;
      case 'people':
      this.people.demand = "people"
      console.log(this.people)
      this.navCtrl.push('MarketDemandPage',this.people);
        // this.http.get(DEMAND + `owner/v1/findById/${this.id}`)
        //   .then((res)=> {
        //     if(res.data){
        //     this.peopleList = res.data;
        //     }
        //   }).catch((res) => {
        //     // console.log(res.data.msg)
        //   })
        break;
      case 'station':
      this.station.demand = "station"
      console.log(this.station)
      this.navCtrl.push('MarketDemandPage',this.station);
        // this.http.get(DEMAND + `site/v1/findById/${this.id}`)
        //   .then((res)=> {
        //     if(res.data){
        //     this.stationList = res.data;
        //     }
        //   }).catch((res) => {
        //     // console.log(res.data.msg)
        //   })
        break;
      
    }

  }
}
