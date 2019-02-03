import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsockServiceService {

  public RollnPitch: Subject<any> = new Subject();
  public Yaw: Subject<any> = new Subject();

  /*
  * Websocket connection
  */
  private ws = new WebSocket('ws://' + window.document.location.host.replace(/:.*/, '') + ':8080');
  constructor() { 
      this.ws.onmessage = (event) => {
        this.RollnPitch.next({'roll': JSON.parse(event.data).roll, 'pitch':JSON.parse(event.data).pitch});
        this.Yaw.next(JSON.parse(event.data).yaw);
      }
    }

    /*
    * Roll and Pitch data updates
    */
   public subscribeRollnPitches() {
     return this.RollnPitch;
   }

   /*
   * Yaw data updates
   */
  public subscribeYaw() {
    return this.Yaw;
  }
}
