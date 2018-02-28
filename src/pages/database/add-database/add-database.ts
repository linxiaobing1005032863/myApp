import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, LoadingController } from 'ionic-angular';
import { HttpService } from '../../../providers/Http.service';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { DATABASE } from '../../../config/config';
import { FileChooser } from '@ionic-native/file-chooser';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { CityDataProvider } from "../../../providers/city-data/city-data";

@IonicPage()
@Component({
  selector: 'page-add-database',
  templateUrl: 'add-database.html',
})
export class AddDatabasePage {
  type: any = "项目信息表";
  addProject: any = {
    bid_contract: false,
    party_a_bid_contract: false,
    whether_site_selection: false,
  };//添加项目

  addCompany: any = {
    contacts_sex: false,
    whether_cooperation_company: false,
  }//添加企业客户

  addOwner: any = {
    customer_sex: false,
    identity_prove: false,
    current_network_state: false
  }//添加业主客户

  addStation: any = {
    whether_address: false,
    whether_admission: false,
    whether_finished: false,
    whether_open: false,
    whether_verification: false,
    whether_start_verification: false,
    whether_end_verification: false,
    contact_sex: false,
    current_network_state: false,
  }//添加站点

  fileName = '';
  photoP: any;//甲方与中标单位的合同
  photoC: any;//与中标单位的合同
  photoS: any;//是否有选址政策
  provePhoto: any = [];//业主上传的证明图
  prefix: any = 'https://wl.bjike.com';
  // prefix: any = 'http://192.168.0.93:8080';

  uploadType: string;//上传文件的类型
  cityColumns: any[];//三级联动地区
  showp: boolean = false;//是否显示上传项目的附件
  showc: boolean = false;
  shows: boolean = false;
  address: string = '';
  isImageP: boolean = false;//判断上传的是文件还是图片
  isImageC: boolean = false;//判断上传的是文件还是图片
  isImageS: boolean = false;//判断上传的是文件还是图片
  imgOrfile: string;//判断业主上传的是文件还是图片
  showProve: any = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public http: HttpService,
    public alertCtrl: AlertController,
    public photoViewer: PhotoViewer,
    private fileChooser: FileChooser,
    private transfer: FileTransfer,
    public cityDataProvider: CityDataProvider,
    public loadingCtrl: LoadingController
  ) {
    this.cityColumns = this.cityDataProvider.cities;
  }

  ionViewDidLoad() { }

  showBig(url: string) {
    this.photoViewer.show(url, '我的图片展示', { share: false });
  }

  //上传文件
  chooserFile(photo) {
    this.fileChooser.open()
      .then(uri => {
        const fileTransfer: FileTransferObject = this.transfer.create();
        let fileN = uri.substring(uri.lastIndexOf('/') + 1);//获取文件名
        let mimeT = this.getFileMimeType(this.getFileType(uri));//获取文件类型
        let options = {
          fileKey: 'file',
          fileName: fileN,
          mimeType: mimeT,
          chunkedMode: false
        }
        let loading = this.loadingCtrl.create({
          content: '上传进度：0%',
          dismissOnPageChange: false
        });
        loading.present();
        let no: number = 0;
        fileTransfer.onProgress(progressEvent => {
          if (progressEvent.lengthComputable) {
            no = progressEvent.loaded / progressEvent.total * 100;
          }
        });
        let timer = setInterval(() => {
          loading.setContent("上传进度：" + Math.floor(no) + "%");
          if (no >= 99) {
            clearInterval(timer);
          }
        }, 300);

        fileTransfer.upload(uri, DATABASE + 'customer/index/addFile', options)
          .then((res: any) => {
            if (JSON.parse(res.response).code == 200) {
              if (timer) clearInterval(timer);
              loading.dismiss();

              var varData = JSON.parse(res.response).data;
              this.uploadType = varData.substring(varData.lastIndexOf('.') + 1).toLowerCase();
              if (photo == 'photo1') {
                this.showp = true;
                this.photoP = varData;
                if (this.uploadType != 'png' && this.uploadType != 'jpg') {
                  this.isImageP = false;
                } else {
                  this.isImageP = true;
                }
              }
              else if (photo == 'photo3') {
                this.showc = true;
                this.photoC = varData;
                if (this.uploadType != 'png' && this.uploadType != 'jpg') {
                  this.isImageC = false;
                } else {
                  this.isImageC = true;
                }
              }
              else if (photo == 'photo4') {
                this.shows = true;
                this.photoS = varData;
                if (this.uploadType != 'png' && this.uploadType != 'jpg') {
                  this.isImageS = false;
                } else {
                  this.isImageS = true;
                }
              }
              else {
                this.http.presentToast('上传文件错误')
              }
            } else {
              this.http.presentToast('上传失败');
            }
          }, (err) => {
            this.http.presentToast(err);
          })
      })
      .catch(e => {
        this.http.presentToast(e);
      });
  }

  getAddress(value) {
    this.address = '';
    var arrPro;
    if (value == 'project') {
      arrPro = this.addProject.project_address.split(' ');
    } else if (value == 'owner') {
      arrPro = this.addOwner.region.split(' ');
    } else if (value == 'company') {
      arrPro = this.addCompany.address.split(' ');
    } else if (value == 'site') {
      arrPro = this.addStation.site_region.split(' ');
    }
    this.dealAddress(arrPro);
  }

  //选择地区后按后台所需处理传输
  dealAddress(arr) {
    if (arr[1] == "不限" || arr[1] == '市辖县' || arr[1] == '市辖区') {
      arr[1] = ''
    }
    if (arr[2] == "不限" || arr[2] == '市辖区' || arr[2] == 'null') {
      arr[2] = ''
    }
    for (let i = 0, len = arr.length; i < len; i++) {
      if (i == 2) {
        this.address += arr[i]
      } else {
        this.address += arr[i] + ',';
      }
    }
  }

  delImage(photo: any): void {
    let actionSheet = this.actionSheetCtrl.create({
      title: '是否删除附件',
      buttons: [
        {
          text: '确认删除',
          handler: () => {
            if (photo == 'photo1') {
              this.showp = false;
              this.photoP = '';
            }
            else if (photo == 'photo3') {
              this.showc = false;
              this.photoC = '';
            }
            else if (photo == 'photo4') {
              this.shows = false;
              this.photoS = '';
            }
            else {
              this.http.presentToast('删除无效')
            }
          }
        }, {
          text: '取消',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    })
    actionSheet.present();
  }

  //业主上传证明
  addProve() {
    this.fileChooser.open()
      .then(uri => {
        if (this.provePhoto.length > 5) {
          let confirm = this.alertCtrl.create({
            title: '消息提示',
            message: '最多允许上传6份',
            buttons: [
              {
                text: '确认',
                handler: () => {
                }
              }
            ]
          });
          confirm.present();
        } else {
          const fileTransfer: FileTransferObject = this.transfer.create();
          let fileN = uri.substring(uri.lastIndexOf('/') + 1);//获取文件名
          let mimeT = this.getFileMimeType(this.getFileType(uri));//获取文件类型
          let options = {
            fileKey: 'file',
            fileName: fileN,
            mimeType: mimeT,
            chunkedMode: false
          }
          let loading = this.loadingCtrl.create({
            content: '上传进度：0%',
            dismissOnPageChange: false
          });
          loading.present();
          let no: number = 0;
          fileTransfer.onProgress(progressEvent => {
            if (progressEvent.lengthComputable) {
              no = progressEvent.loaded / progressEvent.total * 100;
            }
          });
          let timer = setInterval(() => {
            loading.setContent("上传进度：" + Math.floor(no) + "%");
            if (no >= 99) {
              clearInterval(timer);
            }
          }, 300);

          fileTransfer.upload(uri, DATABASE + 'customer/index/addFile', options)
            .then((res: any) => {
              if (JSON.parse(res.response).code == 200) {
                if (timer) clearInterval(timer);
                loading.dismiss();
                var urlData = JSON.parse(res.response).data;
                this.provePhoto.push(urlData);
                this.imgOrfile = urlData.substring(urlData.lastIndexOf('.') + 1).toLowerCase();
                var a;
                if (this.imgOrfile != 'png' && this.imgOrfile != 'jpg') {
                  a = { url: urlData, isImage: false }
                } else {
                  a = { url: urlData, isImage: true }
                }
                this.showProve.push(a);

              } else {
                this.http.presentToast('上传失败');
              }
            }, (err) => {
              this.http.presentToast(err);
            })
        }
      })
      .catch(e => {
        this.http.presentToast(e);
      });
  }

  delProve(val: number): void {
    let actionSheet = this.actionSheetCtrl.create({
      title: '是否删除附件',
      buttons: [
        {
          text: '确认删除',
          handler: () => {
            this.showProve.splice(val, 1);
            this.provePhoto.splice(val, 1);
          }
        }, {
          text: '取消',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    })
    actionSheet.present();
  }

  submit(type): void {
    if (type == '项目信息表') {
      this.addProject.party_a_bid_contract = this.addProject.party_a_bid_contract ? '1' : '0';
      this.addProject.bid_contract = this.addProject.bid_contract ? '1' : '0';
      this.addProject.whether_site_selection = this.addProject.whether_site_selection ? '1' : '0';
      this.addProject.party_a_bid_contract_url = this.photoP;
      this.addProject.bid_contract_url = this.photoC;
      this.addProject.site_selection_url = this.photoS;
      this.addProject.project_address = this.address;
      this.http.post(DATABASE + 'customer/index/addProject', this.addProject)
        .then(res => {
          let msg: string;
          if (res.code == 200) {
            msg = `${res.msg}`;
          } else {
            msg = `新增失败:${res.msg}`;
            this.addProject.bid_contract = false;
            this.addProject.party_a_bid_contract = false;
            this.addProject.whether_site_selection = false;
          }
          let confirm = this.alertCtrl.create({
            title: '消息提示',
            message: msg,
            buttons: [
              {
                text: '确认',
                handler: () => {
                  if (res.code) {
                    this.addProject.bid_contract = false;
                    this.addProject.party_a_bid_contract = false;
                    this.addProject.whether_site_selection = false;
                    this.navCtrl.push('DatabasePage', { tab: true });
                  }
                }
              }
            ]
          });
          confirm.present();
        })
    } else if (type == '企业客户表') {
      this.addCompany.contacts_sex = this.addCompany.contacts_sex ? '女' : '男';
      this.addCompany.address = this.address;
      this.addCompany.whether_cooperation_company = this.addCompany.whether_cooperation_company ? '是' : '否';
      this.http.post(DATABASE + 'customer/index/addBidCompany', this.addCompany)
        .then(res => {
          let msg: string;
          if (res.code == 200) {
            msg = `${res.msg}`;
          } else {
            msg = `新增失败:${res.msg}`;
            this.addCompany.contacts_sex = false;
            this.addCompany.whether_cooperation_company = false;
          }
          let confirm = this.alertCtrl.create({
            title: '消息提示',
            message: msg,
            buttons: [
              {
                text: '确认',
                handler: () => {
                  if (res.code) {
                    this.addCompany.contacts_sex = false;
                    this.addCompany.whether_cooperation_company = false;
                    this.navCtrl.push('DatabasePage', { tab: true });
                  }
                }
              }
            ]
          });
          confirm.present();
        })
    } else if (type == '站点表') {
      this.addStation.whether_address = this.addStation.whether_address ? '1' : '0';
      this.addStation.whether_admission = this.addStation.whether_admission ? '1' : '0';
      this.addStation.whether_finished = this.addStation.whether_finished ? '1' : '0';
      this.addStation.whether_open = this.addStation.whether_open ? '1' : '0';
      this.addStation.whether_verification = this.addStation.whether_verification ? '1' : '0';
      this.addStation.whether_start_verification = this.addStation.whether_start_verification ? '1' : '0';
      this.addStation.whether_end_verification = this.addStation.whether_end_verification ? '1' : '0';
      this.addStation.contact_sex = this.addStation.contact_sex ? '女' : '男';
      this.addStation.current_network_state = this.addStation.current_network_state ? '有现网' : '无现网';
      this.addStation.site_region = this.address;
      this.http.post(DATABASE + 'customer/index/addSite', this.addStation)
        .then(res => {
          let msg: string;
          if (res.code == 200) {
            msg = `${res.msg}`;
          } else {
            msg = `新增失败:${res.msg}`;
            this.addStation.whether_address = false;
            this.addStation.whether_admission = false;
            this.addStation.whether_finished = false;
            this.addStation.whether_open = false;
            this.addStation.whether_verification = false;
            this.addStation.whether_start_verification = false;
            this.addStation.whether_end_verification = false;
            this.addStation.contact_sex = false;
            this.addStation.current_network_state = false;
          }
          let confirm = this.alertCtrl.create({
            title: '消息提示',
            message: msg,
            buttons: [
              {
                text: '确认',
                handler: () => {
                  if (res.code) {
                    this.addStation.whether_address = false;
                    this.addStation.whether_admission = false;
                    this.addStation.whether_finished = false;
                    this.addStation.whether_open = false;
                    this.addStation.whether_verification = false;
                    this.addStation.whether_start_verification = false;
                    this.addStation.whether_end_verification = false;
                    this.addStation.contact_sex = false;
                    this.addStation.current_network_state = false;
                    this.navCtrl.push('DatabasePage', { tab: true });
                  }
                }
              }]
          });
          confirm.present();
        })
    } else if (type = '业主客户表') {
      this.addOwner.customer_sex = this.addOwner.customer_sex ? '女' : '男';
      this.addOwner.identity_prove = this.addOwner.identity_prove ? '1' : '0';
      this.addOwner.current_network_state = this.addOwner.current_network_state ? '有现网' : '无现网';
      this.addOwner.prove_url = JSON.stringify(this.provePhoto);
      this.addOwner.region = this.address;
      if (this.addOwner.identity_prove == '1' && this.addOwner.prove_url == '[]') {
        let confirm = this.alertCtrl.create({
          title: '消息提示',
          message: '上传证明不能为空',
          buttons: [{
            text: '确认',
            handler: () => {
            }
          }]
        });
        confirm.present();
      } else {
        this.http.post(DATABASE + 'customer/index/addOwner', this.addOwner)
          .then(res => {
            let msg: string;
            if (res.code == 200) {
              msg = `${res.msg}`;
            } else {
              msg = `新增失败:${res.msg}`;
              this.addOwner.customer_sex = false;
              this.addOwner.identity_prove = false;
              this.addOwner.current_network_state = false;
            }
            let confirm = this.alertCtrl.create({
              title: '消息提示',
              message: msg,
              buttons: [{
                text: '确认',
                handler: () => {
                  if (res.code) {
                    this.addOwner.customer_sex = false;
                    this.addOwner.identity_prove = false;
                    this.addOwner.current_network_state = false;
                    this.navCtrl.push('DatabasePage', { tab: true });
                  }
                }
              }]
            });
            confirm.present();
          })
      }

    } else {
      alert()
    }
  }
  //获取文件类型
  getFileType(url: string): string {
    return url.substring(url.lastIndexOf('.') + 1, url.length).toLowerCase();
  }

  //获取文件Mime类型
  getFileMimeType(fileType: string): string {
    let mimeType: string = '';
    switch (fileType) {
      case 'txt':
        mimeType = 'text/plain';
        break;
      case 'docx':
        mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        break;
      case 'doc':
        mimeType = 'application/msword';
        break;
      case 'pptx':
        mimeType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
        break;
      case 'ppt':
        mimeType = 'application/vnd.ms-powerpoint';
        break;
      case 'xlsx':
        mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        break;
      case 'xls':
        mimeType = 'application/vnd.ms-excel';
        break;
      case 'zip':
        mimeType = 'application/x-zip-compressed';
        break;
      case 'rar':
        mimeType = 'application/octet-stream';
        break;
      case 'pdf':
        mimeType = 'application/pdf';
        break;
      case 'jpg':
        mimeType = 'image/jpeg';
        break;
      case 'png':
        mimeType = 'image/png';
        break;
      default:
        mimeType = 'application/' + fileType;
        break;
    }
    return mimeType;
  }
}
