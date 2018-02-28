import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { HttpService } from '../../../providers/Http.service';

@IonicPage()
@Component({
  selector: 'page-project-filter',
  templateUrl: 'project-filter.html',
})
export class ProjectFilterPage {
  paramObj: any = {}
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpService,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController,
  ) {
    this.paramObj = navParams.get('valueP');
  }

  ionViewDidLoad() {
  }
  reset() {
    this.paramObj = {
      project_name: '',
      project_type: '',
      party_a_company: '',
      bid_company: '',
      owner_customer: '',
      bid_contract: '2',
      owner_contract: '2',
      party_a_owner_contract: '2',
    }
  }
  submit() {
    this.viewCtrl.dismiss(this.paramObj);
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
