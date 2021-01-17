import {
    trigger,
    state,
    style,
    transition,
    animate,
    animateChild,
    query
} from '@angular/animations';

export const onSearchInputToggl = trigger('onSearchInputToggl', [
    state('show', style({
        width: '200px',
        opacity: 1,
    })),
    state('hide', style({
        width: '0px',
        opacity: 0,
    })),
    transition('show => hide', [
        animate('0.5s')
    ]),
    transition('hide => show', [
        animate('0.5s')
    ])
]);
