import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { HttpService } from '../../../providers/Http.service';
import { CityDataProvider } from "../../../providers/city-data/city-data";


@IonicPage()
@Component({
  selector: 'page-company-filter',
  templateUrl: 'company-filter.html',
})
export class CompanyFilterPage {
  paramObj: any = {};
  cityColumns: any[];//三级联动地区
  address: string;
  _address: any;//临时保存地区

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpService,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController,
    public cityDataProvider: CityDataProvider,

  ) {
    this.paramObj = navParams.get('valueC');
    this.cityColumns = this.cityDataProvider.cities;
    if (this.paramObj._address) {
      this.paramObj.address = this.paramObj._address;
      this.dealAddress();
    }
  }
  reset() {
    this.paramObj = {
      company_name: '',
      company_type: '',
      address: '',
    }
    this._address = '';
    this.address = '';
  }
  ionViewDidLoad() {
  }
  getAddress() {
    this.dealAddress()
  }
  dealAddress() {
    this._address = this.paramObj.address;
    this.address = '';
    var arrPro = this.paramObj.address.split(' ');
    for (let i = 0, len = arrPro.length; i < len; i++) {
      if (arrPro[i] == '不限' || arrPro[i] == '市辖区' || arrPro[i] == 'null') {
        arrPro[i] = ''
      }
      if (i == 2) {
        this.address += arrPro[i]
      } else {
        this.address += arrPro[i] + ',';
      }
    }
  }
  submit() {
    if (this.address != undefined) {
      this.paramObj.address = this.address;
    }
    this.paramObj._address = this._address;
    this.viewCtrl.dismiss(this.paramObj);
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
