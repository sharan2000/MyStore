import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector:"app-header",
    templateUrl:"./header.component.html"
})
export class HeaderComponent {
    collapsed = true;

    @Output() componentSelected = new EventEmitter<number>();

    onEmitOption(opValue:number) {
        this.componentSelected.emit(opValue);
    }
}