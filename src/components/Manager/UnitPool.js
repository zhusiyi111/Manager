import UnitReq from './UnitReq'
import Manager from './index';

export default class UnitPool {


    constructor(Manager) {


        this.Manager = Manager;
        this.val = [];
        this.timer;




    }

    send(dataReqs) {

        return new Promise((resolve, reject) => {

            let promiseArr = [];

            dataReqs.forEach((dataReq, i) => {
                let promise = new Promise((resolve, reject) => {
                    this.val.push(new UnitReq(dataReq, this, resolve, reject));

                })
                promiseArr.push(promise);
            })

            this.trigger();


            Promise.all(promiseArr)
                .then((dataReqs) => {
                    resolve(dataReqs);
                })
                .catch(reject);

        })


    }

    trigger() {

        const Manager = this.Manager;


        let normalPool = this.val;

        // 如果设置了缓存
        if (Manager.config.isCache === true) {
            let tempPool = [];
            normalPool.forEach((unitReq, index) => {

                // find到的是一个dataReq
                let cache = Manager.cachePool.find(unitReq.item.key);
                if (cache !== undefined) {

                    // find回的是UnitReq,cache.item是一个dataReq
                    unitReq.resolve(cache);
                } else {
                    tempPool.push(unitReq);
                }
            })
            normalPool = tempPool;
        }


        // 如果设置了节流
        if (Manager.config.isThrottle === true) {

            normalPool.forEach((unitReq, index) => {
                // 采用代理请求池
                Manager.proxyPool.add(unitReq);
            })
            clearTimeout(Manager.timer);
            Manager.timer = setTimeout(function() {
                Manager.proxyPool.send();
            }, this.Manager.config.timerThreshold);

            // 数组元素出栈
            normalPool = [];
        }

        if (normalPool.length === 0) return;


        let dataReqs = [];

        normalPool.forEach((unitReq) => {
            dataReqs.push(unitReq.item);
        })



        Manager.processReq.process(dataReqs).then((v) => {

            v.forEach((dataReq) => {
                // find得到池内的某个UnitReq
                let unitReq = this.find(dataReq);
                unitReq.resolve(dataReq);

            })
        })

    }




    find(dataReq) {
        var result = undefined;
        this.val.forEach((unitReq) => {
            if (unitReq.item.key === dataReq.key) {
                result = unitReq;
            }
        })
        return result;
    }

}