import {ModuleWithProviders, SecurityContext} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {MarkdownModule, MarkedOptions} from "ngx-markdown";

import 'prismjs';
import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-css-extras';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-sass';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-json';

type PrismHookEnv = {
  element: HTMLElement,
  language: string,
  grammar?: any,
  code: string,
  highlightedCode: string
}

declare let Prism: {
  hooks: {
    all: {
      [key: string]: (env: PrismHookEnv) => void;
    },
    add: (name: string, callback: (env: PrismHookEnv) => void) => void;
  }
}



export function getMarkdownProviders(): ModuleWithProviders<MarkdownModule> {

  return MarkdownModule.forRoot({
      loader: HttpClient,
      //sanitize: SecurityContext.NONE,
      markedOptions: {
        provide: MarkedOptions,
        useFactory: () => {

          if (typeof Prism !== 'undefined' && typeof Prism.hooks !== 'undefined') {
            Prism.hooks.add('before-insert', (env: PrismHookEnv) => {

              for (let i = 0; i < env.element.children.length; i++) {
                if(env.element.children[i].nodeName === 'A') {
                  const a = env.element.children[i] as HTMLAnchorElement;
                  env.highlightedCode = env.highlightedCode.replace(a.innerHTML, a.outerHTML);
                }
              }
            });
          }

          return {
            gfm: true
          }
        }
      }
    });
}
