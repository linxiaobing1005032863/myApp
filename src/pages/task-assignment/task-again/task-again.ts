import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpService } from '../../../providers/Http.service';
import { TASK } from '../../../config/config';
// import { NativeService } from '../../../providers/NativeService';

@IonicPage()
@Component({
  selector: 'page-task-again',
  templateUrl: 'task-again.html',
})
export class TaskAgainPage {
  paramObj: any = {};
  userInfo: Array<string>;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpService,
  ) {
    this.paramObj.id = navParams.get('id');
  }


  ionViewDidLoad() {
    //获取执行人员
    this.http.get(TASK + 'tasknode/v1/allUsers')
      .then(res => {
        this.userInfo = res.data;
      })
  }

  submit() {
    this.paramObj.startTime = this.paramObj.startTime.replace(/\T/g, " ").replace(/\Z/g, "");
    this.paramObj.endTime = this.paramObj.endTime.replace(/\T/g, " ").replace(/\Z/g, "");
    this.paramObj.split = this.paramObj.split ? 'true' : 'false';
    this.http.put(TASK + 'tasknode/v1/phone/initiateAgain', this.paramObj)
      .then(res => {
        if (res.code == 0) this.navCtrl.push('TaskAssignmentPage');
        if (res.msg) { this.http.presentToast(res.msg); }
      }).catch(res => {
        this.http.presentToast(res.msg);
      });
  }
}
