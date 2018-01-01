export default class CachePool {


    constructor(Manager) {
        this.Manager = Manager;

        this.val = new Map();
    }



    update(key, dataReq) {


        let cache = this.find(key);
        if (cache !== undefined) {
            cache = dataReq;
        } else {
            this.val.set(key, dataReq);
        }

    }

    find(key) {

        let result = undefined;
        this.val.forEach((value, index) => {
            if (this.Manager.isEqualKey(key, index)) {
                result = value;
            }
        })
        return result;
    }





}