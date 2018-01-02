import {Component, Input, OnInit} from '@angular/core';
import {Status} from './status';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  @Input() status: Status;

  constructor() { }

  ngOnInit() {
  }

}
