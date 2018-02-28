import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { HttpService } from '../../../providers/Http.service';
import { DEMAND } from '../../../config/config';

@IonicPage()
@Component({
  selector: 'page-demandDetail',
  templateUrl: 'demandDetail.html',
})
export class demandDetailPage {
  addProject: any = {
  }; 
  city: string;
  cityAll: any = [];
  id: string = this.navParams.get('id');
  page: string = this.navParams.get('page');
  pageName: string;
  companyList: any = {};
  peopleList: any = {};
  stationList: any = {};
    ;//添加项目
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public http: HttpService,
    public alertCtrl: AlertController,) {
     
  }

  ionViewWillEnter() {
    this.sendDetailHttp(this.page);
  }

  sendDetailHttp(page: string) {
      switch (page) {
        case 'company':
        this.pageName = "企业需求";
          this.http.get(DEMAND + `bidunit/v1/findById/${this.id}`)
          .then((res)=> {
            if(res.data){
              this.companyList = res.data;
              this.cityAll.push(this.companyList.provinces);
              this.cityAll.push(this.companyList.city);
              this.cityAll.push(this.companyList.area);
              this.city = this.cityAll.join("-");
            }           
          }).catch((res) => {
            // console.log(res.data.msg)
            // this.http.presentToast(res.data.msg);
          })
          break;
        case 'people':
        this.pageName = "业主需求";
          this.http.get(DEMAND + `owner/v1/findById/${this.id}`)
            .then((res)=> {
              if(res.data){
              this.peopleList = res.data;
              this.cityAll.push(this.peopleList.provinces);
              this.cityAll.push(this.peopleList.city);
              this.cityAll.push(this.peopleList.area);
              this.city = this.cityAll.join("-");
              }
            }).catch((res) => {
              // console.log(res.data.msg)
            })
          break;
        case 'station':
        this.pageName = "站点需求";
          this.http.get(DEMAND + `site/v1/findById/${this.id}`)
            .then((res)=> {
              if(res.data){
              this.stationList = res.data;
              this.cityAll.push(this.stationList.provinces);
              this.cityAll.push(this.stationList.city);
              this.cityAll.push(this.stationList.area);
              this.city = this.cityAll.join("-");
              }
            }).catch((res) => {
              // console.log(res.data.msg)
            })
          break;
        
      }
  
  // submit() {
  //   this.http.post(DEMAND + 'bidunit/v1/save', this.addProject)
  //   .then(res => {
  //     let msg: string;
  //     if (res.code == 0) {
  //       msg = "添加成功";
  //     } else {
  //       msg = `新增失败:${res.msg}`;
  //     }
  //     let confirm = this.alertCtrl.create({
  //       title: '消息提示',
  //       message: msg,
  //       buttons: [
  //         {
  //           text: '确认',
  //           handler: () => {
  //             if (res.code == 0) {
  //               this.navCtrl.pop();
  //             }
  //           }
  //         }
  //       ]
  //     });
  //     confirm.present();
  //   })
  }
}
