import { Component, OnInit } from '@angular/core';
import {NeType} from '../../netype/netype';
import {NetypeService} from '../../netype/netype.service';
import {Form, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NeRelease} from '../../ne-release/ne-release';
import {NeReleaseService} from '../../ne-release/ne-release.service';
import {InterfaceObject} from '../../ifo/ifo';
import {IfoService} from '../../ifo/ifo.service';
import {Adaptation} from '../../adaptation/adaptation';
import {AdaptationService} from '../../adaptation/adaptation.service';
import {AlarmObject} from '../../alarm-object/alarm-object';
import {AlarmObjectService} from '../../alarm-object/alarm-object.service';
import {ObjectLoad} from '../../object-load/object-load';
import {ObjectLoadService} from '../../object-load/object-load.service';
import {NeSize, ParentHierarchy, ReleaseConfig} from '../release-config';
import {ReleaseConfigService} from '../release-config.service';
import {Status} from '../../../common/status/status';

@Component({
  selector: 'app-add-release-config',
  templateUrl: './add-release-config.component.html',
  styleUrls: ['./add-release-config.component.scss']
})
export class AddReleaseConfigComponent implements OnInit {
  submitting = true;
  status: Status;

  selectedStep = 1;
  neTypes: NeType[] = [];
  allNeReleases: NeRelease[] = [];
  neReleases: NeRelease[] = [];

  ifos: InterfaceObject[] = [];
  selectedIfos: InterfaceObject[] = [];

  allAdaps: Adaptation[] = [];
  adaps: Adaptation[] = [];
  adapIds: string[] = [];
  adapRels: string[] = [];
  selectedAdaps: Adaptation[] = [];

  aos: AlarmObject[] = [];
  selectedAos: AlarmObject[] = [];

  ols: ObjectLoad[] = [];
  selectedOls: ObjectLoad[] = [];

  pos: ParentHierarchy[] = [];

  neTypeRelForm: FormGroup;
  interfaceForm: FormGroup;
  adaptationForm: FormGroup;
  alarmForm: FormGroup;
  olForm: FormGroup;
  poForm: FormGroup;
  neSizeForm: FormGroup;

  constructor(
    private neTypeService: NetypeService,
    private neRelService: NeReleaseService,
    private ifoService: IfoService,
    private adapService: AdaptationService,
    private aoService: AlarmObjectService,
    private olService: ObjectLoadService,
    private relConfigService: ReleaseConfigService,
    private fb: FormBuilder
  ) {}

  steps = [
    {step: 1, title: 'Select NE Type and Release'},
    {step: 2, title: 'Select Interface Objects'},
    {step: 3, title: 'Select Adaptations'},
    {step: 4, title: 'Select Alarm Objects'},
    {step: 5, title: 'Select Object Loads'},
    {step: 6, title: 'Add Parent Objects'},
    {step: 7, title: 'Set NE Size'}
  ];

  ngOnInit() {
    this.getNeTypes();
    this.getAllNeReleases();
    this.getInterfaces();
    this.getAllAdaptations();
    this.getAlarmObjects();
    this.getObjectLoads();

    this.initNeTypeRelForm();
    this.initInterfaceForm();
    this.initAdaptationForm();
    this.initAlarmForm();
    this.initOlForm();
    this.initPoForm();
    this.initNeSizeForm();
  }

  initNeTypeRelForm(): void {
    this.neTypeRelForm = this.fb.group({
      neType: ['', Validators.required],
      neRelease: ['', Validators.required]
    });
  }

  initInterfaceForm(): void {
    this.interfaceForm = this.fb.group({
      ifo: ['', Validators.required]
    });
  }

  initAdaptationForm(): void {
    this.adaptationForm = this.fb.group({
      adaptationId: ['', Validators.required],
      adaptationRelease: ['', Validators.required]
    });
  }

  initAlarmForm(): void {
    this.alarmForm = this.fb.group({
      ao: ['', Validators.required]
    });
  }

  initOlForm(): void {
    this.olForm = this.fb.group({
      ol: ['', Validators.required]
    });
  }

  initPoForm(): void {
    this.poForm = this.fb.group({
      adaptationId: ['', Validators.required],
      hierarchy: ['', Validators.required]
    });
  }

  initNeSizeForm(): void {
    this.neSizeForm = this.fb.group({
      maxNePerNetwork: ['', Validators.required],
      avgNePerNetwork: ['', Validators.required]
    });
  }

  selectNeType(): void {
    let selectedType = this.type.value;
    this.neReleases = [];
    this.allNeReleases.forEach(neRelease => {
      if (neRelease.type == selectedType) {
        this.neReleases.push(neRelease);
      }
    });

    this.getAdapsByNeType(selectedType);
  }

  selectInterface(): void {
    let selectedIfo = this.ifo.value;
    let isAdded = false;
    this.selectedIfos.forEach(ifo => {
      if (ifo.name == selectedIfo) {
        isAdded = true;
      }
    });
    if (!isAdded) {
      const ifo = this.ifos.find(obj => obj.name === this.ifo.value);
      this.selectedIfos.push(ifo);
      const index = this.ifos.findIndex(obj => obj.name === this.ifo.value);
      this.ifos.splice(index, 1);
    }
  }

  unselectInterface(ifo: InterfaceObject): void {
    const index = this.selectedIfos.findIndex(obj => obj.name === ifo.name);
    this.selectedIfos.splice(index, 1);
    this.ifos.push(ifo);
  }

  selectAdaptationId(): void {
    this.adapRels = [];
    let selectedAdapId = this.adapId.value;
    this.adaps.forEach(adap => {
      if (adap.adaptationId == selectedAdapId) {
        let isAdded = false;
        this.adapRels.forEach(adapRel => {
          if (adapRel == adap.adaptationRelease) {
            isAdded = true;
          }
        })
        if (!isAdded) {
          this.adapRels.push(adap.adaptationRelease);
        }
      }
    });
  }

  selectAdaptation(): void {
    let selectedAdapId = this.adapId.value;
    let selectedAdapRel = this.adapRel.value;
    let adap = this.adaps.find(obj => obj.adaptationId === selectedAdapId && obj.adaptationRelease === selectedAdapRel);

    let isAdded = false;
    this.selectedAdaps.forEach(obj => {
      if (obj.adaptationId == selectedAdapId && obj.adaptationRelease == selectedAdapRel) {
        isAdded = true;
      }
    });
    if (!isAdded) {
      this.selectedAdaps.push(adap);
    }
  }

  unselectAdaptation(adap: Adaptation): void {
    const index = this.selectedAdaps.findIndex(obj => obj.adaptationId === adap.adaptationId && obj.adaptationRelease === adap.adaptationRelease);
    this.selectedAdaps.splice(index, 1);
  }

  selectAlarmObject(): void {
    let selectedAo = this.ao.value;
    let isAdded = false;
    this.selectedAos.forEach(ao => {
      if (ao.name == selectedAo) {
        isAdded = true;
      }
    });
    if (!isAdded) {
      const ao = this.aos.find(obj => obj.name === this.ao.value);
      this.selectedAos.push(ao);
      const index = this.aos.findIndex(obj => obj.name === this.ao.value);
      this.aos.splice(index, 1);
    }
  }

  unselectAlarmObject(ao: AlarmObject): void {
    const index = this.selectedAos.findIndex(obj => obj.name === ao.name);
    this.selectedAos.splice(index, 1);
    this.aos.push(ao);
  }

  selectObjectLoad(): void {
    let selectedOl = this.ol.value;
    let isAdded = false;
    this.selectedOls.forEach(ol => {
      if (ol.id == selectedOl) {
        isAdded = true;
      }
    });
    if (!isAdded) {
      const ol = this.ols.find(obj => obj.id === this.ol.value);
      this.selectedOls.push(ol);
      const index = this.ols.findIndex(obj => obj.id === this.ol.value);
      this.ols.splice(index, 1);
    }
  }

  unselectObjectLoad(ol: ObjectLoad): void {
    const index = this.selectedOls.findIndex(obj => obj.id === ol.id);
    this.selectedOls.splice(index, 1);
    this.ols.push(ol);
  }

  addParentObject(): void {
    let adapId = this.pAdapId.value;
    let hierarchy = this.hierarchy.value;

    let isAdded = false;
    this.pos.forEach(po => {
      if (po.adaptationId == adapId) {
        isAdded = true;
      }
    });
    if (!isAdded) {
      let po = new ParentHierarchy();
      po.adaptationId = adapId;
      po.hierarchy = hierarchy;
      this.pos.push(po);
    }
  }

  removeParentObject(po: ParentHierarchy): void {
    const index = this.pos.findIndex(obj => obj.adaptationId == po.adaptationId);
    this.pos.splice(index, 1);
  }

  getNeTypes(): void {
    this.neTypeService.getAll().subscribe(list => this.neTypes = list);
  }

  getAllNeReleases(): void {
    this.neRelService.getAll().subscribe(list => this.allNeReleases = list);
  }

  getInterfaces(): void {
    this.ifoService.getAll().subscribe(list => this.ifos = list);
  }

  getAllAdaptations(): void {
    this.adapService.getAll().subscribe(list => this.allAdaps = list);
  }

  getAdapsByNeType(neType: string): void {
    this.adaps = [];
    this.adapIds = [];
    this.adapRels = [];
    this.allAdaps.forEach(adap => {
      if (adap.neType == neType) {
        this.adaps.push(adap);

        let isAdded = false;
        this.adapIds.forEach(adapId => {
          if (adapId == adap.adaptationId) {
            isAdded = true;
          }
        });
        if (!isAdded) {
          this.adapIds.push(adap.adaptationId);
        }
      }
    })
  }

  getAlarmObjects(): void {
    this.aoService.getAll().subscribe(list => this.aos = list);
  }

  getObjectLoads(): void {
    this.olService.getAll().subscribe(list => this.ols = list);
  }

  goLastStep(): void {
    if (this.selectedStep > 1) {
      this.selectedStep = this.selectedStep - 1;
    }
  }

  goNextStep(): void {
    if (this.selectedStep < this.steps.length) {
      this.selectedStep = this.selectedStep + 1;
    }
  }

  save(): void {
    this.submitting = true;
    let relConfig = new ReleaseConfig();
    relConfig.neType = this.type.value;
    relConfig.neVersion = this.neRel.value;

    let interfaces: string[] = [];
    this.selectedIfos.forEach(ifo => {
      interfaces.push(ifo.id);
    });
    relConfig.interfaces = interfaces;

    let adaptations: string[] = [];
    this.selectedAdaps.forEach(adap => {
      adaptations.push(adap.id);
    });
    relConfig.adaptations = adaptations;

    let alarmObjects: string[] = [];
    this.selectedAos.forEach(ao => {
      alarmObjects.push(ao.id);
    });
    relConfig.alarmObjs = alarmObjects;

    let objectLoads: string[] = [];
    this.selectedOls.forEach(ol => {
      objectLoads.push(ol.id);
    });
    relConfig.objectLoads = objectLoads;

    relConfig.parentHierarchies = this.pos;

    let neSize = new NeSize();
    neSize.maxNePerNetwork = this.maxNePerNetwork.value;
    neSize.avgNePerNetwork = this.avgNePerNetwork.value;
    relConfig.neSize = neSize;

    this.relConfigService.add(relConfig).subscribe(
      savedEntity => {
        this.status = {
          success: true,
          message: 'Release Configuration is saved successfully!'
        };
        this.submitting = false;
      },
      err => {
        this.status = {
          success: false,
          message: 'Release Configuration is saved failed!'
        };
        this.submitting = false;
      });
  }

  get type() {return this.neTypeRelForm.get('neType')}
  get neRel() {return this.neTypeRelForm.get('neRelease')}

  get ifo() {return this.interfaceForm.get('ifo')}

  get adapId() {return this.adaptationForm.get('adaptationId')}
  get adapRel() {return this.adaptationForm.get('adaptationRelease')}

  get ao() {return this.alarmForm.get('ao')}

  get ol() {return this.olForm.get('ol')}

  get pAdapId() {return this.poForm.get('adaptationId')}
  get hierarchy() {return this.poForm.get('hierarchy')}

  get maxNePerNetwork() {return this.neSizeForm.get('maxNePerNetwork')}
  get avgNePerNetwork() {return this.neSizeForm.get('avgNePerNetwork')}
}
