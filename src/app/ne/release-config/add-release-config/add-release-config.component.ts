import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-release-config',
  templateUrl: './add-release-config.component.html',
  styleUrls: ['./add-release-config.component.scss']
})
export class AddReleaseConfigComponent implements OnInit {
  selectedStep = 1;

  steps = [
    {step: 1, title: 'Select NE Type and Release'},
    {step: 2, title: 'Select Interface Objects'},
    {step: 3, title: 'Select Adaptations'}
  ];

  constructor() { }

  ngOnInit() {
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
}
