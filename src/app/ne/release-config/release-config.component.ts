import { Component, OnInit } from '@angular/core';
import {ReleaseConfig} from './release-config';
import {Status} from '../../common/status/status';
import {ReleaseConfigService} from './release-config.service';
import {IfoService} from '../ifo/ifo.service';
import {InterfaceObject} from '../ifo/ifo';
import {Adaptation} from '../adaptation/adaptation';
import {AdaptationService} from '../adaptation/adaptation.service';
import {AlarmObject} from '../alarm-object/alarm-object';
import {AlarmObjectService} from '../alarm-object/alarm-object.service';
import {ObjectLoad} from "../object-load/object-load";
import {ObjectLoadService} from '../object-load/object-load.service';

@Component({
  selector: 'app-release-config',
  templateUrl: './release-config.component.html',
  styleUrls: ['./release-config.component.scss']
})
export class ReleaseConfigComponent implements OnInit {
  entities: ReleaseConfig[];
  isLoading = true;
  delEntities: ReleaseConfig[];
  editing = false;
  status: Status;
  submitting = true;
  deleting = false;
  isSelectAll = false;
  deleteDisabled = true;

  constructor(
    private dataService: ReleaseConfigService,
    private ifoService: IfoService,
    private adapService: AdaptationService,
    private aoService: AlarmObjectService,
    private olService: ObjectLoadService
  ) { }

  ngOnInit() {
    this.getEntities();
  }

  getEntities(): void {
    this.isLoading = true;
    this.dataService.getAll().finally(() => this.isLoading = false).subscribe(data => this.entities = data);
  }


  getEntityById(id: string): ReleaseConfig {
    let entity: ReleaseConfig;
    for (const tmp of this.entities) {
      if (tmp.id === id) {
        entity = tmp;
      }
    }
    return entity;
  }

  deleteEntity(id: string): void {
    this.deleting = true;
    this.delEntities = new Array(this.getEntityById(id));
  }

  submitDeletes(): void {
    this.submitting = true;
    const ids: string[] = new Array();
    this.delEntities.forEach(entity => {
      ids.push(entity.id);
    });

    let namestring = '';
    this.dataService.deleteAll(ids).subscribe(
      data => {
        this.delEntities.forEach(entity => {
          const index = this.entities.findIndex(obj => obj.id === entity.id);
          this.entities.splice(index, 1);
          namestring = namestring.concat(' [ ' + entity.neType + '-' + entity.neVersion + ' ] ');
        })
        this.status = {
          success: true,
          message: 'Release Configuration for' + namestring + 'is deleted successfully!'
        };
        this.submitting = false;
        this.resetSelectAll();
      },
      err => {
        this.status = {
          success: true,
          message: 'Release Configuration for' + namestring + 'is deleted failed!'
        };
        this.submitting = false;
      }
    );
  }

  deleteEntities(): void {
    this.deleting = true;
    const tempEntities: ReleaseConfig[] = new Array();
    this.entities.forEach(entity => {
      if (entity.select) {
        tempEntities.push(entity);
      }
    });
    this.delEntities = tempEntities;
  }

  selectAll(): void {
    this.isSelectAll = !this.isSelectAll;
    if (this.isSelectAll) {
      this.entities.forEach(entity => {
        entity.select = true;
      });
    } else {
      this.entities.forEach(entity => {
        entity.select = false;
      });
    }
    this.setDeleteDisabled();
  }

  setDeleteDisabled(): void {
    let isAnySelect = false;
    this.entities.forEach(entity => {
      if (entity.select) {
        isAnySelect = true;
      }
    });
    this.deleteDisabled = !isAnySelect;
  }

  select(entity: ReleaseConfig): void {
    entity.select = !entity.select;
    this.resetSelectAll();
    this.setDeleteDisabled();
  }

  resetSelectAll(): void {
    let isAllSelected = true;
    this.entities.forEach(entity => {
      if (!entity.select) {
        isAllSelected = false;
      }
    });
    this.isSelectAll = isAllSelected;
  }

  itfos: InterfaceObject[] = [];
  ifSets: InterfaceSet[] = [];
  onInterfaceShown(entity: ReleaseConfig): void {
    let exist = false;
    this.ifSets.forEach(ifSet => {
      if(ifSet.id == entity.id) {
        this.itfos = ifSet.interfaces;
        exist = true;
      }
    });
    if (!exist) {
      let tmpIfos: InterfaceObject[] = [];
      entity.interfaces.forEach(ifoId => {
        this.ifoService.get(ifoId).subscribe(
          ifo => {
            tmpIfos.push(ifo);
          });
      });
      let ifoSet = new InterfaceSet();
      ifoSet.id = entity.id;
      ifoSet.interfaces = tmpIfos;
      this.ifSets.push(ifoSet);
      this.itfos = tmpIfos;
    }
  }

  adaps: Adaptation[] = [];
  adapSets: AdaptationSet[] = [];
  onAdaptationShown(entity: ReleaseConfig): void {
    let exist = false;
    this.adapSets.forEach(adapSet => {
      if(adapSet.id == entity.id) {
        this.adaps = adapSet.adaptations;
        exist = true;
      }
    });
    if (!exist) {
      let tmpAdaps: Adaptation[] = [];
      entity.adaptations.forEach(adapId => {
        this.adapService.get(adapId).subscribe(
          adap => {
            tmpAdaps.push(adap);
          });
      });
      let adapSet = new AdaptationSet();
      adapSet.id = entity.id;
      adapSet.adaptations = tmpAdaps;
      this.adapSets.push(adapSet);
      this.adaps = tmpAdaps;
    }
  }

  aos: AlarmObject[] = [];
  aoSets: AlarmObjectSet[] = [];
  onAlarmObjectShown(entity: ReleaseConfig): void {
    let exist = false;
    this.aoSets.forEach(aoSet => {
      if(aoSet.id == entity.id) {
        this.aos = aoSet.aos;
        exist = true;
      }
    });
    if (!exist) {
      let tmpAos: AlarmObject[] = [];
      entity.alarmObjs.forEach(aoId => {
        this.aoService.get(aoId).subscribe(
          ao => {
            tmpAos.push(ao);
          });
      });
      let aoSet = new AlarmObjectSet();
      aoSet.id = entity.id;
      aoSet.aos = tmpAos;
      this.aoSets.push(aoSet);
      this.aos = tmpAos;
    }
  }

  ols: ObjectLoad[] = [];
  olSets: ObjectLoadSet[] = [];
  onObjectLoadShown(entity: ReleaseConfig): void {
    let exist = false;
    this.olSets.forEach(olSet => {
      if(olSet.id == entity.id) {
        this.ols = olSet.ols;
        exist = true;
      }
    });
    if (!exist) {
      let tmpOls: ObjectLoad[] = [];
      entity.objectLoads.forEach(olId => {
        this.olService.get(olId).subscribe(
          ol => {
            tmpOls.push(ol);
          });
      });
      let olSet = new ObjectLoadSet();
      olSet.id = entity.id;
      olSet.ols = tmpOls;
      this.olSets.push(olSet);
      this.ols = tmpOls;
    }
  }
}

class InterfaceSet {
  id: string;
  interfaces: InterfaceObject[];
}

class AdaptationSet {
  id: string;
  adaptations: Adaptation[];
}

class AlarmObjectSet {
  id: string;
  aos: AlarmObject[];
}

class ObjectLoadSet {
  id: string;
  ols: ObjectLoad[];
}
