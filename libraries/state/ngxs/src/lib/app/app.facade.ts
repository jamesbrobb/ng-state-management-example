import {inject} from "@angular/core";
import {AppFacade} from "@jbr/state/shared";
import {AppActionHandlers} from "./app.action-handlers";


class NGXSAppFacade implements AppFacade {
  readonly #appActionHandlers = inject(AppActionHandlers);
}

export const appFacadeFactory = () => new NGXSAppFacade();
