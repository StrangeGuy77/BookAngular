import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// IMPORTAR MODULOS INDIVIDUAL
import { SharedModule } from "./shared/shared.module";
import { LoginModule } from "./login/login.module";
import { PageModule } from "./page/page.module";
// RUTAS
import { AppRoutingModule } from "./app-routing.module";

// COMPONENTE
import { AppComponent } from "./app.component";

// NOTIFICACIONES
import { NotifierModule, NotifierOptions } from 'angular-notifier';

// MDBBootstra
import { MDBBootstrapModule } from "angular-bootstrap-md";

const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 12
    },
    vertical: {
      position: 'bottom',
      distance: 12,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    LoginModule,
    SharedModule,
    PageModule,
    HttpClientModule,
    ReactiveFormsModule,
    NotifierModule.withConfig(customNotifierOptions)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
