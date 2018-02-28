
import { Injectable } from '@angular/core';

@Injectable()
export class GlobalData {

  private _userId: string;//用户id
  private _username: string;//用户名
  private _fullName: string;//姓名
  public _phone: string;//手机号
  private _password: string;//手机号
  private _token: string;//token
  private _loginName: string;//保存登录名为后期所用
  private _downloadList: Array<any>;//用户下载过的列表
  private _uploadList: Array<any>;//用户下载过的列表

  //设置http请求是否显示loading,注意:设置为true,接下来的请求会不显示loading,请求执行完成会自动设置为false
  private _showLoading: boolean = true;

  //app更新进度.默认为0,在app升级过程中会改变
  private _updateProgress: number = -1;

  get userId(): string {
    return this._userId;
  }

  set userId(value: string) {
    this._userId = value;
  }

  get userPhone(): string {
    return this._phone;
  }

  set userPhone(value: string) {
    this._phone = value;
  }

  get loginName(): string {
    return this._loginName;
  }

  set loginName(value: string) {
    this._loginName = value;
  }

  get userPassword(): string {
    return this._password;
  }

  set userPassword(value: string) {
    this._password = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get downloadList(): Array<any> {
    return this._downloadList;
  }

  set downloadList(value: Array<any>) {
    this._downloadList = value;
  }

  get uploadList(): Array<any> {
    return this._uploadList;
  }

  set uploadList(value: Array<any>) {
    this._uploadList = value;
  }

  get fullName(): string {
    return this._fullName;
  }

  set fullName(value: string) {
    this._fullName = value;
  }

  get token(): string {
    return this._token;
  }

  set token(value: string) {
    this._token = value;
  }

  get showLoading(): boolean {
    return this._showLoading;
  }

  set showLoading(value: boolean) {
    this._showLoading = value;
  }

  get updateProgress(): number {
    return this._updateProgress;
  }

  set updateProgress(value: number) {
    this._updateProgress = value;
  }
}
