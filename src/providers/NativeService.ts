import { Injectable } from "@angular/core";
import { ToastController, LoadingController, Platform, Loading, AlertController } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Network } from "@ionic-native/network";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { GlobalData } from "./GlobalData";
import { SpeechRecognition } from '@ionic-native/speech-recognition';

declare var LocationPlugin;

@Injectable()
export class NativeService {
  private loading: Loading;
  private loadingIsOpen: boolean = false;

  constructor(private platform: Platform,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private network: Network,
    private globalData: GlobalData,
    private loadingCtrl: LoadingController,
    private inAppBrowser: InAppBrowser,
    private speechRecognition: SpeechRecognition, ) {
  }


  /**
   * 使用默认状态栏
   */
  statusBarStyleDefault(): void {
    this.statusBar.styleDefault();
  }

  /**
   * 隐藏启动页面
   */
  splashScreenHide(): void {
    this.splashScreen.hide();
  }

  /**
   * 获取网络类型 如`unknown`, `ethernet`, `wifi`, `2g`, `3g`, `4g`, `cellular`, `none`
   */
  getNetworkType(): string {
    if (!this.isMobile()) {
      return 'wifi';
    }
    return this.network.type;
  }

  /**
   * 判断是否有网络
   */
  isConnecting(): boolean {
    return this.getNetworkType() != 'none';
  }

  /**
   * 通过浏览器打开url
   */
  openUrlByBrowser(url: string): void {
    this.inAppBrowser.create(url, '_system');
  }

  /**
   * 是否真机环境
   */
  isMobile(): boolean {
    return this.platform.is('mobile') && !this.platform.is('mobileweb');
  }

  /**
   * 是否android真机环境
   */
  isAndroid(): boolean {
    return this.isMobile() && this.platform.is('android');
  }

  /**
   * 是否ios真机环境
   */
  isIos(): boolean {
    return this.isMobile() && (this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone'));
  }

  alert(title: string, subTitle: string = "", ): void {
    this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: [{ text: '确定' }]
    }).present();
  }

  /**
   * 统一调用此方法显示提示信息
   * @param message 信息内容
   * @param duration 显示时长
   */
  showToast(message: string = '操作完成', duration: number = 2000): void {
    if (this.isMobile()) {
      this.toastCtrl.create({
        message: message,
        duration: duration,
        position: 'middle',
        showCloseButton: false
      }).present();
    } else {
      this.toastCtrl.create({
        message: message,
        duration: duration,
        position: 'middle',
        showCloseButton: false
      }).present();
    }
  };

  /**
   * 统一调用此方法显示loading
   * @param content 显示的内容
   */
  showLoading(content: string = ''): void {
    if (!this.globalData.showLoading) {
      return;
    }
    if (!this.loadingIsOpen) {
      this.loadingIsOpen = true;
      this.loading = this.loadingCtrl.create({
        content: content
      });
      this.loading.present();
      setTimeout(() => {
        this.loadingIsOpen && this.loading.dismiss();
        this.loadingIsOpen = false;
      }, 120000);
    }
  };

  /**
   * 关闭loading
   */
  hideLoading(): void {
    if (!this.globalData.showLoading) {
      this.globalData.showLoading = true;
    }
    this.loadingIsOpen && this.loading.dismiss();
    this.loadingIsOpen = false;
  };

  public getLocation() {
    LocationPlugin.getLocation(data => {
      return data;
    }, msg => {
      if (msg.indexOf('缺少定位权限') != -1) {
        this.alert('缺少定位权限，请在设备的设置中开启app的定位权限');
        return { msg: '缺少定位权限' };
      }
      if (msg.indexOf('KEY错误') != -1) {
        this.alert('KEY错误，请到高德开发者官网申请key');
        return { msg: 'KEY错误' };
      }
      this.alert('错误消息：' + msg);
    });
  }
  //开始语音转换
  startListening() {
    let option = {
      language: '"cmn-Hans-CN'
    }
    return this.speechRecognition.startListening(option)
  }
  //获取语音权限
  getPermissions() {
    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {
        if (!hasPermission) {
          this.speechRecognition.requestPermission();
        }
      })
  }
}
