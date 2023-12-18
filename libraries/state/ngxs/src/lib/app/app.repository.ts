import {inject} from "@angular/core";
import {AppRepository} from "@jbr/state/shared";
import {AppActionHandlers} from "./app.action-handlers";


class NGXSAppRepository implements AppRepository {
  readonly #appActionHandlers = inject(AppActionHandlers);
}

export const appRepositoryFactory = () => new NGXSAppRepository();
