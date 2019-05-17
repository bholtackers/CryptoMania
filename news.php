<?php include './inc/Header.html' ?>
<?php include './inc/Navbar.html' ?>

<div id="mainBody">
    <div id='Articles' class="row mb-2">
        <template id='newsArticle'>
            {{#Data}}
            <div class="col-md-6">
                <div class="card flex-md-row mb-4 box-shadow h-md-250">
                    <div class="card-body d-flex flex-column align-items-start">
                        <strong class="d-inline-block mb-2 text-primary">{{source}}</strong>
                        <h3 class="mb-0">
                            <a class="text-dark">{{title}}</a>
                        </h3>
                        <div class="mb-1 text-muted">{{published_on}}</div>
                        <p class="card-text mb-auto">{{body}}</p>
                        <a href='{{url}}'>Continue reading</a>
                    </div>
                </div>
            </div>
            {{/Data}}
        </template>
    </div>
    <?php include './inc/Loading.html' ?>
</div>

<?php include './inc/coinModal.html' ?>
<?php include './inc/Modal.html' ?>

<?php include './inc/Footer.html' ?>