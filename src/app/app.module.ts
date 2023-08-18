import {NgModule, isDevMode} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
//----------------------------------------------------------------------------
// Imports NgRx
//----------------------------------------------------------------------------
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {ROOT_REDUCERS} from './store/reducers';
import {metaReducers} from './store/reducers';
import {effects} from './store/effects';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        StoreModule.forRoot(ROOT_REDUCERS, {metaReducers}),
        EffectsModule.forRoot(effects),
        StoreDevtoolsModule.instrument({maxAge: 25, logOnly: !isDevMode()}),
        BrowserAnimationsModule,
        ToastrModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
