import CryptoNewsApi from '../node_modules/crypto-news-api';
const CryptoApi = new CryptoNewsApi('d6dccf9ebcdfa53ec2f899707020da65');

CryptoApi.enableSentiment()
CryptoApi.getTopNews()
    .then(function (articles) {
        console.log(articles)
    })
    .catch(function (error) {
        console.log(error)
    })

let coins = [];
let historyData = [];
let labels = [];
let prices = [];

function getCoins() {
    $.ajax({
        type: "GET",
        method: "GET",
        timeout: 0,
        dataType: "json",
        url: "https://api.coincap.io/v2/assets",

        success: function (data) {
            $('#balls').remove();
            coins = data;
            var template = $("#coinsTemplate").html();
            var renderTemplate = Mustache.render(template, coins);
            $('#coinTable tbody').append(renderTemplate);
        }
    });
}


async function getCoinInfo(coinId) {
    let coin;
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "https://api.coincap.io/v2/assets/" + coinId,

        success: async function (data) {
            coin = data;
            var template = $("#modal-template").html();
            var renderTemplate = Mustache.render(template, coin);
            $('#modal-template-box').remove();
            await $('.modal-content').prepend(renderTemplate);
            getHistory(coinId);
        }

    });
}

async function getHistory(coinId){
    $.ajax({
        url: "https://api.coincap.io/v2/assets/"+coinId+"/history?interval=d1",
        method: "GET",
        timeout: 0,

        success: async function (data) {
            historyData = data.data;
            await historyData.forEach(element => {
                element.date = moment(element.date).format('D MMM YYYY')
                labels.push(element.date);
                prices.push(element.priceUsd);
            });
            showGraph();
        }
    });
}

function showGraph(){
    var ctx = $('#myChart');
    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Price',
                backgroundColor: 'rgba(128, 128, 128,0.5)',
                borderColor: 'rgba(0,100,255)',
                data: prices
            }]
        },
        options: {
            responsive: true,
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Months'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    }
                }]
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
        }
    });
}


$(document).ready(function () {
    getCoins();
});