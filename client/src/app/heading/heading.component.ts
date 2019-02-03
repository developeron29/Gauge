import { Component, OnInit, Inject } from '@angular/core';
import { WebsockServiceService } from '../service/websock-service.service';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.css']
})
export class HeadingComponent implements OnInit {

  private yaw: String;
  constructor(private websock: WebsockServiceService) { }

  ngOnInit() {
    let canvas = <HTMLCanvasElement> document.getElementById("heading");
    let ctx =  canvas.getContext("2d");
    let radius = canvas.height / 2;
    ctx.translate(radius, radius);
    radius = radius * 0.90;

    drawClock(0);

    function drawClock(rotate) {
      ctx.arc(0, 0, radius, 0, 2*Math.PI);
      ctx.fillStyle = "white";
      ctx.fill(); 

      drawMarkers(ctx, radius);
      drawDirection(ctx, radius, rotate);
    }

    function drawMarkers(ctx, radius) {
      ctx.beginPath();
      ctx.fillStyle = "black";
      ctx.font = radius*0.1 + "px arial";
      ctx.lineWidth = radius * 0.02;
      ctx.lineCap = "round";
      
      ctx.moveTo(radius* 0.9, 0);
      ctx.lineTo(radius*0.8, 0);
      ctx.fillText("E", radius*0.7, radius*0.035);
      
      ctx.moveTo(-radius*0.9, 0);
      ctx.lineTo(-radius*0.8, 0);
      ctx.fillText("W", -radius*0.77, radius*0.035);

      ctx.moveTo(0, -radius*0.9);
      ctx.lineTo(0, -radius*0.8);
      ctx.fillText("N", -radius*0.042, -radius*0.67);

      ctx.moveTo(0, radius*0.9);
      ctx.lineTo(0, radius*0.8);
      ctx.fillText("S", -radius*0.035, radius*0.75);

      ctx.stroke();
    }

    function drawDirection(ctx, radius, rotate) {

      ctx.beginPath();
      ctx.rotate(rotate);
      ctx.strokeStyle = "black";
      ctx.moveTo(-radius*0.04, radius*0.1);
      ctx.lineTo(radius*0.04, radius*0.1);
      ctx.lineTo(0, -radius*0.15);
      ctx.closePath(); // connect end to start
      ctx.stroke();
      ctx.fill();
      ctx.rotate(-rotate);
    }

    this.websock.subscribeYaw().subscribe((val) => {
      drawClock(val);
      this.yaw = val*180/Math.PI + " ˚";
    });
  }

}
