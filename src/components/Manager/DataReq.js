export default class DataReq {


    constructor(args) {
        let { item, returnItem, Manager } = args;
        if (returnItem) {
            this.key = Manager.getReturnItemKey(returnItem);
            this.return = returnItem;
        } else {
            this.key = Manager.getKey(item);
            this.value = item;
        }
    }

}