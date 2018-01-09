import { Component, OnInit } from '@angular/core';
import {NeType} from './netype';
import {NetypeService} from './netype.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Status} from '../../common/status/status';
import 'rxjs/add/operator/finally';

@Component({
  selector: 'app-netype',
  templateUrl: './netype.component.html',
  styleUrls: ['./netype.component.scss']
})
export class NetypeComponent implements OnInit {
  neTypes: NeType[];
  editing = false;
  addForm: FormGroup;
  editForm: FormGroup;
  submitComplete: boolean;
  isLoading = false;
  status: Status;
  editId: string;
  delNeTypes: NeType[];
  deleting = false;
  isSelectAll = false;
  deleteDisabled = true;

  constructor(
    private neTypeService: NetypeService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getNeTypes();
    this.addForm = this.createEmptyForm();
    this.editForm = this.createEmptyForm();
  }

  getNeTypes() {
    this.isLoading = true;
    this.neTypeService.getAll().finally(() => this.isLoading = false).subscribe(list => this.neTypes = list);
  }

  createEmptyForm(): FormGroup {
    return this.fb.group({
      name: '',
      presentation: '',
      agentClass: '',
      description: ''
    });
  }

  showAddForm(): void {
    this.editing = false;
    this.submitComplete = false;
    this.addForm.reset();
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      presentation: ['', Validators.required],
      agentClass: ['', Validators.required],
      description: ['']
    });
  }

  showEditForm(id: string): void {
    this.editId = id;
    this.editing = true;
    this.submitComplete = false;
    this.editForm.reset();

    const type = this.getNeTypeById(id);

    if (null != type) {
      this.editForm = this.fb.group({
        name: [type.name, Validators.required],
        presentation: [type.presentation, Validators.required],
        agentClass: [type.agentClass, Validators.required],
        description: [type.description]
      });
    }
  }

  getNeTypeById(id: string): NeType {
    let neType: NeType;
    for (const type of this.neTypes) {
      if (type.id === id) {
        neType = type;
      }
    }
    return neType;
  }

  onAddSubmit(): void {
    const neType = new NeType();
    neType.name = this.aName.value;
    neType.presentation = this.aPresentation.value;
    neType.agentClass = this.aAgentClass.value;
    neType.description = this.aDescription.value;

    this.neTypeService.add(neType)
      .subscribe(
        savedNeType => {
          this.neTypes.push(savedNeType);
          this.status = {
            success: true,
            message: 'NE Type "' + neType.name + '" is added successfully!'
          };
          this.submitComplete = true;
          this.resetSelectAll();
        },
        err => {
          this.status = {
            success: false,
            message: 'NE Type "' + neType.name + '" is added failed!'
          };
          this.submitComplete = true;
        }
      );
  }

  onEditSubmit(): void {
    const neType = new NeType();
    neType.id = this.editId;
    neType.name = this.eName.value;
    neType.presentation = this.ePresentation.value;
    neType.agentClass = this.eAgentClass.value;
    neType.description = this.eDescription.value;

    this.neTypeService.update(neType)
      .subscribe(
        (updatedNeType: NeType) => {
          const existingNeType = this.neTypes.find(type => type.id === updatedNeType.id);
          Object.assign(existingNeType, updatedNeType);
          this.status = {
            success: true,
            message: 'NE Type "' + neType.name + '" is updated successfully!'
          };
          this.submitComplete = true;
        },
        err => {
          this.status = {
            success: false,
            message: 'NE Type "' + neType.name + '" is updated failed!'
          };
          this.submitComplete = true;
        }
      );
  }

  deleteNeType(id: string): void {
    this.deleting = true;
    this.submitComplete = false;
    this.delNeTypes = new Array(this.getNeTypeById(id));
  }

  submitDeletes(): void {
    const neTypeIds: string[] = new Array();
    this.delNeTypes.forEach(neType => {
      neTypeIds.push(neType.id);
    });

    let namestring = '';
    this.neTypeService.deleteAll(neTypeIds).subscribe(
      data => {
        this.delNeTypes.forEach(type => {
          const index = this.neTypes.findIndex(obj => obj.id === type.id);
          this.neTypes.splice(index, 1);
          namestring = namestring.concat(' [ ' + type.name + ' ] ');
        })
        this.status = {
          success: true,
          message: 'NE Type' + namestring + 'is deleted successfully!'
        };
        this.submitComplete = true;
        this.resetSelectAll();
      },
      err => {
        this.status = {
          success: true,
          message: 'NE Type' + namestring + 'is deleted failed!'
        };
        this.submitComplete = true;
      }
    );
  }

  deleteNeTypes(): void {
    this.deleting = true;
    this.submitComplete = false;
    const tempNeTypes: NeType[] = new Array();
    this.neTypes.forEach(neType => {
      if (neType.select) {
        tempNeTypes.push(neType);
      }
    });
    this.delNeTypes = tempNeTypes;
  }

  selectAll(): void {
    this.isSelectAll = !this.isSelectAll;
    if (this.isSelectAll) {
      this.neTypes.forEach(neType => {
        neType.select = true;
      });
    } else {
      this.neTypes.forEach(neType => {
        neType.select = false;
      });
    }
    this.setDeleteDisabled();
  }

  setDeleteDisabled(): void {
    let isAnySelect = false;
    this.neTypes.forEach(neType => {
      if (neType.select) {
        isAnySelect = true;
      }
    });
    this.deleteDisabled = !isAnySelect;
  }

  select(neType: NeType): void {
    neType.select = !neType.select;
    this.resetSelectAll();
    this.setDeleteDisabled();
  }

  resetSelectAll(): void {
    let isAllSelected = true;
    this.neTypes.forEach(type => {
      if (!type.select) {
        isAllSelected = false;
      }
    });
    this.isSelectAll = isAllSelected;
  }

  get aName() { return this.addForm.get('name'); }
  get aPresentation() { return this.addForm.get('presentation'); }
  get aAgentClass() { return this.addForm.get('agentClass'); }
  get aDescription() { return this.addForm.get('description'); }
  get eName() { return this.editForm.get('name'); }
  get ePresentation() { return this.editForm.get('presentation'); }
  get eAgentClass() { return this.editForm.get('agentClass'); }
  get eDescription() { return this.editForm.get('description'); }
}
