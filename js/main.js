//example API: https://docs.pokemontcg.io

let coins = [];

function getCoins() {
    $.ajax({
        type: "GET",
        method: "GET",
        timeout: 0,
        dataType: "json",
        url: "https://api.coincap.io/v2/assets",

        success: function (data) {
            coins = data;
            var template = $("#coinsTemplate").html();
            var renderTemplate = Mustache.render(template, coins);
            $('#coinTable tbody').append(renderTemplate);
        }
    });
}


function getCoinInfo(coinId) {
    let coin;
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "https://api.coincap.io/v2/assets/" + coinId,

        success: function (data) {

            coin = data;

            var template = $("#modal-template").html();

            var renderTemplate = Mustache.render(template, coin);

            $('#modal-template-box').remove();
            $('.modal-content').prepend(renderTemplate);

        }

    });
}


$(document).ready(function () {
    getCoins();
});