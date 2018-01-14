import { Component, OnInit } from '@angular/core';
import {ParentObject} from './parent-object';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Status} from '../../common/status/status';
import {PtoService} from './parent-object.service';

@Component({
  selector: 'app-parent-object',
  templateUrl: './parent-object.component.html',
  styleUrls: ['./parent-object.component.scss']
})
export class ParentObjectComponent implements OnInit {
  entities: ParentObject[];
  isLoading = true;
  delEntities: ParentObject[];
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
    private dataService: PtoService,
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
      name: '',
      presentation: '',
      nameInOMeS: '',
      isTransient: false
    });
  }

  showAddForm(): void {
    this.editing = false;
    this.addForm.reset();
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      presentation: ['', Validators.required],
      nameInOMeS: [''],
      isTransient: [false]
    });
  }

  showEditForm(id: string): void {
    this.editId = id;
    this.editing = true;
    this.editForm.reset();

    const entity = this.getEntityById(id);

    if (null != entity) {
      this.editForm = this.fb.group({
        name: [entity.name, Validators.required],
        presentation: [entity.presentation, Validators.required],
        nameInOMeS: [entity.nameInOMeS],
        isTransient: [entity.isTransient === 'Yes' ? true : false]
      });
    }
  }

  getEntityById(id: string): ParentObject {
    let entity: ParentObject;
    for (const tmp of this.entities) {
      if (tmp.id === id) {
        entity = tmp;
      }
    }
    return entity;
  }

  onAddSubmit(): void {
    this.submitting = true;
    const entity = new ParentObject();
    entity.name = this.aName.value;
    entity.presentation = this.aPresentation.value;
    entity.nameInOMeS = this.aNameInOMeS.value;
    entity.isTransient = this.aIsTransient.value === true ? 'Yes' : 'No';

    this.dataService.add(entity)
      .subscribe(
        savedEntity => {
          this.entities.push(savedEntity);
          this.status = {
            success: true,
            message: 'Parent Object "' + entity.name + '" is added successfully!'
          };
          this.submitting = false;
          this.resetSelectAll();
        },
        err => {
          this.status = {
            success: false,
            message: 'Parent Object "' + entity.name + '" is added failed!'
          };
          this.submitting = false;
        }
      );
  }

  onEditSubmit(): void {
    this.submitting = true;
    const entity = new ParentObject();
    entity.id = this.editId;
    entity.name = this.eName.value;
    entity.presentation = this.ePresentation.value;
    entity.nameInOMeS = this.eNameInOMeS.value;
    entity.isTransient = this.eIsTransient.value === true ? 'Yes' : 'No';

    this.dataService.update(entity)
      .subscribe(
        (updatedEntity: ParentObject) => {
          const existingEntity = this.entities.find(obj => obj.id === updatedEntity.id);
          Object.assign(existingEntity, updatedEntity);
          this.status = {
            success: true,
            message: 'Parent Object "' + entity.name + '" is updated successfully!'
          };
          this.submitting = false;
        },
        err => {
          this.status = {
            success: false,
            message: 'Parent Object "' + entity.name + '" is updated failed!'
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
          namestring = namestring.concat(' [ ' + entity.name + ' ] ');
        })
        this.status = {
          success: true,
          message: 'Parent Object' + namestring + 'is deleted successfully!'
        };
        this.submitting = false;
        this.resetSelectAll();
      },
      err => {
        this.status = {
          success: true,
          message: 'Parent Object' + namestring + 'is deleted failed!'
        };
        this.submitting = false;
      }
    );
  }

  deleteEntities(): void {
    this.deleting = true;
    const tempEntities: ParentObject[] = new Array();
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

  select(entity: ParentObject): void {
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

  get aName() { return this.addForm.get('name'); }
  get aPresentation() { return this.addForm.get('presentation'); }
  get aNameInOMeS() { return this.addForm.get('nameInOMeS'); }
  get aIsTransient() { return this.addForm.get('isTransient'); }

  get eName() { return this.editForm.get('name'); }
  get ePresentation() { return this.editForm.get('presentation'); }
  get eNameInOMeS() { return this.editForm.get('nameInOMeS'); }
  get eIsTransient() { return this.editForm.get('isTransient'); }
}
