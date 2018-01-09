import { Component, OnInit } from '@angular/core';
import {InterfaceObject} from './ifo';
import {IfoService} from './ifo.service';
import 'rxjs/add/operator/finally';

@Component({
  selector: 'app-ifo',
  templateUrl: './ifo.component.html',
  styleUrls: ['./ifo.component.scss']
})
export class IfoComponent implements OnInit {
  ifos: InterfaceObject[];
  isLoading = false;
  delIfos: InterfaceObject[];

  constructor(private ifoService: IfoService) { }

  ngOnInit() {
    this.getIfos();
  }

  getIfos(): void {
    this.isLoading = true;
    this.ifoService.getAll().finally(() => this.isLoading = false).subscribe(data => this.ifos = data);
  }
}
