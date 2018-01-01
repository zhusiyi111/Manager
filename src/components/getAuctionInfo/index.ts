import Manager from '../Manager/index'

const auction = new Manager({
    isThrottle: true, //是否节流
    timerThreshold: 0, //节流阈值
    isCache: true, //是否缓存
    cacheOverdueTime: -1, //缓存过期时间,-1为不过期
    maxNum: 5, //每次请求最多单元个数,-1为不拆分
    getReturnItemKey: function(item:any) {
        return item.paimaiId;
    },
    request(args:[number]) {

        var ids = args.join('-');
        if (!ids) {
            return Promise.resolve([]);
        }

        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'http://paimai.jd.com/services/currentList.action',
                data: {
                    paimaiIds: ids
                },
                dataType: 'jsonp',
                success: function(data:any) {
                    resolve(data);
                },
                error: function (data: any) {
                    reject();
                }
            });
        })
    }
});

async function getAuctionInfo(args: [number]) {
    return await auction.getInfo(args);
}


export default getAuctionInfo;