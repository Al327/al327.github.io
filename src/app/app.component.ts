import { Component } from '@angular/core';
import { Mensaje } from 'src/models/mensaje';
import { TelegramService } from 'src/services/telegram.service';
import {NgsRevealConfig} from 'ngx-scrollreveal';
import { Labels } from 'src/texts/labels';
import { ExpEnglish, ExpSpanish } from 'src/texts/jobs';
import { ProjectsEnglish, ProjectsSpanish } from 'src/texts/projects';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './app.component.scss'],
  providers: [TelegramService]
})
export class AppComponent {

  EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  valid_mail? = true
  title = 'portfolio';
  codeSign = '</>'

  displayDialog = false;
  
  submited = false

  dialogCompanie = ''
  dialogInterval = ''
  dialogDescription = ''

  expSpanish = ExpSpanish
  expEnglish = ExpEnglish

  projSpanish = ProjectsSpanish
  projEnglish = ProjectsEnglish
  
  isEnglishSelected = true

  languages = [
    {name: 'English', code: 'EN'},
    {name: 'Español', code: 'ES'}

  ];

  selectedLanguage = 'EN'
  year = (new Date()).getFullYear()

  mensaje:Mensaje = {}

  labels = Labels

  constructor(private telegramService: TelegramService, config: NgsRevealConfig) {
    config.duration = 1000;
    config.easing = 'cubic-bezier(0.645, 0.045, 0.355, 1)';
  }
  ngOnInit() {
  
  }

  displayDialogs(companie : any){
    this.dialogCompanie = companie.empresa
    this.dialogInterval = companie.interval
    this.dialogDescription = companie.description
    this.displayDialog = true
  }

  changeLanguage(){
    this.isEnglishSelected = this.selectedLanguage == 'EN';
  }

  submitMessage(){
    this.submited = true

    if(this.mensaje.nombre  && this.mensaje.correo && this.mensaje.correo.match(this.EMAIL_REGEX) && this.mensaje.descripcion){

      let response = this.telegramService.sendMessage(this.mensaje)
      this.mensaje = {}
      this.submited = false
    }

    this.valid_mail = this.mensaje.correo!.match(this.EMAIL_REGEX) != null
  }
    
}
