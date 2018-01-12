import { Component, OnInit } from '@angular/core';
import {NeRelease} from './ne-release';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Status} from '../../common/status/status';
import {NeReleaseService} from './ne-release.service';
import {NetypeService} from '../netype/netype.service';

@Component({
  selector: 'app-ne-release',
  templateUrl: './ne-release.component.html',
  styleUrls: ['./ne-release.component.scss']
})
export class NeReleaseComponent implements OnInit {
  entities: NeRelease[];
  isLoading = true;
  delEntities: NeRelease[];
  editing = false;
  addForm: FormGroup;
  editForm: FormGroup;
  submitting = true;
  status: Status;
  editId: string;
  deleting = false;
  isSelectAll = false;
  deleteDisabled = true;

  constructor(
    private dataService: NeReleaseService,
    private neTypeService: NetypeService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.getEntities();
    this.addForm = this.createEmptyForm();
    this.editForm = this.createEmptyForm();
  }

  getEntities(): void {
    this.isLoading = true;
    this.dataService.getAll().finally(() => this.isLoading = false).subscribe(data => this.entities = data);
  }

  createEmptyForm(): FormGroup {
    return this.fb.group({
      type: '',
      version: '',
      remarks: ''
    });
  }

  showAddForm(): void {
    this.editing = false;
    this.addForm.reset();
    this.addForm = this.fb.group({
      type: ['', Validators.required],
      version: ['', Validators.required],
      remarks: ['']
    });
  }

  showEditForm(id: string): void {
    this.editId = id;
    this.editing = true;
    this.editForm.reset();

    const entity = this.getEntityById(id);

    if (null != entity) {
      this.editForm = this.fb.group({
        type: [entity.type, Validators.required],
        version: [entity.version, Validators.required],
        remarks: [entity.remarks]
      });
    }
  }

  getEntityById(id: string): NeRelease {
    let entity: NeRelease;
    for (const tmp of this.entities) {
      if (tmp.id === id) {
        entity = tmp;
      }
    }
    return entity;
  }

  onAddSubmit(): void {
    this.submitting = true;
    const entity = new NeRelease();
    entity.type = this.aType.value;
    entity.version = this.aVersion.value;
    entity.remarks = this.aRemarks.value;

    this.dataService.add(entity)
      .subscribe(
        savedEntity => {
          this.entities.push(savedEntity);
          this.status = {
            success: true,
            message: 'NE Release "' + entity.type + '-' + entity.version + '" is added successfully!'
          };
          this.submitting = false;
          this.resetSelectAll();
        },
        err => {
          this.status = {
            success: false,
            message: 'NE Release "' + entity.type + '-' + entity.version + '" is added failed!'
          };
          this.submitting = false;
        }
      );
  }

  onEditSubmit(): void {
    this.submitting = true;
    const entity = new NeRelease();
    entity.id = this.editId;
    entity.type = this.eType.value;
    entity.version = this.eVersion.value;
    entity.remarks = this.eRemarks.value;

    this.dataService.update(entity)
      .subscribe(
        (updatedEntity: NeRelease) => {
          const existingEntity = this.entities.find(obj => obj.id === updatedEntity.id);
          Object.assign(existingEntity, updatedEntity);
          this.status = {
            success: true,
            message: 'NE Release "' + entity.type + '-' + entity.version + '" is updated successfully!'
          };
          this.submitting = false;
        },
        err => {
          this.status = {
            success: false,
            message: 'NE Release "' + entity.type + '-' + entity.version + '" is updated failed!'
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
          namestring = namestring.concat(' [ ' + entity.type + '-' + entity.version + ' ] ');
        })
        this.status = {
          success: true,
          message: 'NE Release' + namestring + 'is deleted successfully!'
        };
        this.submitting = false;
        this.resetSelectAll();
      },
      err => {
        this.status = {
          success: true,
          message: 'NE Release' + namestring + 'is deleted failed!'
        };
        this.submitting = false;
      }
    );
  }

  deleteEntities(): void {
    this.deleting = true;
    const tempEntities: NeRelease[] = new Array();
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

  select(entity: NeRelease): void {
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

  get aType() { return this.addForm.get('type'); }
  get aVersion() { return this.addForm.get('version'); }
  get aRemarks() { return this.addForm.get('remarks'); }

  get eType() { return this.editForm.get('type'); }
  get eVersion() { return this.editForm.get('version'); }
  get eRemarks() { return this.editForm.get('remarks'); }
}
