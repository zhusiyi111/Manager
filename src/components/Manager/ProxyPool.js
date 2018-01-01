import ProxyReq from './ProxyReq';
export default class ProxyPool {


    constructor(Manager) {
        this.Manager = Manager;
        this.unitPool = Manager.unitPool;

        this.val = new Map();

    }

    add(unitReq) {

        let dataReq = unitReq.item;

        var key = dataReq.key;

        let flag = true;
        this.val.forEach((value, index) => {
            if (this.Manager.isEqualKey(value.key.key, key)) {
                value.list.push(unitReq);
                flag = false;
                return;
            }
        })

        // 如果池中没有该类型的
        if (flag) {
            this.val.set(dataReq, new ProxyReq(unitReq, this));

        }

    }



    send() {

        let Manager = this.Manager;
        let config = Manager.config;
        let processReq = Manager.processReq;

        let arr = [];
        this.val.forEach((value, index) => {
            if (value.state === 'waiting') {
                value.state = 'sended';
                arr.push(index);
            }
        })



        let dataReqs = [...this.val].map(item => {
            return item[0];
        });


        let maxNum = config.maxNum < 1 ? Infinity : config.maxNum;

        for (let i = 0; i < dataReqs.length; i = i + maxNum) {

            let _dataReqs = dataReqs.slice(i, i + maxNum);


            // arr是一个dataReq数组
            processReq.process(_dataReqs).then((dataReqs) => {

                dataReqs.forEach((dataReq) => {

                    // find得到池内的某个ProxyReq
                    let proxyReq = this.find(dataReq);

                    proxyReq.resolve(dataReq);
                })
            })

        }



    }

    // send() {

    //     let Manager = this.Manager;
    //     let processReq = Manager.processReq;

    //     let arr = [];
    //     this.val.forEach((value, index) => {
    //         if (value.state === 'waiting') {
    //             value.state = 'sended';
    //             arr.push(index);
    //         }
    //     })

    //     // arr是一个dataReq数组
    //     processReq.process(arr).then((dataReqs) => {
    //         dataReqs.forEach((dataReq) => {

    //             // find得到池内的某个ProxyReq
    //             let proxyReq = this.find(dataReq);

    //             proxyReq.resolve(dataReq);
    //         })
    //     })
    // }


    delete(dataReq) {
        this.val.forEach((value, index) => {
            if (dataReq.key === index.key) {
                this.val.delete(index)
            }
        })
    }

    find(dataReq) {

        let key = dataReq.key;
        var result = undefined;
        this.val.forEach((value, index) => {
            let thisKey = index.key;

            if (this.Manager.isEqualKey(thisKey, key)) {
                result = value;
            }
        })
        return result;
    }




}