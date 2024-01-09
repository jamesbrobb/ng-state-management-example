import {bootstrapApplication} from "@angular/platform-browser";
import {importProvidersFrom} from "@angular/core";
import {getMarkdownProviders} from "./app/markdown.providers";
import {AppComponent} from "./app/app.component";
import {HttpClientModule} from "@angular/common/http";


bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      HttpClientModule,
      getMarkdownProviders()
    )
  ]
}).then(ref =>  {
  if (window['ngRef' as keyof Window]) {
    window['ngRef'as keyof Window].destroy();
  }
  // @ts-ignore
  window['ngRef'] = ref;
})
.catch(err => console.error(err));
