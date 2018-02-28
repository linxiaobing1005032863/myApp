import { Component, ViewChild } from '@angular/core';
import { Platform, IonicApp, Nav, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GlobalData } from '../providers/GlobalData';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // LoginPage  TabsPage
  rootPage: any = 'LoginPage';
  backButtonPressed: boolean = false;
  @ViewChild('myNav') nav: Nav;
  constructor(
    public platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public ionicApp: IonicApp,
    public toastCtrl: ToastController,
    private globalData: GlobalData, ) {
    platform.ready().then(() => {
      this.globalData.token = localStorage.getItem('token');
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.registerBackButtonAction();//注册返回按键事件
    });
  }
  ngOnInit() {
    // Let's navigate from TabsPage to Page1
    this.globalData.token = localStorage.getItem('token');
    if (!this.globalData.token) {
      this.nav.push('LoginPage');
    }
  }

  registerBackButtonAction() {
    this.platform.registerBackButtonAction(() => {
      //如果想点击返回按钮隐藏toast或loading或Overlay就把下面加上     
      this.ionicApp._toastPortal.getActive() || this.ionicApp._loadingPortal.getActive() || this.ionicApp._overlayPortal.getActive();
      let activePortal = this.ionicApp._modalPortal.getActive();
      if (activePortal) {
        activePortal.dismiss().catch(() => { });
        activePortal.onDidDismiss(() => { });
        return;
      }
      let activeVC = this.nav.getActive();
      if (activeVC.instance.tabs) {
        let tabs = activeVC.instance.tabs;
        let activeNav = tabs.getSelected();
        if (localStorage.getItem('root')) {//判断是否为二级页面
          return activeNav.popToRoot();
        }
        return activeNav.canGoBack() ? activeNav.pop() : this.showExit()
      }
      return this.nav.pop();
    }, 1)
  }
  showExit() {
    if (this.backButtonPressed) { //当触发标志为true时，即2秒内双击返回按键则退出APP
      this.platform.exitApp();
    } else {
      this.toastCtrl.create({
        message: '再按一次退出应用',
        duration: 2000,
        position: 'top'
      }).present();
      this.backButtonPressed = true;
      setTimeout(() => this.backButtonPressed = false, 2000);//2秒内没有再次点击返回则将触发标志标记为false
    }
  }
}
