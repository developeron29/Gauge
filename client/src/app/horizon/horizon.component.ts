import { Component, OnInit } from '@angular/core';
import { WebsockServiceService } from '../service/websock-service.service';
import { transformAll } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-horizon',
  templateUrl: './horizon.component.html',
  styleUrls: ['./horizon.component.css']
})
export class HorizonComponent implements OnInit {

  private pitch: String;
  private roll: String;
  constructor(private websock: WebsockServiceService) {
 
   }

  ngOnInit() {
    const canvas = <HTMLCanvasElement> document.getElementById("horizon");
    const ctx = canvas.getContext("2d");
    let radius = canvas.height/2;
    ctx.translate(radius, radius);
    radius = radius * 0.90;

    drawClock(ctx, radius, 0, 0);

    function drawClock(ctx, radius, rotate, translate) {
      drawFace(ctx, radius);
      drawMarkers(ctx, radius, rotate, translate);
    }

    function drawFace(ctx, radius){

      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, 2 * Math.PI);
      ctx.fillStyle = "white";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.02, 0, 2 * Math.PI);
      ctx.fillStyle = '#333';
      ctx.fill();

      ctx.beginPath();
      ctx.lineWidth = radius * 0.02;
      ctx.lineCap = "round";
      ctx.moveTo(radius * 0.1, 0);
      ctx.lineTo(radius * 0.6, 0);
      ctx.moveTo(-radius * 0.1, 0);
      ctx.lineTo(-radius * 0.6, 0);
      ctx.stroke();
    }

    function drawMarkers(ctx, radius, rotate, translate) {
      ctx.beginPath();

      ctx.lineWidth = radius * 0.01;
      ctx.lineCap = "round";
      //rotate
      ctx.rotate(rotate); 
      ctx.translate(0, translate);
      // below
      ctx.moveTo(-radius*0.2, radius*0.1);
      ctx.lineTo(radius*0.2, radius*0.1);
      ctx.moveTo(-radius*0.4, radius*0.2);
      ctx.lineTo(radius*0.4, radius*0.2);
      ctx.fillText(10, -radius*0.5, radius*0.2);
      ctx.fillText(10, radius*0.45, radius*0.2);
      ctx.moveTo(-radius*0.2, radius*0.3);
      ctx.lineTo(radius*0.2, radius*0.3);
      ctx.moveTo(-radius*0.4, radius*0.4);
      ctx.lineTo(radius*0.4, radius*0.4);
      ctx.fillText(20, -radius*0.5, radius*0.4);
      ctx.fillText(20, radius*0.45, radius*0.4);

      //above
      ctx.moveTo(-radius*0.2, -radius*0.1);
      ctx.lineTo(radius*0.2, -radius*0.1);
      ctx.moveTo(-radius*0.4, -radius*0.2);
      ctx.lineTo(radius*0.4, -radius*0.2);
      ctx.fillText(10, -radius*0.5, -radius*0.2);
      ctx.fillText(10, radius*0.45, -radius*0.2);
      ctx.moveTo(-radius*0.2, -radius*0.3);
      ctx.lineTo(radius*0.2, -radius*0.3);
      ctx.moveTo(-radius*0.4, -radius*0.4);
      ctx.lineTo(radius*0.4, -radius*0.4);
      ctx.fillText(20, -radius*0.5, -radius*0.4);
      ctx.fillText(20, radius*0.45, -radius*0.4);

      ctx.stroke();
      ctx.translate(0, -translate);
      ctx.rotate(-rotate); 


    }

    this.websock.subscribeRollnPitches().subscribe((val) => {
      drawClock(ctx, radius, val.roll, radius*((val.pitch*180/Math.PI)*0.02));
      this.pitch = val.pitch * 180/Math.PI + " ˚";
      this.roll = val.roll * 180/Math.PI + " ˚";
    });
    }


  }

