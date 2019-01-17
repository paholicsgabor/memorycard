export enum Cardstate {
    Closed,
    Open,
    Ready
}

export class Card {
    no: number;
    state: Cardstate;
}
