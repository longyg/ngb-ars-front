import { Component, OnInit } from '@angular/core';
import {NeType} from './netype';
import {NetypeService} from './netype.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-netype',
  templateUrl: './netype.component.html',
  styleUrls: ['./netype.component.scss']
})
export class NetypeComponent implements OnInit {
  neTypes: NeType[];
  isUpdate: boolean;

  neTypeForm: FormGroup;
  name: FormControl;
  presentation: FormControl;
  agentClass: FormControl;
  description: FormControl;

  constructor(private neTypeService: NetypeService) { }

  ngOnInit() {
    this.neTypeService.getNeTypes().subscribe(list => this.neTypes = list);
    this.createEmptyForm();
  }

  showAddForm(): void {
    this.isUpdate = false;
    this.createEmptyForm();
  }

  createEmptyForm(): void {
    this.name = new FormControl('', Validators.required);
    this.presentation = new FormControl('', Validators.required);
    this.agentClass = new FormControl('', Validators.required);
    this.description = new FormControl('');

    this.neTypeForm = new FormGroup({
      name: this.name,
      presentation: this.presentation,
      agentClass: this.agentClass,
      description: this.description
    });
  }

  showEditForm(id: string): void {
    this.isUpdate = true;

    const neType = this.getNeTypeById(id);

    this.name = new FormControl('', Validators.required);
    this.presentation = new FormControl(neType.presentation, Validators.required);
    this.agentClass = new FormControl(neType.agentClass, Validators.required);
    this.description = new FormControl(neType.description);

    this.neTypeForm = new FormGroup({
      name: this.name,
      presentation: this.presentation,
      agentClass: this.agentClass,
      description: this.description
    });
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

  }
}
