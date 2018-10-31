$(document).ready(function() {
    //populate info pages
    if (getCurrentPage().startsWith("getting_married.html") || getCurrentPage().startsWith("pre_marriage.html") || getCurrentPage().startsWith("married_life.html")) {
        $('body').html("<div id='header'></div><div id='content_container' class='container beneath_nav' style='margin-bottom:30px;'/><div id='footer'></div>");

        var toFetch = "";
        if (getCurrentPage().startsWith("getting_married.html"))
            toFetch = "Getting Married";
        else if (getCurrentPage().startsWith("pre_marriage.html"))
            toFetch = "Pre-Marriage"
        else if (getCurrentPage().startsWith("married_life.html"))
            toFetch = "Married Life"


        populate_page(getWebsite(), toFetch);

    }
    else if (getCurrentPage().startsWith("search.html")){
      $('body').html("<div id='header'></div><div id='content_container' class='container beneath_nav' style='margin-bottom:30px;'/><div id='footer'></div>");

      var toFetch = "Search";
      

      populate_page(getSearchResults(), toFetch);


    }

    $('#header').load("header.html", function() {
        findNavItemActive("index");
        findNavItemActive("pre_marriage");
        findNavItemActive("getting_married");
        findNavItemActive("married_life");
        findNavItemActive("testimonials");
        findNavItemActive("faq");
    });

    $('#footer').load("footer.html");
});

function findNavItemActive(id) {
    var lookup = id + ".html";
    var className = window.location.href.includes(lookup) ? "active" : "";
    var elemLookup = "#" + id;
    $(elemLookup).addClass(className);
}

function getCurrentPage() {
    var uri = window.location.href;
    return uri.substring(uri.lastIndexOf("/") + 1);
}
