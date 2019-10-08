var template = $("#template").html();
var title = new RegExp('{{title}}','g')
var collections = $("[data-collection]");
var mainRow = $("#mainRow");

collections.on('click', displayCollections);

display();

$(".back-to-top").click(function(){
    $("html, body").animate({scrollTop: 0}, 1000)
});

function display(){
    mainRow.html("");
    $.ajax({
        url : "shop.json",
        method : "get",
        dataType : "json"
    })
    .done(function(res){
        console.log(res);
        var text = "";
        res.forEach(function(e){
            text = template.replace("{{imgSrc}}", e.imgSrc)
                           .replace(title, e.productTitle)
                           .replace("{{model}}", e.model)
                           .replace("{{price}}", e.price);
            mainRow.append(text);
        })
    })
}


function displayCollections(e) {
    mainRow.html("");
    e.preventDefault();
    var col = $(this).data('collection');
    
    $.ajax({
        url : "shop.json",
        method : "get",
        dataType : "json"
    })
    .done(function(res){
        if (col === 'male' || col === 'female') {
            var colFilter = res.filter(function(el){
                return el.colection === col;
            })
            colFilter.forEach(function(e){
                text = template.replace("{{imgSrc}}", e.imgSrc)
                               .replace(title, e.productTitle)
                               .replace("{{model}}", e.model)
                               .replace("{{price}}", e.price);
                mainRow.append(text);
            })
        } else if(col === 'newCol' || col === 'popular' || col === 'action') {
            var colFilter = res.filter(function(el){
                return el[col];
            })
            colFilter.forEach(function(e){
                text = template.replace("{{imgSrc}}", e.imgSrc)
                               .replace(title, e.productTitle)
                               .replace("{{model}}", e.model)
                               .replace("{{price}}", e.price);
                mainRow.append(text);
            })
        }
    })
}