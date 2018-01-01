import DataReq from './DataReq';

export default class UnitReq {
    constructor(dataReq, UnitPool, resolve, reject) {

        this.item = dataReq;
        this._resolve = resolve;
        this._reject = reject;
        this.unitPool = UnitPool;


    }


    resolve(dataReq) {
        let Manager = this.unitPool.Manager;

        // 如果设置了缓存
        if (Manager.config.isCache === true) {
            Manager.cachePool.update(this.unitPool.Manager.getReturnKey(dataReq), new DataReq({ returnItem: dataReq.return, Manager: Manager }))
        }

        this._resolve(dataReq);
    }




}