import {AppFacade} from "@jbr/state/shared";


class NGRXAppFacade implements AppFacade {}

export const appFacadeFactory = () => new NGRXAppFacade();
