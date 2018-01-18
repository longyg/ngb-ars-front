import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-release-config',
  templateUrl: './add-release-config.component.html',
  styleUrls: ['./add-release-config.component.scss']
})
export class AddReleaseConfigComponent implements OnInit {
  currentStep = 1;

  constructor() { }

  ngOnInit() {
  }

}
