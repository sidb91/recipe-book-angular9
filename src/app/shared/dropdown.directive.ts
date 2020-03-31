import { Directive, OnInit, HostListener, HostBinding, ElementRef } from '@angular/core';

@Directive({
    selector:'[appDropDown]'
})
export class DropDownDirective implements OnInit{

    @HostBinding('class.open') isDropDownOpen = false;

    // @HostListener('click') toggleDropDown(){
    //     this.isDropDownOpen = !this.isDropDownOpen;
    // }

    @HostListener('document:click', ['$event']) toggleDropDown(event: Event){
        this.isDropDownOpen = 
        this.elRef.nativeElement.contains(event.target) ? !this.isDropDownOpen : false;
    }

    constructor(private elRef: ElementRef){}

    ngOnInit(){}

}

