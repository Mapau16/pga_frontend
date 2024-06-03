export interface ICriterio {
    _id?: string;
    name: string;
    enabled: boolean;
    items?: ICriterioItems[];
    createdAt?: Date,
    updatedAt?: Date,
}

export enum ICriterioStatus {
    NA = 'NA',
    APLICA = 'APLICA'
}

export interface IItemContent {
    _id: string;
    name: string;
    enabled: boolean;
}

export interface ICriterioItems {
    guideline: IItemContent;
    process: IItemContent;
    question: IItemContent;
    observation: string;
    status: ICriterioStatus;
}