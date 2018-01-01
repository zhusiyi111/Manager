import ProxyPool from './ProxyPool';
import CachePool from './CachePool';
import ProcessReq from './ProcessReq';
import DefineReq from './DefineReq';
import DataReq from './DataReq'


export default class Manager {

    constructor(args) {

        this.config = $.extend({
            isThrottle: true, //是否节流
            timerThreshold: 0, //节流阈值
            isCache: false, //是否缓存
            cacheOverdueTime: -1, //缓存过期时间,-1为不过期
            keyword: 'paimaiId', //唯一标识关键字
            maxNum: Infinity //每次请求最多单元个数,-1为不拆分
        }, args);


        this.combine = __combine(this.config.combine || this.combine);
        this.returnCombine = __returnCombine(this.config.returnCombine || this.returnCombine);
        this.split = __split(this.config.split || this.split);
        this.resumeSplit = __resumeSplit(this.config.resumeSplit || this.resumeSplit);
        this.getReturnItemKey = __getReturnItemKey(this.config.getReturnItemKey || this.getReturnItemKey);
        this.getReturnKey = __getReturnKey(this.config.getReturnKey || this.getReturnKey);
        this.getKey = __getKey(this.config.getKey || this.getKey);
        this.isEqualKey = __isEqualKey(this.config.isEqualKey || this.isEqualKey);
        this.request = this.config.request;

        this.proxyPool = new ProxyPool(this);
        this.cachePool = new CachePool(this);
        this.processReq = new ProcessReq(this);

    }


    request(args) {

        var ids = args.join('-');
        if (!ids) {
            return Promise.resolve([]);
        }

        return new Promise((resolve, reject) => {
            $.ajax({
                url: INTERFACE.paimai.currentList,
                data: {
                    paimaiIds: ids
                },
                dataType: 'jsonp',
                success: function(data) {
                    resolve(data);
                },
                error: function(data) {
                    reject();
                }
            });
        })
    }

    combine(dataReqs) {
        let result = [];
        dataReqs.forEach((v) => {
            result.push(v.value);
        })
        return result;
    }

    returnCombine(dataReqs) {
        let result = [];
        dataReqs.forEach((v) => {
            result.push(v.return || v.value);
        })
        return result;
    }


    split(args) {
        var result = [];
        args.forEach((value) => {
            result.push(new DataReq({ item: value, Manager: this }));
        })
        return result;
    }


    resumeSplit(arr) {
        let result = [];
        arr.forEach((value) => {
            value.forEach((v) => {
                result.push(new DataReq({ returnItem: v, Manager: this }))
            })
        })
        return result;
    }

    getReturnItemKey(item) {
        return item.paimaiId.toString();
    }

    getReturnKey(dataReq) {
        return this.getReturnItemKey(dataReq.return);
    }


    getKey(item) {
        return item;
    }

    isEqualKey(key1, key2) {
        if (key1 === key2) {
            return true;
        }
        return false;
    }



    /**
     * 向外暴露的接口
     * @param  {object} args 入参对象
     * @return {promise}      promise对象
     */
    async getInfo(args) {

        let defineReq = new DefineReq(args, this);
        return await defineReq.send();

    }

}

function __isEqualKey(arg) {
    if (typeof arg === 'string') {
        return function() {

        }
    } else if (typeof arg === 'function') {
        return arg;
    }
}


function __combine(arg) {
    if (typeof arg === 'string') {
        return function() {

        }
    } else if (typeof arg === 'function') {
        return arg;
    }
}

function __returnCombine(arg) {
    if (typeof arg === 'string') {
        return function() {

        }
    } else if (typeof arg === 'function') {
        return arg;
    }
}

function __split(arg) {
    if (typeof arg === 'string') {
        return function() {

        }
    } else if (typeof arg === 'function') {
        return arg;
    }
}

function __resumeSplit(arg) {
    if (typeof arg === 'string') {
        return function() {

        }
    } else if (typeof arg === 'function') {
        return arg;
    }
}

function __getReturnItemKey(arg) {
    if (typeof arg === 'string') {
        return function() {

        }
    } else if (typeof arg === 'function') {
        return arg;
    }
}


function __getReturnKey(arg) {
    if (typeof arg === 'string') {
        return function() {

        }
    } else if (typeof arg === 'function') {
        return arg;
    }
}

function __getKey(arg) {
    if (typeof arg === 'string') {
        return function() {

        }
    } else if (typeof arg === 'function') {
        return arg;
    }
}