export default class ProxyReq {


    constructor(unitReq, ProxyPool) {

        this.key = unitReq.item;
        this.list = [unitReq];
        this.state = 'waiting'
        this.proxyPool = ProxyPool;


    }


    send() {

    }


    resolve(dataReq) {
        let value = dataReq;

        this.list.forEach((unitReq) => {
            unitReq.resolve(value);
        })

        this.proxyPool.delete(dataReq);


    }




}