import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { Network } from "@ionic-native/network";
import { InAppBrowser } from "@ionic-native/in-app-browser";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { GlobalData } from "../providers/GlobalData";
import { PROVIDERS } from './imports';

import { Camera } from '@ionic-native/camera';//获取摄像头
import { ImagePicker } from '@ionic-native/image-picker';//获取图片
import { PhotoViewer } from '@ionic-native/photo-viewer';//全屏显示图像

import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { FileChooser } from '@ionic-native/file-chooser';//选择手机文件
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
// import { NgCalendarModule  } from 'ionic2-calendar';

import { SpeechRecognition } from '@ionic-native/speech-recognition';//语音

import { MultiPickerModule } from 'ion-multi-picker';
import { CityDataProvider } from '../providers/city-data/city-data';//三级联动

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: 'true',
      backButtonText: '',
      cancelButton: ' 取消'
    }),
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    MultiPickerModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    GlobalData,
    SplashScreen,
    InAppBrowser,
    Network,
    PROVIDERS,
    ImagePicker,
    Camera,
    PhotoViewer,
    File,
    FileOpener,
    FileChooser,
    FileTransfer,
    FileTransferObject,
    SpeechRecognition,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    CityDataProvider
  ]
})
export class AppModule { }
