export interface IReview {
    name:   string;
    client: string;
    date:   Date;
    cycle:  Cycle;
}

export interface Cycle {
    name:     string;
    worker:   string;
    role:     string;
    date:     Date;
    criterio: Criterio;
}

export interface Criterio {
    name:    string;
    enabled: boolean;
    items:   Item[];
}

export interface Item {
    guideline:    string;
    process:      string;
    question:     string;
    observation?: string;
    status:       string;
}
