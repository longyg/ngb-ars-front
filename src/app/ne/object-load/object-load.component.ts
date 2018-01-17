import { Component, OnInit } from '@angular/core';
import {ObjectLoad} from './object-load';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Status} from '../../common/status/status';
import {ObjectLoadService} from './object-load.service';

@Component({
  selector: 'app-object-load',
  templateUrl: './object-load.component.html',
  styleUrls: ['./object-load.component.scss']
})
export class ObjectLoadComponent implements OnInit {
  entities: ObjectLoad[];
  isLoading = true;
  delEntities: ObjectLoad[];
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
    private dataService: ObjectLoadService,
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
      objectClass: '',
      max: '',
      avg: '',
      relatedObjectClass: ''
    });
  }

  showAddForm(): void {
    this.editing = false;
    this.addForm.reset();
    this.addForm = this.fb.group({
      objectClass: ['', Validators.required],
      max: ['', Validators.required],
      avg: ['', Validators.required],
      relatedObjectClass: ['', Validators.required]
    });
  }

  showEditForm(id: string): void {
    this.editId = id;
    this.editing = true;
    this.editForm.reset();

    const entity = this.getEntityById(id);

    if (null != entity) {
      this.editForm = this.fb.group({
        objectClass: [entity.objectClass, Validators.required],
        max: [entity.max, Validators.required],
        avg: [entity.avg, Validators.required],
        relatedObjectClass: [entity.relatedObjectClass, Validators.required]
      });
    }
  }

  getEntityById(id: string): ObjectLoad {
    let entity: ObjectLoad;
    for (const tmp of this.entities) {
      if (tmp.id === id) {
        entity = tmp;
      }
    }
    return entity;
  }

  onAddSubmit(): void {
    this.submitting = true;
    const entity = new ObjectLoad();
    entity.objectClass = this.aObjectClass.value;
    entity.max = this.aMax.value;
    entity.avg = this.aAvg.value;
    entity.relatedObjectClass = this.aRelatedObjectClass.value;

    this.dataService.add(entity)
      .subscribe(
        savedEntity => {
          this.entities.push(savedEntity);
          this.status = {
            success: true,
            message: 'Object Load "' + entity.relatedObjectClass + '->' + entity.objectClass + '" is added successfully!'
          };
          this.submitting = false;
          this.resetSelectAll();
        },
        err => {
          this.status = {
            success: false,
            message: 'Object Load "' + entity.relatedObjectClass + '->' + entity.objectClass + '" is added failed!'
          };
          this.submitting = false;
        }
      );
  }

  onEditSubmit(): void {
    this.submitting = true;
    const entity = new ObjectLoad();
    entity.id = this.editId;
    entity.objectClass = this.eObjectClass.value;
    entity.max = this.eMax.value;
    entity.avg = this.eAvg.value;
    entity.relatedObjectClass = this.eRelatedObjectClass.value;

    this.dataService.update(entity)
      .subscribe(
        (updatedEntity: ObjectLoad) => {
          const existingEntity = this.entities.find(obj => obj.id === updatedEntity.id);
          Object.assign(existingEntity, updatedEntity);
          this.status = {
            success: true,
            message: 'Object Load "' + entity.relatedObjectClass + '->' + entity.objectClass + '" is updated successfully!'
          };
          this.submitting = false;
        },
        err => {
          this.status = {
            success: false,
            message: 'Object Load "' + entity.relatedObjectClass + '->' + entity.objectClass + '" is updated failed!'
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
          namestring = namestring.concat(' [ ' + entity.relatedObjectClass + '->' + entity.objectClass + ' ] ');
        })
        this.status = {
          success: true,
          message: 'Object Load' + namestring + 'is deleted successfully!'
        };
        this.submitting = false;
        this.resetSelectAll();
      },
      err => {
        this.status = {
          success: true,
          message: 'Object Load' + namestring + 'is deleted failed!'
        };
        this.submitting = false;
      }
    );
  }

  deleteEntities(): void {
    this.deleting = true;
    const tempEntities: ObjectLoad[] = new Array();
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

  select(entity: ObjectLoad): void {
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

  get aObjectClass() { return this.addForm.get('objectClass'); }
  get aMax() { return this.addForm.get('max'); }
  get aAvg() { return this.addForm.get('avg'); }
  get aRelatedObjectClass() { return this.addForm.get('relatedObjectClass'); }

  get eObjectClass() { return this.editForm.get('objectClass'); }
  get eMax() { return this.editForm.get('max'); }
  get eAvg() { return this.editForm.get('avg'); }
  get eRelatedObjectClass() { return this.editForm.get('relatedObjectClass'); }
}
