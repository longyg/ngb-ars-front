import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {ArsService} from '../ars.service';
import 'rxjs/add/operator/switchMap';
import {ObjectModelSpec} from './om-spec';
import {ObjectClassInfo} from './object-class-info';

@Component({
  selector: 'app-view-om',
  templateUrl: './view-om.component.html',
  styleUrls: ['./view-om.component.scss']
})
export class ViewOmComponent implements OnInit {
  spec: ObjectModelSpec;
  ocis: Object[] = [];

  constructor(
    private route: ActivatedRoute,
    private arsService: ArsService
  ) { }


  ngOnInit(): void {
    this.route.paramMap.switchMap((params: ParamMap) => this.arsService.getObjectModelSpec(params.get('id')))
      .subscribe(data => {
        this.spec = data;
        for (let adapId in this.spec.ociMap) {
          this.spec.ociMap[adapId].forEach(oci => {
            this.ocis.push(oci);
          })
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

  array(len: number): number[] {
    let arr: number[] = [];
    for (let i = 0; i < len; i++) {
      arr.push(i);
    }
    return arr;
  }
}
