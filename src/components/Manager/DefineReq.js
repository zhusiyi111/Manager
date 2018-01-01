import UnitPool from './UnitPool'


export default class DefineReq {


    constructor(args, Manager) {


        this.val = [];


        this.dataReqs = Manager.split(args);
        this.Manager = Manager;

        this.unitPool = new UnitPool(Manager);

    }


    async send() {
        let dataReqs = await this.unitPool.send(this.dataReqs);
        let realReturn = this.Manager.returnCombine(dataReqs);
        return realReturn;
    }


}