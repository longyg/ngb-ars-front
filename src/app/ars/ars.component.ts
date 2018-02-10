import {Component, OnInit} from '@angular/core';
import {ARS} from './ars';
import {ArsService} from './ars.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Status} from '../common/status/status';
import {NeType} from '../ne/netype/netype';
import {NetypeService} from '../ne/netype/netype.service';
import {NeReleaseService} from '../ne/ne-release/ne-release.service';
import {NeRelease} from '../ne/ne-release/ne-release';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ars',
  templateUrl: './ars.component.html'
})
export class ArsComponent implements OnInit {
  entities: ARS[];
  isLoading = true;
  delEntities: ARS[];
  editing = false;
  createArsForm: FormGroup;
  editForm: FormGroup;
  submitting = true;
  status: Status;
  editId: string;
  deleting = false;
  isSelectAll = false;
  deleteDisabled = true;
  neTypes: NeType[];
  allNeReleases: NeRelease[] = [];
  neReleases: NeRelease[] = [];
  lastNeReleases: NeRelease[] = [];
  olderNeReleases: NeRelease[] = [];
  selectedOlderNeReleases: NeRelease[] = [];

  constructor(
    private dataService: ArsService,
    private neTypeService: NetypeService,
    private neReleaseService: NeReleaseService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.getEntities();
    this.getNeTypes();
    this.getAllNeReleases();

    this.initCreateArsForm();
  }

  viewOm(id: string): void {
    this.router.navigate(['/view-om', id]);
  }

  initCreateArsForm(): void {
    this.createArsForm = this.fb.group({
      neType: '',
      neRelease: '',
      lastNeRelease: '',
      olderNeRelease: ''
    });
  }

  getEntities(): void {
    this.isLoading = true;
    this.dataService.getAll().finally(() => this.isLoading = false).subscribe(data => this.entities = data);
  }

  getNeTypes() {
    this.neTypeService.getAll().subscribe(list => this.neTypes = list);
  }

  getAllNeReleases() {
    this.neReleaseService.getAll().subscribe(list => this.allNeReleases = list);
  }

  showCreateArsForm(): void {
    this.neReleases = [];
    this.lastNeReleases = [];
    this.olderNeReleases = [];
    this.selectedOlderNeReleases = [];
    this.createArsForm = this.fb.group({
      neType: ['', Validators.required],
      neRelease: ['', Validators.required],
      lastNeRelease: [''],
      olderNeRelease: ['']
    });
  }

  selectNeType(): void {
    this.neReleases = [];
    this.lastNeReleases = [];
    this.olderNeReleases = [];
    this.selectedOlderNeReleases = [];
    this.neRelease.setValue(null);
    this.lastNeRelease.setValue(null);
    this.olderNeRelease.setValue(null);
    let selectedType = this.neType.value;
    this.allNeReleases.forEach(neRelease => {
      if (neRelease.type == selectedType) {
        this.neReleases.push(neRelease);
      }
    });
  }

  selectNeRelease(): void {
    this.lastNeReleases = [];
    this.olderNeReleases = [];
    this.selectedOlderNeReleases = [];
    this.lastNeRelease.setValue(null);
    this.olderNeRelease.setValue(null);
    let selectedNeRelease = this.neRelease.value;
    this.neReleases.forEach(neRelease => {
      if (neRelease.version != selectedNeRelease) {
        this.lastNeReleases.push(neRelease);
      }
    });
  }

  selectLastNeRelease(): void {
    this.olderNeReleases = [];
    this.selectedOlderNeReleases = [];
    this.olderNeRelease.setValue(null);
    let selectedNeRelease = this.neRelease.value;
    let selectedLastNeRelease = this.lastNeRelease.value;
    this.neReleases.forEach(neRelease => {
      if (neRelease.version != selectedNeRelease && neRelease.version != selectedLastNeRelease) {
        this.olderNeReleases.push(neRelease);
      }
    });
  }

  selectOlderNeRelease(): void {
    let selectedOlderNeRelease = this.olderNeRelease.value;
    let isAdded = false;
    this.selectedOlderNeReleases.forEach(neRel => {
      if (neRel.version == selectedOlderNeRelease) {
        isAdded = true;
      }
    });
    if (!isAdded) {
      let neRel = this.olderNeReleases.find(obj => obj.version == selectedOlderNeRelease);
      this.selectedOlderNeReleases.push(neRel);
      let index = this.olderNeReleases.findIndex(obj => obj.version == selectedOlderNeRelease);
      this.olderNeReleases.splice(index, 1);
    }
  }

  unselectOlderNeRelease(neRel: NeRelease): void {
    const index = this.selectedOlderNeReleases.findIndex(obj => obj.version === neRel.version);
    this.selectedOlderNeReleases.splice(index, 1);
    this.olderNeReleases.push(neRel);
  }

  generateARS(): void {
    this.submitting = true;
    let entity = new ARS();
    entity.neType = this.neType.value;
    entity.neVersion = this.neRelease.value;
    entity.lastNeVersion = this.lastNeRelease.value;
    let tmpVersions: string[] = [];
    this.selectedOlderNeReleases.forEach(neRel => {
      tmpVersions.push(neRel.version);
    })
    entity.olderNeVersions = tmpVersions;

    let isGenerated = false;
    this.entities.forEach(ars => {
      if (ars.neType == entity.neType && ars.neVersion == entity.neVersion) {
        isGenerated = true;
      }
    });
    if (isGenerated) {
      this.status = {
        success: false,
        message: 'ARS of "' + entity.neType + '-' + entity.neVersion + '" is already generated!'
      };
      this.submitting = false;
      return;
    }

    this.dataService.generate(entity).subscribe(
      savedEntity => {
        this.entities.push(savedEntity);
        this.status = {
          success: true,
          message: 'ARS of "' + entity.neType + '-' + entity.neVersion + '" is generated successfully!'
        };
        this.submitting = false;
        this.resetSelectAll();
      },
      err => {
        this.status = {
          success: false,
          message: 'ARS of "' + entity.neType + '-' + entity.neVersion + '" is generated failed!'
        };
        this.submitting = false;
      }
    );
  }

  getEntityById(id: string): ARS {
    let entity: ARS;
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
          message: 'ARS of ' + namestring + 'is deleted successfully!'
        };
        this.submitting = false;
        this.resetSelectAll();
      },
      err => {
        this.status = {
          success: true,
          message: 'ARS of ' + namestring + 'is deleted failed!'
        };
        this.submitting = false;
      }
    );
  }

  deleteEntities(): void {
    this.deleting = true;
    const tempEntities: ARS[] = new Array();
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

  select(entity: ARS): void {
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

  get neType() {return this.createArsForm.get('neType')}
  get neRelease() {return this.createArsForm.get('neRelease')}
  get lastNeRelease() {return this.createArsForm.get('lastNeRelease')}
  get olderNeRelease() {return this.createArsForm.get('olderNeRelease')}
}
