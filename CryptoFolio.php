<?php include './inc/Header.html' ?>
<?php include './inc/Navbar.html' ?>

<div id="mainBody">
<table id='userCoinTable' class='animated fadeInDown table table-hover rainbowTransparent white'>
        <thead>
            <tr>
                <th class='hidden' scope='col'> id </th>
                <th scope='col'> Coin </th>
                <th scope='col'> Price </th>
                <th scope='col'> Amount </th>
                <th scope='col'> Total Value </th>
                <th scope='col'> Bought on </th>
                <th scope='col'> Buy more </th>
                <th scope='col'> Sell coin </th>
            </tr>
        </thead>
        <tbody>
            <template id="userCoinsTemplate">
                {{#data}}
                <tr>
                    <td class='hidden' id='{{id}}'>{{id}}</td>
                    <td>{{name}}</td>
                    <td>{{price}} </td>
                    <td>{{amount}}</td>
                    <td>{{totalValue}}</td>
                    <td>{{bought_on}}</td>
                    <td> <button type='button' class='btn modalbtn btn-primary' onclick='buyMore({{id}}, {{price}}, {{amount}}, "{{name}}")'> Buy </button> </td>
                    <td> <button type='button' class='btn modalbtn btn-danger' onclick='sell({{id}}, {{price}}, {{amount}}, "{{name}}")''> Sell </button> </td>
                </tr>
                {{/data}}
            </template>
        </tbody>
    </table>
</div>
<?php include './inc/buyMoreModal.html' ?>
<?php include './inc/sellCoinsModal.html' ?>

<?php include './inc/Modal.html' ?>
<?php include './inc/Footer.html' ?>