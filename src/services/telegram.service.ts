import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mensaje } from 'src/models/mensaje';

@Injectable()
export class TelegramService {
  URLBOT =
    'https://api.telegram.org/bot5450951850:AAExE5D4v6RsLMLUVfpEvspCPXkYRmtuRdg/sendMessage';
  CHATID = '1321809304';
  constructor(private http: HttpClient) {}

  sendMessage(message: Mensaje) {
    let msj_text = `Han escrito en tu portafolio 👀‼️ \n\n*Ha escrito*: ${message.nombre}\n*Correo:* ${message.correo}\n\n*Mensaje:* ${message.descripcion}`;

    return this.http
      .post(
        'https://api.telegram.org/bot5450951850:AAExE5D4v6RsLMLUVfpEvspCPXkYRmtuRdg/sendMessage',
        { chat_id: this.CHATID, text: msj_text, parse_mode : "markdown" }
      )
      .toPromise()
      .then((res: any) => {
        return res
      })
      .catch((res) => {
        return res
      });
  }
}
