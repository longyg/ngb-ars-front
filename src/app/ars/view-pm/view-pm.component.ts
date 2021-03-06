import { Component, OnInit } from '@angular/core';
import {PmDataLoadSpec} from './pm-spec';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {ArsService} from '../ars.service';

@Component({
  selector: 'app-view-pm',
  templateUrl: './view-pm.component.html',
  styleUrls: ['./view-pm.component.scss']
})
export class ViewPmComponent implements OnInit {
  spec: PmDataLoadSpec;
  adaptations: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private arsService: ArsService
  ) { }

  ngOnInit() {
    this.route.paramMap.switchMap((params: ParamMap) => this.arsService.getPmDataLoadSpec(params.get('id')))
      .subscribe(data => {
        this.spec = data;
        for (let adapId in this.spec.measurementMap) {
          this.adaptations.push(adapId);
        }
      });
  }

  replaceUnderscore(adapId: string): string {
    let tmp = '';
    if (adapId.indexOf('_') > -1) {
      tmp = adapId.replace('_', '.');
      return this.replaceUnderscore(tmp);
    } else {
      return adapId;
    }
  }

  getMeasurements(adapId: string): Object[] {
    return this.spec.measurementMap[adapId];
  }
}
