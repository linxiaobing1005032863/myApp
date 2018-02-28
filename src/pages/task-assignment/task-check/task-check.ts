import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { HttpService } from '../../../providers/Http.service';
import { TASK } from '../../../config/config';
import { NativeService } from '../../../providers/NativeService';

@IonicPage()
@Component({
  selector: 'page-task-check',
  templateUrl: 'task-check.html',
})
export class TaskCheckPage {
  radio: boolean = true;
  paramObj: any = { auditStatus: 'AGREE' };
  page: number;
  text: string = '点击说话，提交您的审核语音';//提示字体
  isAgree1: boolean;//第一次确认
  isAgree2: boolean;//第二次确认
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController,
    public http: HttpService,
    public navHttp: NativeService
  ) {
    this.paramObj.id = navParams.get('id');
    this.page = navParams.get('page');
    console.log(this.paramObj.id)
  }

  ionViewDidLoad() {

  }
  confirm(): void {
    this.paramObj.auditStatus = this.paramObj.auditStatus ? 'AGREE' : 'REJECT';
    this.put();
  }
  dismiss() {
    this.viewCtrl.dismiss({ a: 'abc' });
  }
  //开始语音转换
  startListening() {
    this.navHttp.getPermissions();
    this.navHttp.startListening().subscribe(matches => {
      let tip = matches.join('');
      this.page++;
      if (this.page == 3) {
        if (tip.trim() == '确认。' || tip.trim() == '同意。' || tip.trim() == '通过。') {
          this.isAgree2 = true;
          if (this.isAgree1 == this.isAgree2) {
            this.paramObj.auditStatus = 'AGREE';
            this.put();
          } else {
            this.alertTip('两次语音不一致，请重新审核')
          }
        } else if (tip.trim() == '不确认。' || tip.trim() == '不同意。' || tip.trim() == '不通过。') {
          this.isAgree2 = false;
          if (this.isAgree1 == this.isAgree2) {
            this.paramObj.auditStatus = 'REJECT';
            this.put();
          } else {
            this.alertTip('两次语音不一致，请重新审核')
          }
        } else {
          this.timeout();
        }
      } else if (this.page == 2) {
        if (tip.trim() == '确认。' || tip.trim() == '同意。' || tip.trim() == '通过。') {
          this.isAgree1 = true;
          this.text = '您的审核是' + tip + ',  请再次输入语音再次确认';
        } else if (tip.trim() == '不确认。' || tip.trim() == '不同意。' || tip.trim() == '不通过。') {
          this.isAgree1 = false;
          this.text = '您的审核是' + tip + ',  请再次输入语音再次确认';
        } else {
          this.timeout();
        }
      }
    })
  }
  put() {
    this.http.put(TASK + 'tasknode/v1/pass', this.paramObj)
      .then(res => {
        let msg: string;
        if (res.code == 0) {
          msg = '此次审核成功!';
        } else {
          msg = `审核失败：${res.msg}`;
        }
        let confirm = this.alertCtrl.create({
          title: '消息提示',
          message: msg,
          buttons: [
            {
              text: '确认',
              handler: () => {
                if (!res.code) {
                  this.navCtrl.push('DoingDetailPage', { id: this.paramObj.id, tab: true });
                }
              }
            }
          ]
        });
        confirm.present();
      }).catch(res => {
        this.http.presentToast(res.msg);
      });
  }
  timeout() {
    let confirm = this.alertCtrl.create({
      title: '消息提示',
      message: '您的语音有误，请重新审核',
      buttons: [
        {
          text: '确认',
          handler: () => {
            setTimeout(() => this.navCtrl.push('DoingDetailPage', { id: this.paramObj.id, tab: true }), 2000)
          }
        }
      ]
    });
    confirm.present();
  }
  alertTip(msg) {
    let confirm = this.alertCtrl.create({
      title: '消息提示',
      message: msg,
      buttons: [
        {
          text: '确认',
          handler: () => {
            this.navCtrl.push('DoingDetailPage', { id: this.paramObj.id, tab: true });
          }
        }
      ]
    });
    confirm.present();
  }
}
