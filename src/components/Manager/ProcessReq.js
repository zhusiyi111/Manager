export default class ProcessReq {


    constructor(Manager) {

        this.Manager = Manager;
    }

    process(dataReqs) {

        let Manager = this.Manager;
        let config = Manager.config;

        return new Promise((resolve, reject) => {

            let maxNum = config.maxNum < 1 ? Infinity : config.maxNum;

            let promiseArr = [];
            for (let i = 0; i < dataReqs.length; i = i + maxNum) {
                promiseArr.push(new Promise((resolve, reject) => {
                    let _dataReqs = dataReqs.slice(i, i + maxNum);

                    let realReqs = Manager.combine(_dataReqs);

                    Manager.request(realReqs)
                        .then(resolve)
                        .catch();

                }))
            }

            Promise.all(promiseArr)
                .then(function(arr) {
                    // 这里resolve返回一个DataReq数组，里面为{key,result}的形式。

                    let dataReqs = Manager.resumeSplit(arr);
                    resolve(dataReqs);
                })
                .catch();


        })

    }



}