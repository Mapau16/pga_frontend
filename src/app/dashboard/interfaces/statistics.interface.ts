export interface IItemsByReview {
    _id:       string;
    review:       string;
    worker:       string;
    totalItems:   number;
    applycount:   number;
    noapplycount: number;
}

export interface IReviewByClient {
    client: string;
    count:  number;
}

export interface IReviewByRole {
    role:  string;
    count: number;
}
