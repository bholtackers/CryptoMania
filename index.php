<?php include './inc/Header.html' ?>
<?php include './inc/Navbar.html' ?>

<div id="mainBody">
    <table id='coinTable' class='animated fadeInDown table table-hover rainbowTransparent white'>
        <thead>
            <tr>
                <th scope='col'> Short </th>
                <th scope='col'> Coin </th>
                <th scope='col'> Price </th>
                <th scope='col'> Market Cap </th>
                <th scope='col'> %24hr </th>
                <th scope='col'> More info </th>
            </tr>
        </thead>
        <tbody>
            <template id="coinsTemplate">
                {{#data}}
                <tr>
                    <td>{{symbol}}</td>
                    <td>{{name}}</td>
                    <td>{{priceUsd}} </td>
                    <td>{{marketCapUsd}}</td>
                    <td>{{volumeUsd24Hr}}</td>
                    <td> <button type='button' class='btn modalbtn btn-primary' data-toggle="modal"
                            data-target="#coinModal" onclick='getCoinInfo("{{id}}");'> More Info </button> </td>
                </tr>
                {{/data}}
            </template>
        </tbody>
    </table>
    <?php include './inc/Loading.html' ?>
</div>

<?php include './inc/coinModal.html' ?>
<?php include './inc/Modal.html' ?>

<?php include './inc/Footer.html' ?>