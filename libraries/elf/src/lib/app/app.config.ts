import {AppConfigType} from '@jbr/shared';
import {devTools} from "@ngneat/elf-devtools";

export const appConfig: AppConfigType = {
  type: 'elf',
  link: 'https://ngneat.github.io/elf/',
  forDev: () => {
    devTools();
  }
}
