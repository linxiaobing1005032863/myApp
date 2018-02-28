import { Component, ViewChild, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController, LoadingController } from 'ionic-angular';
import { HttpService } from '../../../providers/Http.service';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { TASK } from '../../../config/config';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';//获取图片
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
// import { Title } from '@angular/platform-browser/src/browser/title';

@IonicPage()
@Component({
  selector: 'page-task-completion',
  templateUrl: 'task-completion.html',
})

export class TaskCompletionPage {
  @Input() inputArray: [{}];
  id: string;
  uuid: any;//获取uuid
  paramObj: any = {};

  // startTime: string = '2017-12-8 10:10:10';
  // endTime: string = '2017-12-12 10:10:10';
  @ViewChild('select') select;
  @ViewChild('select2') select2;
  a1: boolean = false;
  a2: boolean = false;

  Iamges: any = [];
  options: CameraOptions = {
    quality: 50,
    destinationType: this.camera.DestinationType.NATIVE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
  }
  myForm: FormGroup;
  formErrors = {
    questions: [
      {
        question: ''
      }
    ]
  }

  constructor(public navCtrl: NavController,
    private transfer: FileTransfer,
    private imagePicker: ImagePicker,
    private camera: Camera,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public http: HttpService,
    public photoViewer: PhotoViewer,
    public loadingCtrl: LoadingController,
    public fb: FormBuilder) {

    this.paramObj.id = navParams.get('id');
  }

  ionViewDidLoad() {
  }


  ngOnInit() {
    // build the data model for our form
    this.buildForm();
  }

    /**
   * build the initial form
   */
  buildForm() {
    // build our form
    this.myForm = this.fb.group({
      questions: this.fb.array([
        this.createItem()
      ])
    });
  }

  createItem() {
    return this.fb.group({
      question: ['']
    });
  }
  //  add question
  addItem() {
    let questions = <FormArray>this.myForm.get('questions');
    questions.push(this.createItem());
  }

  addImage() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '选择照片形式',
      buttons: [
        {
          text: '拍摄',
          handler: () => {
            this.camera.getPicture(this.options).then((imageData) => {
              let b: any = { id: this.Iamges.length, url: '' };
              // b.url = 'data:image/png;base64,' + imageData;
              b.url = imageData;
              this.Iamges.push(b);
            });
          }
        }, {
          text: '从手机相册选择',
          handler: () => {
            var opt = { maximumImagesCount: 9, outputType: 0, quality: 50 };
            this.imagePicker.getPictures(opt).then((results) => {
              for (var i = 0; i < results.length; i++) {
                let b: any = { id: this.Iamges.length, url: '' };
                b.url = results[i];
                this.Iamges.push(b);
              }
            });
          }
        }, {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    })
    actionSheet.present();

  }

  showBig(url: string) {
    this.photoViewer.show(url, '我的图片展示', { share: false });
  }


  sendtoWho() {
    this.select.open();
  }
  sendtoCarbons() {
    this.select2.open();
  }

  submit(): void {
    this.paramObj.startExecute = this.paramObj.startExecute.replace(/\T/g, " ").replace(/\Z/g, "");
    this.paramObj.endExecute = this.paramObj.endExecute.replace(/\T/g, " ").replace(/\Z/g, "");
    this.paramObj.question = this.paramObj.question?'true':'false';
    this.http.put(TASK + 'tasknode/v1/phone/write', this.paramObj)
      .then(res => {
        if (res.msg) {
          this.http.presentToast(res.msg);
        };
        let loading = this.loadingCtrl.create({
          content: '正在上传...',
        });
        loading.present();

        let msg: string;
        if (res.code == 0) {
          this.a2 = true;
          if (this.a1) {
            msg = '此次填写成功!';
          } else {
            msg = '图片上传失败!';
          }
        } else {
          msg = `编辑失败：${res.msg}`;
        }
        let confirm = this.alertCtrl.create({
          title: '消息提示',
          message: msg,
          buttons: [
            {
              text: '确认',
              handler: () => {
                if (!res.code || this.a1) {
                    loading.dismiss();
                    this.navCtrl.push('TaskAssignmentPage', { tab: true });
                }
              }
            }
          ]
        });
        if (this.a1 && this.a2) {
          confirm.present();
        }
        if (res.code == 0) this.navCtrl.push('TaskAssignmentPage', { tab: true });
      }).catch(res => {
        this.http.presentToast(res.msg);
      });
    if (this.Iamges.length == 0) {
      this.a1 = true;
    } else {
      const fileTransfer: FileTransferObject = this.transfer.create();
      for (let i = 0; i < this.Iamges.length; i++) {
        let options = {
          fileKey: 'files',
          fileName: 'name' + i + '.jpg',
          headers: { 'userToken': localStorage.getItem('token') }
        }
        fileTransfer.upload(this.Iamges[i].url, `tasknode/v1/uploadFile/${this.uuid}`, options)
          .then((data) => {
            if (i == this.Iamges.length - 1) {
              this.a1 = true;
            }
          }, (err) => {

          }).catch(res => {
            this.http.presentToast(res.msg);
          });
      }
    }
  }
}