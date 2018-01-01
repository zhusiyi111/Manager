import getAuctionInfo from '../../components/getAuctionInfo/index'

var btn1 = document.querySelector('.btn1');
var btn2 = document.querySelector('.btn2');

btn1.addEventListener('click', async function() {
    get([104558517, 104558572]);
})



btn2.addEventListener('click', async function() {
    get([104558517, 104558572, 104590814]);
})

get([104558517, 104558572]);

get([104558517, 104558572, 104590814]);

function get(ids:[number]) {
    getAuctionInfo(ids).then(data => {
        console.log(data)
    });
}

