import {Component, OnInit} from '@angular/core';
import {ARS} from './ars';
import {ArsService} from './ars.service';

@Component({
  selector: 'app-ars',
  templateUrl: './ars.component.html'
})
export class ArsComponent implements OnInit {
  arss: ARS[];

  ngOnInit(): void {
    this.arss = [
      {id: 'sdfsdf', neType: 'CSCF', neVersion: '18.0', objectModel: 'df', pmDataload: 'df', counter: 'fdf', alarm: 'df'}
    ];
  }
}
