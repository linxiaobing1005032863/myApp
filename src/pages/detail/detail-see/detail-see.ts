import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController  } from 'ionic-angular';
import { HttpService } from '../../../providers/Http.service';
import { WAITMANAGE } from '../../../config/config';

/**
 * Generated class for the DetailSeePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-see',
  templateUrl: 'detail-see.html',
})
export class DetailSeePage {
  times;
  ids:any;
  yesShow:boolean=false;
  sueShow:boolean=false;
  yesterTime:any=[];
  todayTime:any=[];
  sueTime:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpService,public alertCtrl: AlertController) {
    var data=new Date(this.navParams.get("times"))
    var years=data.getFullYear();
    var months=data.getMonth()+1;
    var day=data.getDate()
    this.http.get(WAITMANAGE + 'event/v1/findByPlanType?planTypes=DAY&year='+years+'&month='+months+'&day='+day)
      .then(res => {
        var dateNew=new Date().getTime();
        if(res.code==0){
           for (var i=0;i<res.data[0].eventBOs.length;i++){
              var dateSee=new Date(res.data[0].eventBOs[i].endTime).getTime()
               if (dateNew < dateSee && res.data[0].eventBOs[i].eventStatus == "NOSEENODEAL"){
                 this.todayTime.push(res.data[0].eventBOs[i])
               } else if( dateNew > dateSee && res.data[0].eventBOs[i].eventStatus == "NOSEENODEAL"){
                 this.yesterTime.push(res.data[0].eventBOs[i])
               }else{
                this.sueTime.push(res.data[0].eventBOs[i])
               }
           }
          if(this.yesterTime.length>0){
          this.yesShow=true;
          }
          if(this.sueTime.length>0){
           this.sueShow=true;
          }
        } else {
          this.http.presentToast(res.msg);
        }
      }).catch(() => {
      this.http.presentToast('服务器错误,请联系管理员');
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailSeePage');
  }
  helloWorld (data){
   this.ids=data;
   console.log(this.ids);
  }
  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: '任务确认完成',
      message: '此项目完成，提交数据',
      buttons: [
        {
          text: '取消',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: '确认',
          handler: () => {
            this.http.put(WAITMANAGE + `event/v1/update/${this.ids}`)
              .then(res => {
                if(res.code==0){
                  this.yesterTime=[];
                  this.todayTime=[];
                  this.sueTime=[];
                  var data=new Date(this.navParams.get("times"))
                  var years=data.getFullYear();
                  var months=data.getMonth()+1;
                  var day=data.getDate()
                  this.http.get(WAITMANAGE + 'event/v1/findByPlanType?planTypes=DAY&year='+years+'&month='+months+'&day='+day)
                    .then(res => {
                      var dateNew=new Date().getTime();
                      if(res.code==0){
                        for (var i=0;i<res.data[0].eventBOs.length;i++){
                          var dateSee=new Date(res.data[0].eventBOs[i].endTime).getTime()
                          if (dateNew < dateSee && res.data[0].eventBOs[i].eventStatus == "NOSEENODEAL"){
                            this.todayTime.push(res.data[0].eventBOs[i])
                          } else if( dateNew > dateSee && res.data[0].eventBOs[i].eventStatus == "NOSEENODEAL"){
                            this.yesterTime.push(res.data[0].eventBOs[i])
                          }else{
                            this.sueTime.push(res.data[0].eventBOs[i])
                          }
                        }
                        if(this.yesterTime.length>0){
                          this.yesShow=true;
                        }else{
                          this.yesShow=false;
                        }

                        if(this.sueTime.length>0){
                          this.sueShow=true;
                        }else{
                          this.sueShow=false;
                        }
                      } else {
                        this.http.presentToast(res.msg);
                      }
                    }).catch(() => {
                    this.http.presentToast('服务器错误,请联系管理员');
                  })


                } else {
                  this.http.presentToast(res.msg);
                }
              }).catch(() => {
              this.http.presentToast('服务器错误,请联系管理员');
            })
          }
        }
      ]
    });
    confirm.present();
  }
}
