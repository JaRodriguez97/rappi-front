import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InfoUserComponent } from '@components/info-user/info-user.component';
import { DeviceService } from '@services/device.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, InfoUserComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [DeviceService],
  bootstrap: [AppComponent],
})
export class AppModule {}
