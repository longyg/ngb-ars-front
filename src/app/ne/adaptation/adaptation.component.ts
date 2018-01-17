import { Component, OnInit } from '@angular/core';
import {Adaptation} from './adaptation';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Status} from '../../common/status/status';
import {NeType} from '../netype/netype';
import {AdaptationService} from './adaptation.service';
import {NetypeService} from '../netype/netype.service';

@Component({
  selector: 'app-adaptation',
  templateUrl: './adaptation.component.html',
  styleUrls: ['./adaptation.component.scss']
})
export class AdaptationComponent implements OnInit {
  entities: Adaptation[];
  isLoading = true;
  delEntities: Adaptation[];
  editing = false;
  addForm: FormGroup;
  editForm: FormGroup;
  submitting = true;
  status: Status;
  editId: string;
  deleting = false;
  isSelectAll = false;
  deleteDisabled = true;
  neTypes: NeType[];

  constructor(
    private dataService: AdaptationService,
    private neTypeService: NetypeService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.getEntities();
    this.getNeTypes();
    this.addForm = this.createEmptyForm();
    this.editForm = this.createEmptyForm();
  }

  getEntities(): void {
    this.isLoading = true;
    this.dataService.getAll().finally(() => this.isLoading = false).subscribe(data => this.entities = data);
  }

  getNeTypes() {
    this.neTypeService.getAll().subscribe(list => this.neTypes = list);
  }

  createEmptyForm(): FormGroup {
    return this.fb.group({
      adaptationId: '',
      adaptationRelease: '',
      neType: '',
      sourcePath: ''
    });
  }

  showAddForm(): void {
    this.editing = false;
    this.addForm.reset();
    this.addForm = this.fb.group({
      adaptationId: ['', Validators.required],
      adaptationRelease: ['', Validators.required],
      neType: ['', Validators.required],
      sourcePath: ['', Validators.required]
    });
  }

  showEditForm(id: string): void {
    this.editId = id;
    this.editing = true;
    this.editForm.reset();

    const entity = this.getEntityById(id);

    if (null != entity) {
      this.editForm = this.fb.group({
        adaptationId: [entity.adaptationId, Validators.required],
        adaptationRelease: [entity.adaptationRelease, Validators.required],
        neType: [entity.neType, Validators.required],
        sourcePath: [entity.sourcePath, Validators.required]
      });
    }
  }

  getEntityById(id: string): Adaptation {
    let entity: Adaptation;
    for (const tmp of this.entities) {
      if (tmp.id === id) {
        entity = tmp;
      }
    }
    return entity;
  }

  onAddSubmit(): void {
    this.submitting = true;
    const entity = new Adaptation();
    entity.adaptationId = this.aAdaptationId.value;
    entity.adaptationRelease = this.aAdaptationRelease.value;
    entity.neType = this.aNeType.value;
    entity.sourcePath = this.aSourcePath.value;

    this.dataService.add(entity)
      .subscribe(
        savedEntity => {
          this.entities.push(savedEntity);
          this.status = {
            success: true,
            message: 'Adaptation "' + entity.adaptationId + '-' + entity.adaptationRelease + '" is added successfully!'
          };
          this.submitting = false;
          this.resetSelectAll();
        },
        err => {
          this.status = {
            success: false,
            message: 'Adaptation "' + entity.adaptationId + '-' + entity.adaptationRelease + '" is added failed!'
          };
          this.submitting = false;
        }
      );
  }

  onEditSubmit(): void {
    this.submitting = true;
    const entity = new Adaptation();
    entity.id = this.editId;
    entity.adaptationId = this.eAdaptationId.value;
    entity.adaptationRelease = this.eAdaptationRelease.value;
    entity.neType = this.eNeType.value;
    entity.sourcePath = this.eSourcePath.value;

    this.dataService.update(entity)
      .subscribe(
        (updatedEntity: Adaptation) => {
          const existingEntity = this.entities.find(obj => obj.id === updatedEntity.id);
          Object.assign(existingEntity, updatedEntity);
          this.status = {
            success: true,
            message: 'Adaptation "' + entity.adaptationId + '-' + entity.adaptationRelease + '" is updated successfully!'
          };
          this.submitting = false;
        },
        err => {
          this.status = {
            success: false,
            message: 'Adaptation "' + entity.adaptationId + '-' + entity.adaptationRelease + '" is updated failed!'
          };
          this.submitting = false;
        }
      );
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
          namestring = namestring.concat(' [ ' + entity.adaptationId + '-' + entity.adaptationRelease + ' ] ');
        })
        this.status = {
          success: true,
          message: 'Adaptation' + namestring + 'is deleted successfully!'
        };
        this.submitting = false;
        this.resetSelectAll();
      },
      err => {
        this.status = {
          success: true,
          message: 'Adaptation' + namestring + 'is deleted failed!'
        };
        this.submitting = false;
      }
    );
  }

  deleteEntities(): void {
    this.deleting = true;
    const tempEntities: Adaptation[] = new Array();
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

  select(entity: Adaptation): void {
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

  get aAdaptationId() { return this.addForm.get('adaptationId'); }
  get aAdaptationRelease() { return this.addForm.get('adaptationRelease'); }
  get aNeType() { return this.addForm.get('neType'); }
  get aSourcePath() { return this.addForm.get('sourcePath'); }

  get eAdaptationId() { return this.editForm.get('adaptationId'); }
  get eAdaptationRelease() { return this.editForm.get('adaptationRelease'); }
  get eNeType() { return this.editForm.get('neType'); }
  get eSourcePath() { return this.editForm.get('sourcePath'); }
}
