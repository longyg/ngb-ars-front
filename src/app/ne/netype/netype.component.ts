import { Component, OnInit } from '@angular/core';
import {NeType} from './netype';
import {NetypeService} from './netype.service';

@Component({
  selector: 'app-netype',
  templateUrl: './netype.component.html',
  styleUrls: ['./netype.component.scss']
})
export class NetypeComponent implements OnInit {
  neTypes: NeType[];
  newNeType: NeType = new NeType();
  editingNeType: NeType = new NeType();
  editing: boolean;

  status = {
    success: true,
    title: 'NE Type',
    error: ''
  };

  constructor(private neTypeService: NetypeService) { }

  ngOnInit() {
    this.neTypeService.getAll().subscribe(list => this.neTypes = list);
  }

  showAddForm(): void {
    this.editing = false;
    this.newNeType = new NeType();
  }

  showEditForm(id: string): void {
    this.editing = true;
    const type = this.getNeTypeById(id);
    if (null != type) {
      this.editingNeType = new NeType();
      this.editingNeType.id = type.id;
      this.editingNeType.name = type.name;
      this.editingNeType.presentation = type.presentation;
      this.editingNeType.agentClass = type.agentClass;
      this.editingNeType.description = type.description;
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
  }
}
