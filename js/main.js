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
    $('#userCoinsTemplate').empty();
    let userId = localStorage.getItem('id');
    await $.ajax({
        method: "POST",
        url: "app/Ajax.php",
        data: {
            ownerId: userId,
            case: 'getcoins'
        },
        success: async function (response) {
            let userCoins = {
                data: [

                ]
            }
            let result = JSON.parse(response);
            console.log(result);
            userCoins.data = result;
            if (result.length > 0) {
                console.log("found some!");
                var template = $("#userCoinsTemplate").html();
                var renderTemplate = Mustache.render(template, userCoins);
                $('#userCoinTable tbody').append(renderTemplate);
                $('#userCoinTable').DataTable({
                    order: [
                        [1, 'asc']
                    ]
                });
                $('.dataTables_length').addClass('bs-select');
                //TODO: Give option to delete the coins
            } else {
                console.log("didn't find any");
                $("#mainBody").prepend("<div class='animated fadeInLeft alert alert-danger' role='alert'>Looks like you don't own any coins yet! <a href='./index.php' class='alert-link'>Click here</a> To purchase your first coin!  <button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>");
            }
        }
    });
}
var modal = document.getElementById('buyMoreModal');
// Get the <span> element that closes the modal
var spanClose = document.getElementById("closeBuyMore");


// When the user clicks on <span> (x), close the modal
spanClose.onclick = function () {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

function buyMore(coinId, value, current, coinName) {
    modal.style.display = 'block';
    $('#coinTitle').text(coinName);
    $('#buyButton').attr({
        'data-coinId': coinId,
        'data-value': value,
        'data-current': current
    });
}

async function finishPurchase() {
    let button = $('#buyButton');
    let coinId = button.attr('data-coinId');
    let value = button.attr('data-value');
    let current = button.attr('data-current');
    let wanted = $('#moreNumber')[0].value;
    let totalAmount = parseInt(current) + parseInt(wanted);
    let totalValue = parseFloat(value) * totalAmount;
    await $.ajax({
        method: "POST",
        url: "app/Ajax.php",
        data: {
            coinId: coinId,
            totalValue: totalValue,
            totalAmount: totalAmount,
            case: 'updateCoin'
        },
        success: async function (response) {
            console.log(response);
            $("#buymorebody").append("<div class='animated fadeInLeft alert alert-success' role='alert'>Successfully bought more coins! The page will refresh in 2 seconds</div>");
            setTimeout(function () {
                location.reload();
            }, 2500);
        }
    });
}

var modalSell = document.getElementById('sellCoinsModal');
// Get the <span> element that closes the modal
var spanCloseSell = document.getElementById("closeSellCoins");


// When the user clicks on <span> (x), close the modal
spanCloseSell.onclick = function () {
    modalSell.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target === modalSell) {
        modalSell.style.display = "none";
    }
};

function sell(coinId, value, current, coinName) {
    console.log('Here');
    modalSell.style.display = 'block';
    $('#coinTitleSell').text(coinName);
    $('#sellNumber').attr({
        'max': current
    });
    $('#sellButton').attr({
        'data-coinId': coinId,
        'data-value': value,
        'data-current': current
    });
}

async function sellCoins() {
    let button = $('#sellButton');
    let coinId = button.attr('data-coinId');
    let value = button.attr('data-value');
    let current = button.attr('data-current');
    let sell = $('#sellNumber')[0].value;
    let totalAmount = parseInt(current) - parseInt(sell);
    let totalValue = parseFloat(value) * totalAmount;
    await $.ajax({
        method: "POST",
        url: "app/Ajax.php",
        data: {
            coinId: coinId,
            totalValue: totalValue,
            totalAmount: totalAmount,
            case: 'sellCoin'
        },
        success: async function (response) {
            console.log(response);
            if (response == 'Success') {
                $("#sellmorebody").append("<div class='animated fadeInLeft alert alert-success' role='alert'>Successfully sold " + sell + " coins! The page will refresh in 2 seconds</div>");
                setTimeout(function () {
                    location.reload();
                }, 2500);
            } else {
                $("#sellmorebody").append("<div class='animated fadeInLeft alert alert-success' role='alert'>Successfully sold all coins! The page will refresh in 2 seconds</div>");
                setTimeout(function () {
                    location.reload();
                }, 2500);
            }
        }
    });
}




//websocket testing

const tradeWs = new WebSocket('wss://ws.coincap.io/trades/binance')
let array = {
    data: []
}
tradeWs.onmessage = function (msg) {
    array.data = JSON.parse(msg.data);
    let currentCoin = {
        "name": array.data.base,
        "price": array.data.priceUsd
    }
    //console.log(currentCoin);
    let price = $("#price_" + currentCoin.name + "")[0];
    if (price != undefined) {
        if (currentCoin.price != undefined) {
            price.innerText = currentCoin.price;
        }
    }
}