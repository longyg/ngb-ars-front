import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class AddReleaseConfigComponent implements OnInit {
  @Input() selectedStep: number;

  steps = [
    {step: 1, title: 'Select NE Type and Release'},
    {step: 2, title: 'Select Interface Objects'},
    {step: 3, title: 'Select Adaptations'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
