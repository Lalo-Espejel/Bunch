import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { NavController, NavParams, Events, ModalController } from 'ionic-angular';
import { HelpCenterPage} from '../help-center/help-center';
import { LocalizationModel } from '../../_helpers/localizationModel'
import { AlertService } from '../../_helpers/alert.service'

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  // public clienteChangeEmitter: EventEmitter<any> = new EventEmitter();
  public isClient: boolean;
  public isEnglish: boolean;
  public enableNotif: boolean;
  public inteligenFollow: boolean;
  public geoLocalization: boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public _event: Events,
              private modalCtrl: ModalController,
              private localizationModel: LocalizationModel,
              private alertService: AlertService
  ) {
      this.isEnglish = localStorage.getItem("language") == "en"? true: false;
  }



  private changeLanguage(){
    this.isEnglish? this.localizationModel.changeLanguage("en"):this.localizationModel.changeLanguage("sp");
    this.isEnglish?this.localizationModel.showModalInfo("Language is changed to English", 1500):this.localizationModel.showModalInfo("El idioma se cambia a español", 1500)
  }
  private openHelpCenterPage(){
    let modal = this.modalCtrl.create(HelpCenterPage);
    modal.present();
  }

  public logout = () => {
    this._event.publish('user:logout');
  }
  public UIupdate = (isClient) => {
	if (isClient==true){
		this.isEnglish?this.localizationModel.showModalInfo("You are now using the app as a client", 2500):this.localizationModel.showModalInfo("Ahora estás usando la app en modo cliente", 1500)
	}
	else if (isClient==false){
		this.isEnglish?this.localizationModel.showModalInfo("You are now using the app as an agent", 2500):this.localizationModel.showModalInfo("Ahora estás usando la app en modo agente", 1500)
	}
    localStorage.setItem("isFirstEnterToHomeScreen", "true");
    setTimeout(()=>{
      this._event.publish('user:client', isClient);
    }, 300)
  }  
}
