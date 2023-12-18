import {AppRepository} from "@jbr/state/shared";


class NGRXAppRepository implements AppRepository {}

export const appRepositoryFactory = () => new NGRXAppRepository();
