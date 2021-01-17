import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { featureName, reducers } from './reducers';
import { CoreService } from './services/core.service';
import { CoreEffects } from './effects/core.effects';

@NgModule({
    imports: [
        StoreModule.forFeature(featureName, reducers),
        EffectsModule.forFeature([CoreEffects]),
    ],
    providers: [CoreService]
})
export class CoreModule { }
