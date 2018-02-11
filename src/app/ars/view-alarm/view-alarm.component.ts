import { Component, OnInit } from '@angular/core';
import {AlarmSpec} from './alarm-spec';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {ArsService} from '../ars.service';

@Component({
  selector: 'app-view-alarm',
  templateUrl: './view-alarm.component.html',
  styleUrls: ['./view-alarm.component.scss']
})
export class ViewAlarmComponent implements OnInit {
  spec: AlarmSpec;
  adaptations: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private arsService: ArsService
  ) { }

  ngOnInit() {
    this.route.paramMap.switchMap((params: ParamMap) => this.arsService.getAlarmSpec(params.get('id')))
      .subscribe(data => {
        this.spec = data;
        for (let adapId in this.spec.alarmMap) {
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

  getAlarms(adapId: string): Object[] {
    return this.spec.alarmMap[adapId];
  }

}
