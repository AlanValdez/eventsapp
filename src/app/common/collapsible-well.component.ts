import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'collapsible-well',
  template: `
    <div (click)="toggleContent()" class="well pointable">
        <h4>
            <ng-content select="[well-title]"></ng-content>
        </h4>
        <ng-content *ngIf="visible" select="[well-body]"></ng-content>
    </div>
  `
})
export class CollapsibleWellComponent implements OnInit {
    @Input() openFirst: any[];
    visible: boolean;

    ngOnInit() {
        if(this.openFirst[0]) { this.visible = this.openFirst[1] === 0; }
    }
    toggleContent() {
        this.visible = !this.visible;
    }
}
