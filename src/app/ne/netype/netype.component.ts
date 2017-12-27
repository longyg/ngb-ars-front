import { Component, OnInit } from '@angular/core';
import {NeType} from './netype';
import {NetypeService} from './netype.service';

@Component({
  selector: 'app-netype',
  templateUrl: './netype.component.html',
  styleUrls: ['./netype.component.scss']
})
export class NetypeComponent implements OnInit {
  neTypes: NeType[];

  constructor(private neTypeService: NetypeService) { }

  ngOnInit() {
    this.neTypeService.getNeTypes().subscribe(list => this.neTypes = list);
  }

}
