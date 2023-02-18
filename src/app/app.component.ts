import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MyStore';
  opValue:number = 0;

  displayComponent(op:number) {
    this.opValue = op;
  }
}
