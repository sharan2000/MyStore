import { Directive, ElementRef, HostListener, Renderer2 } from "@angular/core";

@Directive({
    selector:"[appDropdown]"
})
export class DropdownDirective {
    displayMenu = false;

    @HostListener('click') toggleMenu() {
        this.displayMenu = !this.displayMenu;

        if(this.displayMenu === false) this.renderer.removeClass(this.eleRef.nativeElement.lastChild, "show");
        else this.renderer.addClass(this.eleRef.nativeElement.lastChild, "show");
    }

    constructor(public eleRef: ElementRef, public renderer: Renderer2) {}
}