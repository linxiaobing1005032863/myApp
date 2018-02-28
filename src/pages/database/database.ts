import { Component, ViewChildren, ViewChild, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Content, LoadingController, ModalController, AlertController } from 'ionic-angular';
import { HttpService } from '../../providers/Http.service';
import { DATABASE } from '../../config/config';
import { FileChooser } from '@ionic-native/file-chooser';//选择文件



@IonicPage()
@Component({
  selector: 'page-database',
  templateUrl: 'database.html',
})
export class DatabasePage {
  database: string = "project";//默认进入资料库的项目
  showModal: boolean = false;
  timeout: any;
  projectContacts: Array<any> = [];//项目列表
  ownerContacts: Array<any> = [];//业主列表
  companyContacts: Array<any> = [];//企业客户列表
  stationContacts: Array<any> = [];//站点列表
  filesContacts: Array<any> = [];//我的文档列表

  index: string = 'A';//当前选中的字母  
  alphabet: Array<string> = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#".split('');//右侧检索导航
  offsetTops: Array<number> = [];//每段字母距离顶部的距离
  newArr: Array<any> = [];//通过接口获取的列表中含有的字母与26个字母的对比后公共的字母（最终显示在右侧的字母）
  arr1: Array<any> = [];//获取的项目列表中含有的字母  

  arr2: Array<any> = [];//获取的业主列表中含有的字母
  arr3: Array<any> = [];//获取的企业列表中含有的字母
  arr4: Array<any> = [];//获取的站点列表中含有的字母
  arr5: Array<any> = [];//获取的文档列表中含有的字母
  isShow = true;
  isAndroid: boolean = false;//判断是否为Android环境
  items: any;
  searchProject: Array<any> = [];
  searchCompany: Array<any> = [];
  searchSite: Array<any> = [];
  searchCustomer: Array<any> = [];
  searchContent: any = {};
  filterProject: boolean = false;
  filterOwner: boolean = false;
  filterCompany: boolean = false;
  filterSite: boolean = false;
  user: string;
  openProject: any = {
    bid_contract: '2',
    owner_contract: '2',
    party_a_owner_contract: '2',
  }//项目过滤参数
  openOwner: any = {
    identity_prove: '2',
  }//业主过滤参数
  openCompany: any = {
  }//企业过滤参数
  openSite: any = {
    whether_contact: '2'
  }//站点过滤参数
  showDownload: any;
  a: {};
  loginName: string;
  @ViewChildren('IonItemGroup1') ionItemGroup1;
  @ViewChild(Content) content: Content;

  constructor(platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    public ref: ChangeDetectorRef,
    public http: HttpService,
    public alertCtrl: AlertController,
    private fileChooser: FileChooser,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController) {

    this.isAndroid = platform.is('android');
    this.loginName = localStorage.getItem('loginName');//获取登录的用户名

  }
  ionViewDidLoad() {
    this.funProject();
  }

  filterAlphabet(arr) {
    this.newArr = [];
    for (var i = 0; i < this.alphabet.length; i++) {
      for (var j = 0; j < arr.length; j++) {
        if (this.alphabet[i] == arr[j]) {
          this.newArr[j] = arr[j];
          break;
        }
      }
    }
  }

  //获取资料库的项目列表
  funProject() {
    let loader = this.loadingCtrl.create({
      content: "加载中..."
    });
    loader.present();
    this.http.get(DATABASE + 'customer/index/appProjectList')
      .then(res => {
        if (res.code) {
          loader.dismiss();
          this.projectContacts = res.data;
          for (var i = 0; i < this.projectContacts.length; i++) {
            this.arr1[i] = this.projectContacts[i].letter;
          }
          this.getOffsetTops();
        } else {
          this.http.presentToast(res.msg);
        }
      }).catch(() => {
        this.http.presentToast('服务器错误,请联系管理员');
      })
  }
  //获取资料库的业主列表
  funOwner() {
    let loader = this.loadingCtrl.create({
      content: "加载中..."
    });
    loader.present();
    this.http.get(DATABASE + 'customer/index/appOwnerList')
      .then(res => {
        if (res.code) {
          loader.dismiss();
          this.ownerContacts = res.data;
          for (var i = 0; i < this.ownerContacts.length; i++) {
            this.arr2[i] = this.ownerContacts[i].letter;
          }
          this.getOffsetTops();
        } else {
          this.http.presentToast(res.msg);
        }
      }).catch(() => {
        this.http.presentToast('服务器错误,请联系管理员');
      })
  }
  //获取资料库的企业客户
  funCompany() {
    let loader = this.loadingCtrl.create({
      content: "加载中..."
    });
    loader.present();
    this.http.get(DATABASE + 'customer/index/appBidCompanyList')
      .then(res => {
        if (res.code) {
          loader.dismiss();
          this.companyContacts = res.data;
          for (var i = 0; i < this.companyContacts.length; i++) {
            this.arr3[i] = this.companyContacts[i].letter;
          }
          this.getOffsetTops();
        } else {
          this.http.presentToast(res.msg);
        }
      }).catch(() => {
        this.http.presentToast('服务器错误,请联系管理员');
      })
  }
  //获取资料库的站点
  funSite() {
    let loader = this.loadingCtrl.create({
      content: "加载中..."
    });
    loader.present();
    this.http.get(DATABASE + 'customer/index/appSiteList')
      .then(res => {
        if (res.code) {
          loader.dismiss();
          this.stationContacts = res.data;
          for (var i = 0; i < this.stationContacts.length; i++) {
            this.arr4[i] = this.stationContacts[i].letter;
          }
          this.getOffsetTops();
        } else {
          this.http.presentToast(res.msg);
        }
      }).catch(() => {
        this.http.presentToast('服务器错误,请联系管理员');
      })
  }
  //获取资料库的我的文档
  funFile() {
    let loader = this.loadingCtrl.create({
      content: "加载中..."
    });
    loader.present();
    this.user = localStorage.getItem('loginName');
    this.http.get(DATABASE + `customer/index/appMyDocument?user=${this.user}`)
      .then(res => {
        if (res.code) {
          loader.dismiss();
          this.filesContacts = res.data;
          for (let i = 0, len = this.filesContacts.length; i < len; i++) {
            this.arr5[i] = this.filesContacts[i].letter;
          }
          this.getOffsetTops();
        } else {
          this.http.presentToast(res.msg);
        }
      }).catch(() => {
        this.http.presentToast('服务器错误,请联系管理员');
      })
  }

  //选择类型
  sysChanged() {
    if (this.database == 'project') {
      this.funProject();
    } else if (this.database == 'owner') {
      this.funOwner();
    } else if (this.database == 'company') {
      this.funCompany();
    } else if (this.database == 'station') {
      this.funSite();
    } else if (this.database == 'files') {
      this.funFile();
    }
    this.content.scrollTo(0, 0, 0);
  }

  transform(value: any) {
    let result: any;
    switch (value) {
      case "project":
        result = this.arr1;
        break;
      case "owner":
        result = this.arr2;
        break;
      case "company":
        result = this.arr3;
        break;
      case "station":
        result = this.arr4;
        break;
      case "files":
        result = this.arr5;
        break;
      default:
        result = this.arr1;
        break;
    }
    return result;
  }

  //每个字母距离顶部的距离
  getOffsetTops() {
    var getArr = this.transform(this.database);
    getArr = [];
    setTimeout(() => {
      this.filterAlphabet(this.transform(this.database));
      this.offsetTops = this.ionItemGroup1._results.map(ele => {
        return ele.nativeElement.offsetTop
      })
      this.index = this.newArr[0];
    }, 0)
  }

  selectIndex(index: number) {
    this.index = this.newArr[index];//获取选中字母
    const offsetTop = this.offsetTops[index];//获取选中字母距离顶部距离
    this.content.scrollTo(0, offsetTop, 300);//滑动到对应的位置
    this.createModal();
  }

  createModal() {
    clearTimeout(this.timeout);
    this.showModal = true;
    this.timeout = setTimeout(() => {
      this.showModal = false;
      this.ref.detectChanges();
    }, 800)
  }

  onScroll() {
    const threshold = 42;//字母标题的高度
    if (this.content.scrollTop < threshold) {
      this.index = this.newArr[0];
      this.ref.detectChanges();//手动监测变化
      return;
    }
    for (let i = this.offsetTops.length; i > 0; i--) {
      if (this.content.scrollTop + threshold >= this.offsetTops[i]) {
        this.index = this.newArr[i];
        this.ref.detectChanges();//手动监测变化
        return;
      }
    }
  }

  //筛选
  gotoFilter(database) {
    if (database == 'project') {
      let myModal = this.modalCtrl.create('ProjectFilterPage', { 'valueP': this.openProject });
      myModal.onDidDismiss(data => {
        if (data == undefined) {
          return
        }
        this.openProject = data;
        if (
          this.openProject.project_name == ''
          && this.openProject.project_type == ''
          && this.openProject.party_a_company == ''
          && this.openProject.bid_company == ''
          && this.openProject.owner_customer == ''
          && this.openProject.bid_contract == '2'
          && this.openProject.owner_contract == '2'
          && this.openProject.party_a_owner_contract == '2'
        ) {
          this.projectContacts = [];
          this.funProject();
          this.filterProject = false;
        } else {
          this.http.post(DATABASE + 'customer/index/projectScreen', this.openProject)
            .then(res => {
              let msg: string;
              if (res.code == 200) {
                msg = `${res.msg}`;
              } else {
                msg = `筛选失败:${res.msg}`;
              }
              let confirm = this.alertCtrl.create({
                title: '消息提示',
                message: msg,
                buttons: [
                  {
                    text: '确认',
                    handler: () => {
                      if (res.code) {
                        this.projectContacts = [];
                        this.filterProject = true;
                        this.projectContacts = res.data;
                      }
                    }
                  }
                ]
              });
              confirm.present();
            })
        }
      });
      myModal.present();
    } else if (database == 'owner') {
      let myModal = this.modalCtrl.create('OwnerFilterPage', { 'valueO': this.openOwner });
      myModal.onDidDismiss(data => {
        if (data == undefined) {
          return
        }
        this.openOwner = data;
        if (
          this.openOwner.customer_name == ''
          && this.openOwner.important_level == ''
          && this.openOwner.customer_status == ''
          && this.openOwner.region == ''
          && this.openOwner.identity_prove == '2'
        ) {
          this.ownerContacts = [];
          this.funOwner();
          this.filterOwner = false;
        } else {
          this.http.post(DATABASE + 'customer/index/ownerScreen', this.openOwner)
            .then(res => {
              let msg: string;
              if (res.code == 200) {
                msg = `${res.msg}`;
              } else {
                msg = `筛选失败:${res.msg}`;
              }
              let confirm = this.alertCtrl.create({
                title: '消息提示',
                message: msg,
                buttons: [
                  {
                    text: '确认',
                    handler: () => {
                      if (res.code) {
                        this.ownerContacts = [];
                        this.filterOwner = true;
                        this.ownerContacts = res.data;
                      }
                    }
                  }
                ]
              });
              confirm.present();
            })
        }
      });
      myModal.present();
    } else if (database == 'company') {
      let myModal = this.modalCtrl.create('CompanyFilterPage', { 'valueC': this.openCompany });
      myModal.onDidDismiss(data => {
        if (data == undefined) {
          return
        }
        this.openCompany = data;
        if (
          this.openCompany.company_name == ''
          && this.openCompany.company_type == ''
          && this.openCompany.address == ''
        ) {
          this.companyContacts = [];
          this.funCompany();
          this.filterCompany = false;
        } else {
          this.http.post(DATABASE + 'customer/index/comanyScreen', this.openCompany)
            .then(res => {
              let msg: string;
              if (res.code == 200) {
                msg = `${res.msg}`;
              } else {
                msg = `筛选失败:${res.msg}`;
              }
              let confirm = this.alertCtrl.create({
                title: '消息提示',
                message: msg,
                buttons: [
                  {
                    text: '确认',
                    handler: () => {
                      if (res.code) {
                        this.companyContacts = [];
                        this.filterCompany = true;
                        this.companyContacts = res.data;
                      }
                    }
                  }
                ]
              });
              confirm.present();
            })
        }
      });
      myModal.present();
    } else if (database == 'station') {
      let myModal = this.modalCtrl.create('StationFilterPage', { 'valueS': this.openSite });
      myModal.onDidDismiss(data => {
        if (data == undefined) {
          return
        }
        this.openSite = data;
        if (
          this.openSite.site_type == ''
          && this.openSite.site_region == ''
          && this.openSite.whether_contact == '2'
        ) {
          this.stationContacts = [];
          this.funSite();
          this.filterSite = false;
        } else {
          this.http.post(DATABASE + 'customer/index/siteScreen', this.openSite)
            .then(res => {
              let msg: string;
              if (res.code == 200) {
                msg = `${res.msg}`;
              } else {
                msg = `筛选失败:${res.msg}`;
              }
              let confirm = this.alertCtrl.create({
                title: '消息提示',
                message: msg,
                buttons: [
                  {
                    text: '确认',
                    handler: () => {
                      if (res.code) {
                        this.stationContacts = [];
                        this.filterSite = true;
                        this.stationContacts = res.data;
                      }
                    }
                  }
                ]
              });
              confirm.present();
            })
        }
      });
      myModal.present();
    }
  }

  //新建资料库
  addProject() {
    this.navCtrl.push('AddDatabasePage');
  }
  //查看项目详情
  gotoProject(id: string, token: string) {
    this.navCtrl.push('ProjectDetailsPage', { id: id, token: token });
  }
  //查看业主客户详情
  gotoOwner(id: string, token: string) {
    this.navCtrl.push('OwnerDetailsPage', { id: id, token: token });
  }
  //查看企业客户详情
  gotoCompany(id: string, token: string) {
    this.navCtrl.push('CompanyDetailsPage', { id: id, token: token });
  }
  //查看站点详情
  gotoStation(id: string, token: string) {
    this.navCtrl.push('StationDetailsPage', { id: id, token: token });
  }
  //我的文档
  gotoFiles(see) {
    this.navCtrl.push('MyFilePage', { see: see })
  }
  //删除文件的列表内容
  delete(id, token) {
    let confirm = this.alertCtrl.create({
      title: '消息提示',
      message: '是否确认删除',
      buttons: [
        {
          text: '确认',
          handler: () => {
            this.http.get(DATABASE + `customer/index/delDocument?id=${id}&token=${token}&user=${this.loginName}`)
              .then(res => {
                if (res.code) {
                  this.http.presentToast('删除成功');
                  this.funFile();                  
                  
                } else {
                  this.http.presentToast(res.msg);
                }
              }).catch(() => {
                this.http.presentToast('服务器错误,请联系管理员');
              })
          }
        },
        {
          text: '取消',
          handler: () => { }
        }
      ]
    })
    confirm.present();
  }

  //下载文档
  downLoad(id, token, name, size) {
    let confirm = this.alertCtrl.create({
      title: '消息提示',
      message: '是否确认下载',
      buttons: [
        {
          text: '确认',
          handler: () => {
            this.navCtrl.push('MyFilePage', { id: id, token: token, name: name, size: size })
          }
        },
        {
          text: '取消',
          handler: () => { }
        }
      ]
    })
    confirm.present();
  }
  gotoUp(type) {
    this.fileChooser.open()
      .then(uri => {
        this.navCtrl.push('MyFilePage', { url: decodeURI(uri), type: type })
      })
      .catch(e => {
        this.http.presentToast(e);
      });
  }
  //判断是否搜索来显示列表内容
  hideShow() {
    this.isShow = false;
  }
  onCancelSearch() {
    this.isShow = true;
  };

  //通过搜索获取列表
  getItems(ev) {
    this.searchContent = {};
    var val = ev.target.value;
    var type = 5;
    if (val && val.trim() != '') {
      this.http.get(DATABASE + 'customer/index/screenProject', { content: val, type: type })
        .then(res => {
          this.searchContent = res.data;
          this.searchProject = res.data.project;
          this.searchCompany = res.data.company;
          this.searchSite = res.data.site;
          this.searchCustomer = res.data.customer;
        })
    }
  }

  //搜索结果----------点击进入详情
  searchResult(id, token, type) {
    if (type == '1') {
      this.navCtrl.push('ProjectDetailsPage', { id: id, token: token });
    } else if (type == '2') {
      this.navCtrl.push('CompanyDetailsPage', { id: id, token: token });
    } else if (type == '3') {
      this.navCtrl.push('StationDetailsPage', { id: id, token: token });
    } else if (type == '4') {
      this.navCtrl.push('OwnerDetailsPage', { id: id, token: token });
    } else {
      alert('操作有误。')
    }
  }

}
