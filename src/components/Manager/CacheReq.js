export default class CacheReq {


    constructor(key) {

        this.key = key;
        this.value = [];

    }


    resolve(value) {
        // find后返回list
        this.list.forEach((unitReq) => {
            // unitReq
            unitReq.resolve(value);
        })
    }


}