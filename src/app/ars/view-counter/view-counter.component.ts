import { Component, OnInit } from '@angular/core';
import {CounterSpec} from './counter-spec';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {ArsService} from '../ars.service';
import {MeasCounter} from './meas-counter';

@Component({
  selector: 'app-view-counter',
  templateUrl: './view-counter.component.html',
  styleUrls: ['./view-counter.component.scss']
})
export class ViewCounterComponent implements OnInit {
  spec: CounterSpec;
  adaptations: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private arsService: ArsService
  ) { }

  ngOnInit() {
    this.route.paramMap.switchMap((params: ParamMap) => this.arsService.getCounterSpec(params.get('id')))
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

  getMeasCounters(adapId: string): MeasCounter[] {
    let measCounters: MeasCounter[] = [];
    let measurements = this.spec.measurementMap[adapId];

    measurements.forEach(meas => {
      meas.counters.forEach(counter => {
        measCounters.push(new MeasCounter(meas.name, counter));
      })
    });

    return measCounters;
  }
}
