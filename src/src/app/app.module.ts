import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { XCheckboxComponent } from "./components/x-checkbox/x-checkbox.component";
import { XTableComponent } from "./components/x-table/x-table.component";
import { BrowserModule } from "@angular/platform-browser";
import { APP_INITIALIZER, NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";
import { CustomMaterialModule } from "./custom-material/custom-material.module";
import { AppRoutingModule } from "./app-routing.module";
import { LoggerModule } from "ngx-logger";
import { environment } from "../environments/environment";
import { RuntimeEnvLoaderService } from "./core/services/runtime-env-loader.service";

const appInitializeFn = (envLoader: RuntimeEnvLoaderService) => {
  return () => envLoader.loadAppConfig();
};
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    CustomMaterialModule.forRoot(),
    AppRoutingModule,
    LoggerModule.forRoot({
      serverLoggingUrl: `http://my-api/logs`,
      level: environment.logLevel,
      serverLogLevel: environment.serverLogLevel,
    }),
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializeFn,
      multi: true,
      deps: [RuntimeEnvLoaderService],
    },
  ],
})
export class AppModule {}
