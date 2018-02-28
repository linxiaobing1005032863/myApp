import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams ,Content,LoadingController } from 'ionic-angular';
import { BIDDING } from '../../config/config';
import { HttpService } from '../../providers/Http.service';

@IonicPage()
@Component({
  selector: 'page-bidding',
  templateUrl: 'bidding.html',
})
export class biddingPage {
  bidType: string ;//默认进入资料库的项目
  address: string;
  url: string;
  BIDDING: string;
  bidFilter: any = {};
  bidList :Array<{title?}>= [];//企业需求数组

  openList:Array<{}> = [{},{},{},{}];//业主需求数组
  bidListMore:Array<{}> = [{},{},{}];//企业需求数组
  openListMore:Array<{}> = [{},{},{},{}];//业主需求数组
  pageNumCheck: number = 1;
  pageNumCheck2: number = 1;
  hideBtn: boolean = true;
  @ViewChild(Content) content: Content;
  @ViewChild('abc') list: ElementRef;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpService,public loadingCtrl: LoadingController) {
    
  }
  ionViewDidLoad() {//第一次加载触发

  }
  ionViewWillEnter() {//每次加载都会触发
    this.BIDDING = BIDDING;
    this.bidFilter.address = this.navParams.get('address');
    this.bidFilter.class = this.navParams.get('class');
    this.bidFilter.startTime = this.navParams.get('startTime');
    this.bidFilter.endTime = this.navParams.get('endTime');
    // if(!this.bidFilter.address){
    //   this.bidFilter.address = "all";
    // }
    if(!this.bidFilter.class){
      this.bidFilter.class = 1;
    }
    this.sendHttp(this.bidFilter);
    }
  
    //发送http
    sendHttp(bidFilter) {
      let loading = this.loadingCtrl.create({
        content: '加载中...'
      });
    
      loading.present();
      switch (bidFilter.class) {
        case 1:
        this.http.get(BIDDING+ `api/index/newSearchTender`,this.bidFilter)
        .then((res)=> {
          if(res.code == 200){
            loading.dismiss();
            this.bidList = res.data.content;
            let biddingImage = document.getElementsByClassName('biddingImage');
            for(let i = 0;i < this.bidList.length;i++){
              this.bidList[i].title = this.bidList[i].title.substring(0,27)+'...';
            }
            
          }           
        }).catch((res) => {
          // console.log(res.data.msg)
          // this.http.presentToast(res.data.msg);
        })
          break;
        case 2:
        this.http.get(BIDDING+ `api/index/newSearchTender`,this.bidFilter)
        .then((res)=> {
          if(res.code == 200){
            loading.dismiss();
            this.openList = res.data.content;           
          }           
        }).catch((res) => {
        })
          break;
        
      }
    }
  

  doRefresh(refresher) {//下拉刷新
    this.sendHttp(this.bidFilter.bidType)

    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }
  doInfinite(infiniteScroll) {//上拉加载
    
      switch (this.bidFilter.class) {
        case 1:
        this.pageNumCheck++;
          this.bidFilter.page = this.pageNumCheck;
          this.http.get(BIDDING+ `api/index/newSearchTender`,this.bidFilter )
          .then((res)=> {
            if(res.data.content.length!=0){
              infiniteScroll.complete();
              this.bidListMore = res.data.content;
              for(let i = 0,len = this.bidListMore.length;i<len;i++){
                this.bidList.push(this.bidListMore[i])
              }
              
            }else{
              this.hideBtn = false;
              this.content.scrollTo(0,this.list.nativeElement.offsetHeight - this.content.scrollHeight + 53,0)
            }           
          }).catch((res) => {
            
          })
          // setTimeout(() => {
          //   infiniteScroll.complete();
          // }, 3000);
          break;
        case 2:
        this.pageNumCheck2++;
        this.bidFilter.page = this.pageNumCheck2;
          this.http.get(BIDDING+ `api/index/newSearchTender`,this.bidFilter)
            .then((res)=> {
              if(res.data.content.length!=0){
                infiniteScroll.complete();
                this.openListMore = res.data.content;
                for(let i = 0,len = this.openListMore.length;i<len;i++){
                  this.openList.push(this.openListMore[i])
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
    this.navCtrl.push('bidFiltratePage');
  }
  bidDetail(item){
    this.navCtrl.push('bidDetailPage',item);
  }
}
