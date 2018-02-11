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
  measurements: Object[] = [];

  constructor(
    private route: ActivatedRoute,
    private arsService: ArsService
  ) { }

  ngOnInit() {
    this.route.paramMap.switchMap((params: ParamMap) => this.arsService.getPmDataLoad(params.get('id')))
      .subscribe(data => {
        this.spec = data;
        for (let k in this.spec.measurementMap) {
          this.spec.measurementMap[k].forEach(meas => {
            this.measurements.push(meas);
          });
        }
        this.ocis.sort((a: ObjectClassInfo, b: ObjectClassInfo) => {
          if (a.row < b.row) {
            return -1;
          } else if (a.row > b.row) {
            return 1;
          } else {
            return 0;
          }
        });
      });
  }

}
