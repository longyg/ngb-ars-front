import {Component, OnInit} from '@angular/core';
import {ARS} from './ars';
import {ArsService} from './ars.service';

@Component({
  selector: 'app-ars',
  templateUrl: './ars.component.html'
})
export class ArsComponent implements OnInit {
  arss: ARS[];

  constructor(private arsService: ArsService) {}

  ngOnInit(): void {
    this.arsService.list().subscribe(list => this.arss = list);
  }
}
