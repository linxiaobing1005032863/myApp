import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HttpService } from '../../../providers/Http.service';
import { DATABASE } from '../../../config/config';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';


@IonicPage()
@Component({
  selector: 'page-my-file',
  templateUrl: 'my-file.html',
})
export class MyFilePage {
  document: string = "download";
  loginName: string;//获取用户名
  date: any;//获取当天日期
  type: string;//获取是上传进来还是下载进来
  see: string;//判断是否从传输列表进入
  prefix: any = 'https://wl.bjike.com';
  // prefix: any = 'http://192.168.0.93:8080';

  download: Array<any> = [];
  downloading: any = [];
  showDownload: any;//显示下载列表

  downloadId: string;//获取下载id
  downloadToken: string;//获取下载token
  downloadName: string;//获取下载name
  downloadSize: string;//获取下载size

  upload: any = [];
  uploading: any = []
  showUpload: any;//显示上传列表

  uploadUrl: string;//获取上传路径

  a: {};//当前下载数据--------准备插入本地
  b: {};//当前上传数据--------准备插入本地

  temp: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpService,
    private transfer: FileTransfer,
    private file: File,
    private fileOpener: FileOpener,
    public loadingCtrl: LoadingController) {

    this.date = new Date().toLocaleDateString();//获取当天时间
    this.type = this.navParams.get('type');//判断当前进入是上传还是下载
    this.loginName = localStorage.getItem('loginName');//获取登录的用户名

    //正在下载的文件
    this.downloadId = this.navParams.get('id');
    this.downloadToken = this.navParams.get('token');
    this.downloadName = this.navParams.get('name');
    this.downloadSize = this.navParams.get('size');

    //正在上传的文件
    this.uploadUrl = this.navParams.get('url');


    //从传输列表进入
    this.see = this.navParams.get('see');

    //显示的上传与下载列表    
    this.getUp();
    this.getDown();

    //根据状态进入对应操作
    if (this.type) {
      this.document = 'upload';
      this.uploadFile();
      let _uploading: any = { name: this.uploadUrl.substring(this.uploadUrl.lastIndexOf('/') + 1), time: this.date, }
      this.uploading.push(_uploading);
    } else if (this.see) {
    } else {
      this.downloadFile();
      //显示的正在下载的列表
      let b: any = { name: this.downloadName, time: this.date, size: this.downloadSize };
      this.downloading.push(b);
    }
  }

  ionViewDidLoad() { }

  // 上传文件
  uploadFile() {
    const fileTransfer: FileTransferObject = this.transfer.create();
    let fileN = this.uploadUrl.substring(this.uploadUrl.lastIndexOf('/') + 1);//获取文件名
    let mimeT = this.getFileMimeType(this.getFileType(this.uploadUrl));//获取文件类型
    let options = {
      fileKey: 'file',
      fileName: fileN,
      mimeType: mimeT,
      chunkedMode: false,
      params: {
        user: this.loginName,
      }
    }
    let loading = this.loadingCtrl.create({
      content: '上传进度：0%',
      dismissOnPageChange: false
    });
    loading.present();
    let go: number = 0;
    fileTransfer.onProgress(progressEvent => {
      if (progressEvent.lengthComputable) {
        go = progressEvent.loaded / progressEvent.total * 100;
      }
    });
    let timer = setInterval(() => {
      loading.setContent("上传进度：" + Math.floor(go) + "%");
      if (go >= 99) {
        clearInterval(timer);
      }
    }, 300);
    fileTransfer.upload(this.uploadUrl, DATABASE + 'customer/index/documentUpload', options)
      .then((res: any) => {
        if (JSON.parse(res.response).code == 200) {
          if (timer) clearInterval(timer);
          loading.dismiss();
          // 具体的操作内容
          this.b = { name: fileN, time: this.date, openUrl: this.uploadUrl };
          this.upload.push(this.b)
          localStorage.setItem('uploadList', JSON.stringify(this.upload));
          this.uploading = [];
          this.getUp();
          this.http.presentToast('上传成功');
        } else {
          this.http.presentToast('上传失败');
        }
      }, (err) => {
        this.http.presentToast(err);
      })
  }
  
  // 下载文件
  downloadFile() {
    const fileTransfer: FileTransferObject = this.transfer.create();
    let loading = this.loadingCtrl.create({
      content: '下载进度：0%',
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
      loading.setContent("下载进度：" + Math.floor(no) + "%");
      if (no >= 99) {
        clearInterval(timer);
      }
    }, 300);

    fileTransfer.download(DATABASE + `customer/index/documentDownload?user=${this.loginName}&id=${this.downloadId}&token=${this.downloadToken}`,
      this.file.externalDataDirectory + this.downloadName).then((entry) => {
        if (timer) clearInterval(timer);
        loading.dismiss();
        this.downloading = [];
        this.a = { name: this.downloadName, time: this.date, size: this.downloadSize, openUrl: entry.toURL() };
        this.download.push(this.a);
        localStorage.setItem('downloadList', JSON.stringify(this.download));
        this.getDown();
        this.http.presentToast('下载成功');
      }, (error) => {
        this.http.presentToast('下载失败，请联系管理员');
      });

  }

  //打开文件
  openFile(url, up?) {
    if (up) {
      this.fileOpener.open(decodeURI(url), this.getFileMimeType(this.getFileType(url)))
        .then((res) => {
        })
        .catch((error) => {
        });
    } else {
      this.fileOpener.open(decodeURI(url), this.getFileMimeType(this.getFileType(url)))
        .then((res) => {
        })
        .catch((error) => {
        });
    }
  }

  //获取本地的下载列表
  getDown() {
    this.showDownload = JSON.parse(localStorage.getItem('downloadList'));
    if (this.showDownload) {
      for (let i = 0; i < this.showDownload.length; i++) {
        this.download.push(this.showDownload[i]);
      }
    }
  }

  //获取本地的上传列表
  getUp() {
    this.showUpload = JSON.parse(localStorage.getItem('uploadList'));
    if (this.showUpload) {
      for (let i = 0; i < this.showUpload.length; i++) {
        this.upload.push(this.showUpload[i]);
      }
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
