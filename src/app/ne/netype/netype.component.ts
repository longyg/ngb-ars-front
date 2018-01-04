import { Component, OnInit } from '@angular/core';
import {NeType} from './netype';
import {NetypeService} from './netype.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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

  status = {
    success: true,
    title: 'NE Type',
    error: ''
  };

  constructor(
    private neTypeService: NetypeService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.neTypeService.getAll().subscribe(list => this.neTypes = list);
    this.addForm = this.createEmptyForm();
    this.editForm = this.createEmptyForm();
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
    this.addForm.reset();
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      presentation: ['', Validators.required],
      agentClass: ['', Validators.required],
      description: ['']
    });
  }

  showEditForm(id: string): void {
    this.editing = true;
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
    for (const type of this.neTypes) {
      if (type.id === id) {
        return type;
      }
    }
    return null;
  }

  onAddSubmit(): void {

  }

  onEditSubmit(): void {

  }

  /**
  onSubmit(): void {
    // Edit
    if (this.editing) {
      this.neTypeService.update(this.editingNeType)
        .subscribe(
          (updatedNeType: NeType) => {
            const existingNeType = this.neTypes.find(neType => neType.id === updatedNeType.id);
            Object.assign(existingNeType, updatedNeType);
            this.status = {
              success: true,
              title: 'NE Type',
              error: ''
            };
          },
          err => {
            this.status = {
              success: false,
              title: 'NE Type',
              error: err
            };
          }
        );

    } else {
      // Add
      this.neTypeService.add(this.newNeType)
        .subscribe(
          neType => {
            this.neTypes.push(neType);
            this.status = {
              success: true,
              title: 'NE Type',
              error: ''
            };
          },
          err => {
            this.status = {
              success: false,
              title: 'NE Type',
              error: err
            };
          }
          );
    }
  }**/
}
