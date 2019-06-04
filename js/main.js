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
    //check if person is logged in
    if (localStorage.getItem('loggedIn') === 'true') {
        let amount = $('#amountOfCoins')[0].value;
        let name = "";
        let price = "";
        let date = moment().format("YYYY-DD-MM");
        for (let i = 0; i < coins.data.length; i++) {
            if (coins.data[i].id == coin) {
                name = coins.data[i].name;
                price = coins.data[i].priceUsd;
                break;
            }
        }
        let userId = localStorage.getItem('id');
        let totalValue = price * amount;
        console.log(name, amount, price, date, userId, totalValue);
        await $.ajax({
            method: "POST",
            url: "app/Ajax.php",
            data: {
                ownerId: userId,
                name: name,
                price: price,
                totalValue: totalValue,
                amount: amount,
                date: date,
                case: 'addcoin'
            },
            success: function (response) {
                console.log(response);
                var coinmodal = document.getElementById('coinModal');
                coinmodal.style.display = 'none';
                $('.modal-backdrop').remove();
                $("#mainBody").prepend("<div class='animated fadeInLeft alert alert-success' role='alert'>Successfully added " + name + " to your cryptofolio! <a href='./Cryptofolio.php' class='alert-link'>Click here</a> To see your purchased coins!  <button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>");
            }
        })

    } else {
        var coinmodal = document.getElementById('coinModal');
        coinmodal.style.display = 'none';
        var modal = document.getElementById('myModal');
        modal.style.display = 'block';
    }
}

async function getCoinsFromUser() {
    let userId = localStorage.getItem('id');
    await $.ajax({
        method: "POST",
        url: "app/Ajax.php",
        data: {
            ownerId: userId,
            case: 'getcoins' 
        },
        success: async function (response) {
            let result = JSON.parse(response);
            console.log(result);
            if (result.length > 0) {
                console.log("found some!");
                //TODO: Show the results
                //TODO: Give option to delete the coins
            } else {
                console.log("didn't find any");
                //TODO: TELL M TO BUY SOME COINS!
            }
        }
    });
}