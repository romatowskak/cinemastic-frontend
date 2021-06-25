import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar-menu-tab',
  templateUrl: './toolbar-menu-tab.component.html',
  styleUrls: ['./toolbar-menu-tab.component.scss'],
})
export class ToolbarMenuTabComponent implements OnInit {
  @Input() route: string;
  @Input() tabName: string;

  constructor() {}

  ngOnInit() {}
}
