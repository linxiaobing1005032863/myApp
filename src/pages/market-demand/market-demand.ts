import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams ,Content ,LoadingController} from 'ionic-angular';
import { DEMAND } from '../../config/config';
import { HttpService } from '../../providers/Http.service';

@IonicPage()
@Component({
  selector: 'page-market-demand',
  templateUrl: 'market-demand.html',
})
export class MarketDemandPage {
  demand: string = this.navParams.get('demand');;//默认进入资料库的项目
  companyList:Array<{}> = [];//企业需求数组
  peopleList:Array<{}> = [];//业主需求数组
  stationList:Array<{}> = [];//站点需求数组
  companyListMore:Array<{}> = [];//企业需求数组
  peopleListMore:Array<{}> = [];//业主需求数组
  stationListMore:Array<{}> = [];//站点需求数组
  pageNumCheck: number = 1;
  pageNumCheck2: number = 1;
  pageNumCheck3: number = 1;
  hideBtn: boolean = true;
  checkList: any = {};
  checkList2: any = {};
  checkList3: any = {};
  @ViewChild(Content) content: Content;
  @ViewChild('abc') list: ElementRef;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpService,public loadingCtrl: LoadingController) {
    
  }

  ionViewWillEnter() {
    if(!this.demand){
      this.demand = "company";
    }
    this.sendHttp(this.demand);
    // this.sendHttp("people");
    // this.sendHttp("station");
    }
  
    //发送http
    sendHttp(page: string = this.demand) {
      let loading = this.loadingCtrl.create({
        content: '加载中...'
      });
    
      loading.present();
      switch (page) {
        case 'company':     
        if(this.navParams.get('demand') == 'company'){
          if(this.navParams.get('company')){
            this.checkList.company = this.navParams.get('company');
          }
          if(this.navParams.get('provinces')){
            this.checkList.provinces = this.navParams.get('provinces');
          }
          if(this.navParams.get('city')){
            this.checkList.city = this.navParams.get('city');
          }
          if(this.navParams.get('area')){
            this.checkList.area = this.navParams.get('area');
          }
          if(this.navParams.get('projectType')){
            this.checkList.projectType = this.navParams.get('projectType');
          }
          if(this.navParams.get('companyType')){
            this.checkList.companyType = this.navParams.get('companyType');
          }
          if(this.navParams.get('startTime')){
            this.checkList.startTime = this.navParams.get('startTime');
          }
          if(this.navParams.get('endTime')){
            this.checkList.endTime = this.navParams.get('endTime');
          }
        }     
          this.http.get(DEMAND + `bidunit/v1/maps`,this.checkList)
          .then((res)=> {
            if(res.data){
              loading.dismiss();
              this.companyList = res.data;
            }           
          }).catch((res) => {
            // console.log(res.data.msg)
            // this.http.presentToast(res.data.msg);
          })
          break;
        case 'people':
        if(this.navParams.get('demand')=='people'){
          if(this.navParams.get('ownerName')){
            this.checkList2.ownerName = this.navParams.get('ownerName');
          }
          if(this.navParams.get('owneraddress')){
            this.checkList2.owneraddress = this.navParams.get('owneraddress');
          }
          if(this.navParams.get('provinces')){
            this.checkList2.provinces = this.navParams.get('provinces');
          }
          if(this.navParams.get('city')){
            this.checkList2.city = this.navParams.get('city');
          }
          if(this.navParams.get('area')){
            this.checkList2.area = this.navParams.get('area');
          }
          if(this.navParams.get('demandType')){
            this.checkList2.demandType = this.navParams.get('demandType');
          }
          
          if(this.navParams.get('startTime')){
            this.checkList2.startTime = this.navParams.get('startTime');
          }
          if(this.navParams.get('endTime')){
            this.checkList2.endTime = this.navParams.get('endTime');
          }
        }
          this.http.get(DEMAND + `owner/v1/maps`,this.checkList2)
            .then((res)=> {
              if(res.data){
                loading.dismiss();
              this.peopleList = res.data;
              }
            }).catch((res) => {
              // console.log(res.data.msg)
            })
          break;
        case 'station':
        if(this.navParams.get('demand')=='station'){
          if(this.navParams.get('siteName')){
            this.checkList3.siteName = this.navParams.get('siteName');
          }
          if(this.navParams.get('siteType')){
            this.checkList3.siteType = this.navParams.get('siteType');
          }
          if(this.navParams.get('provinces')){
            this.checkList3.provinces = this.navParams.get('provinces');
          }
          if(this.navParams.get('city')){
            this.checkList3.city = this.navParams.get('city');
          }
          if(this.navParams.get('area')){
            this.checkList3.area = this.navParams.get('area');
          }
          if(this.navParams.get('demandType')){
            this.checkList3.demandType = this.navParams.get('demandType');
          }
          
          if(this.navParams.get('startTime')){
            this.checkList3.startTime = this.navParams.get('startTime');
          }
          if(this.navParams.get('endTime')){
            this.checkList3.endTime = this.navParams.get('endTime');
          } 
        }
          this.http.get(DEMAND + `site/v1/maps`,this.checkList3)
            .then((res)=> {
              if(res.data){
                loading.dismiss();
              this.stationList = res.data;
              }
            }).catch((res) => {
              // console.log(res.data.msg)
            })
          break;
        
      }
    }
  

  sysChanged(demand) {//选择类型
    this.hideBtn = true;
    // this.demand = demand;    
  }

  doRefresh(refresher) {//下拉刷新
    this.sendHttp(this.demand)

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 1000);
  }
  doInfinite(infiniteScroll) {//上拉加载
      switch (this.demand) {
        case 'company':
        this.pageNumCheck++;
        this.checkList.page = this.pageNumCheck;
          this.http.get(DEMAND + `bidunit/v1/maps`,this.checkList)
          .then((res)=> {
            if(res.data){
              infiniteScroll.complete();
              this.companyListMore = res.data;
              for(let i = 0,len = this.companyListMore.length;i<len;i++){
                this.companyList.push(this.companyListMore[i])
              }
              
            }else{
              this.hideBtn = false;
              this.content.scrollTo(0,this.list.nativeElement.offsetHeight - this.content.scrollHeight + 53,0)
            }           
          }).catch((res) => {
            
          })
          
          break;
        case 'people':
        this.pageNumCheck2++;
        this.checkList2.page = this.pageNumCheck2;
          this.http.get(DEMAND + `owner/v1/maps`,this.checkList2)
            .then((res)=> {
              if(res.data){
                infiniteScroll.complete();
                this.peopleListMore = res.data;
                for(let i = 0,len = this.peopleListMore.length;i<len;i++){
                  this.peopleList.push(this.peopleListMore[i])
                }
              }else{
                this.hideBtn = false;
                this.content.scrollTo(0,this.list.nativeElement.offsetHeight - this.content.scrollHeight + 53,0)
              }
            }).catch((res) => {
              // console.log(res.data.msg)
            })
            
          break;
        case 'station':
        this.pageNumCheck3++;
        this.checkList3.page = this.pageNumCheck3;
          this.http.get(DEMAND + `site/v1/maps`,this.checkList3)
            .then((res)=> {
              if(res.data){
                infiniteScroll.complete();
                this.stationListMore = res.data;
                for(let i = 0,len = this.stationListMore.length;i<len;i++){
                  this.stationList.push(this.stationListMore[i])
                }
              }else{
                this.hideBtn = false;
                this.content.scrollTo(0,this.list.nativeElement.offsetHeight - this.content.scrollHeight + 53,0)
              }
            }).catch((res) => {
              // console.log(res.data.msg)
            })
            
          break;
        
      }
      
  }

  gotofiltrate() {
    switch(this.demand){
      case 'company':
        this.navCtrl.push('FiltratePage',{page:'company'});
        break;
        case 'people':
        this.navCtrl.push('FiltratePage',{page:'people'});
        break;
        case 'station':
        this.navCtrl.push('FiltratePage',{page:'station'});
        break;
    }
  }
  compangAdd() {
    this.navCtrl.push('CompanyAddPage');
  }
  peopleAdd() {
    this.navCtrl.push('peopleAddPage');
  }
  stationAdd() {
    this.navCtrl.push('stationAddPage');
  }
  companyDetail(item) {    
    this.navCtrl.push('demandDetailPage',{page:'company',id:item.id});
  }
  peopleDetail(item) {
    this.navCtrl.push('demandDetailPage',{page:'people',id:item.id});
  }
  stationDetail(item) {
    this.navCtrl.push('demandDetailPage',{page:'station',id:item.id});
  }
}
