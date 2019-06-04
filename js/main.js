let coins = [];
let historyData = [];
let labels = [];
let prices = [];
let articles = [];
let myChart;

let now = new Date();
let timeToday = now.setDate(now.getDate());
let timeWeekAgo = now.setDate(now.getDate() - 7);

function getCoins() {
    $.ajax({
        type: "GET",
        method: "GET",
        timeout: 0,
        dataType: "json",
        url: "https://api.coincap.io/v2/assets",

        success: async function (data) {
            $('#balls').remove();
            coins = data;
            console.log(coins);
            await coins.data.forEach(element => {
                if (Math.sign(element.changePercent24Hr) == -1) {
                    element.PosOrNeg = "negative"
                } else {
                    element.PosOrNeg = "positive"
                }
                element.symbolLower = element.symbol.toLowerCase();
                element.imageUrl = "https://static.coincap.io/assets/icons/" + element.symbolLower + "@2x.png";
            });
            console.log("YEET");
            var template = $("#coinsTemplate").html();
            var renderTemplate = Mustache.render(template, coins);
            $('#coinTable tbody').append(renderTemplate);
            $('#coinTable').DataTable({
                order: [
                    [3, 'dec']
                ]
            });
            $('.dataTables_length').addClass('bs-select');
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
            await $('#modal-content-coinModal').prepend(renderTemplate);
            console.log(coinId);
            getHistory(coinId);
        }

    });
}

async function getHistory(coinId) {
    $.ajax({
        url: "https://api.coincap.io/v2/assets/" + coinId + "/history?interval=d1&start=" + timeWeekAgo + "&end=" + timeToday + "",
        method: "GET",
        timeout: 0,

        success: async function (data) {
            labels = [];
            prices = [];
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

function showGraph() {
    var ctx = $('#myChart');
    if (myChart != undefined) {
        myChart.destroy();
    }
    myChart = new Chart(ctx, {
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
                        labelString: 'Dates'
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
            element: {
                point: {
                    radius: 0
                }
            }
        }
    });
}

async function loadNews() {
    $.ajax({
        type: "GET",
        method: "GET",
        timeout: 0,
        dataType: "json",
        url: "https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key=b1e925a07a3b5ca5f8fba60647d22ab20c64c2e90c1c61741f8a47a15d252c5c",

        success: async function (data) {
            $('#balls').remove();
            articles = data;
            console.log(articles);
            await articles.Data.forEach(element => {
                console.log(element.published_on);
                element.published_on = moment(element.published_on).format('D MMMM kk:mm:ss');
            });
            console.log(moment(1558110651).format('D MMMM kk:mm:ss'));
            console.log(articles);
            var template = $("#newsArticle").html();
            var renderTemplate = Mustache.render(template, articles);
            $('#Articles').append(renderTemplate);
        }
    });
}

async function addCoin(coin) {
    debugger;
    //check if person is logged in
    if (localStorage.getItem('loggedIn') === 'true') {
        console.log(coin);
        let amount = $('#amountOfCoins')[0];
        console.log(amount.value);
        let name = "";
        let price = "";
        let date = moment().format("YYYY-DD-MM");
        console.log(date);
        for (let i = 0; i < coins.data.length; i++){
            console.log(coins.data[i]);
            if (coins.data[i].id == coin){
                name = coins.data[i].name;
                price = coins.data[i].priceUsd;
                break;
            }
        }
        debugger;
        await $.ajax({
            method: "POST",
            url: "app/Ajax.php",
            data: {
                ownerId: localStorage.getItem('id'),
                name: name,
                price: price,
                totalValue: parseFloat(price) * amount,
                amount: amount,
                date: date,
                case: 'addcoin',
            },
            success: function (response) {
                console.log(response);
                let result = JSON.parse(response);
                console.log(result);
            }
        })

    } else {
        var coinmodal = document.getElementById('coinModal');
        coinmodal.style.display = 'none';
        var modal = document.getElementById('myModal');
        modal.style.display = 'block';
    }
}