export default class Dto {
    id;
    amount;

    constructor(model){
        this.id = model._id
        this.amount = model.amount
    }
}