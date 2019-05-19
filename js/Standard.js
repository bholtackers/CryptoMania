let username = "";
async function load() {
    if (localStorage.getItem('loggedIn') === 'true') {
        username = localStorage.getItem('username');
        await loggedInNavbar();
    }
    if (localStorage.getItem('admin') === '1') {
        await AdminNavbar();
    }
    if (location.href.includes("index.php") || location.href.includes("Index.php")) {
        await getCoins();
    }
    if (location.href.includes("news.php") || location.href.includes("News.php")) {
        await loadNews();
    }
}

function loggedInNavbar() {
    let navbar = ".navbar-nav";
    $(navbar).after("<a class='navbar-brand white' id='welcome'>Welcome " + username + "</a>");
    $(navbar).append("<li class='nav-item'><a class='nav-link' href='./About.php'>About us</a></li>");
    $(navbar).append("<li class='nav-item'><a class='nav-link'>Contact us</a></li>");
    $("#modalButton").remove();
    $("#welcome").after("<button onclick='logout();' class='btn btn-outline-light my-2 my-sm-0'>Logout</button>");
}

function AdminNavbar() {
    //$(".navbar-nav").append("<li class='nav-item'><a class='nav-link' href='./Admin.php'>Admin page</a></li>");
}

function signIn() {
    $(".error").remove();
    let email = $("#SignInEmail").val();
    let password = $("#SignInPassword").val();

    $.ajax({
        method: "POST",
        url: "sql/Login.php",
        data: {
            "email": email,
            "password": password,
        },
        success: function (response) {
            let result = JSON.parse(response);
            console.log(result);
            if (result[1] === 'Success') {
                $("#SignInEmail").empty();
                $("#SignInPassword").empty();
                localStorage.setItem('username', result[0].username);
                localStorage.setItem('email', result[0].email);
                localStorage.setItem('admin', result[0].admin);
                localStorage.setItem('id', result[0].id);
                localStorage.setItem('loggedIn', 'true');
                username = localStorage.getItem('username');
                loggedInNavbar();
                $(".signin").before("<p class='success'>You signed in successfully.</p>");
                modal.style.display = "none";
                console.log(location.pathname);
                location.href = location.pathname;
                console.log(location.href);
            } else {
                for (let i = 0; i < result.length; i++) {
                    console.log(result[i]);
                    switch (result[i]) {
                        case "Email is required":
                            $("#SignInEmail").after("<p class='error'>" + result[i] + "</p>");
                            break;
                        case "Password is required":
                            $("#SignInPassword").after("<p class='error'>" + result[i] + "</p>");
                            break;
                        case "Wrong email/password combination":
                            $("#SignInPassword").after("<p class='error'>" + result[i] + "</p>");
                            break;
                    }
                }
            }
        }
    })
}

function signUp() {
    $(".error").remove();
    let username = $('#SignUpUsername').val();
    let email = $('#SignUpEmail').val();
    let password = $('#SignUpPassword').val();
    let confirmpassword = $('#confirmSignUpPassword').val();

    $.ajax({
        method: "POST",
        url: "sql/Registration.php",
        data: {
            "username": username,
            "email": email,
            "password": password,
            "confirmpassword": confirmpassword
        },
        success: function (response) {
            if (response === 'Success') {
                $("#SignUpUsername").empty();
                $("#SignUpEmail").empty();
                $("#SignUpPassword").empty();
                $("#confirmSignUpPassword").empty();
                $(".signup").before("<p class='success'>You register successfully. You can now log in</p>")
            } else {
                let result = JSON.parse(response);
                for (let i = 0; i < result.length; i++) {
                    console.log(result[i]);
                    switch (result[i]) {
                        case "Username is required":
                            console.log("here");
                            $("#SignUpUsername").after("<p class='error'>" + result[i] + "</p>");
                            break;
                        case "Email is required":
                            $("#SignUpEmail").after("<p class='error'>" + result[i] + "</p>");
                            break;
                        case "Password is required":
                            $("#confirmSignUpPassword").after("<p class='error'>" + result[i] + "</p>");
                            break;
                        case "The two passwords do not match":
                            $("#confirmSignUpPassword").after("<p class='error'>" + result[i] + "</p>");
                            break;
                        case "Username already exists":
                            $("#SignUpUsername").after("<p class='error'>" + result[i] + "</p>");
                            break;
                        case "email already exists":
                            $("#SignUpEmail").after("<p class='error'>" + result[i] + "</p>");
                            break;
                        case "Email is not valid":
                            $("#SignUpEmail").after("<p class='error'>" + result[i] + "</p>");
                            break;
                    }
                }
            }
        }
    })

}

function logout() {
    username = "";
    localStorage.removeItem('email');
    localStorage.removeItem('username');
    localStorage.removeItem('admin');
    localStorage.setItem('loggedIn', 'false');
    window.location.href = './index.php';

}

//#region 
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("modalButton");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
    modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

//#endregion