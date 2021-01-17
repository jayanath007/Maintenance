import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NameInitialsPipe } from './pipes/name-initials.pipe';
import { LetDirective } from './directives/let.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [NameInitialsPipe, LetDirective],
    exports: [NameInitialsPipe, LetDirective]
})
export class SharedModule { }
