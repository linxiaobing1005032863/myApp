import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { HttpService } from '../../../providers/Http.service';
import { DEMAND } from '../../../config/config';

@IonicPage()
@Component({
  selector: 'page-CompanyAdd',
  templateUrl: 'companyAdd.html',
})
export class CompanyAddPage {
  addProject: any = {}; 
  city: string;
    ;//添加项目
    @ViewChild('areasSelect') areasSelect;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public http: HttpService,
    public alertCtrl: AlertController,) {
  }

  ionViewDidLoad() {
  }
  
  showAreasSelect() {//触发城市列表
    this.areasSelect.open();
}
done(data) {//选择确定城市列表
    this.city = data.value;
}
closeSelect() {//关闭城市列表
    alert('你关闭了该功能')
}
  submit() {
    let cityAll = this.city.split("-");
    this.addProject.provinces = cityAll[0];
    this.addProject.city = cityAll[1];
    this.addProject.area = cityAll[2];
    this.http.post(DEMAND + 'bidunit/v1/save', this.addProject)
    .then(res => {
      let msg: string;
      if (res.code == 0) {
        msg = "添加成功";
      } else {
        msg = `新增失败:${res.msg}`;
      }
      let confirm = this.alertCtrl.create({
        title: '消息提示',
        message: msg,
        buttons: [
          {
            text: '确认',
            handler: () => {
              if (res.code == 0) {
                this.navCtrl.pop();
              }
            }
          }
        ]
      });
      confirm.present();
    })
  }
}
