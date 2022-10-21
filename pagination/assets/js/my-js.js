let ITEM_PER_PAGE = 4;
let currentPage =1;
let totalItems =0;
let totalPages =0;


let filmHtmlTemplate = $('#templateHtml');
let showFilmsElement = $('#show-films');


$(document).ready(function () {
    init();
    loadData();
});

function loadData(){   
        $.ajax({
            type: "GET",
            url: "pagination.php",
            data: {
                type:'list',
                limit : ITEM_PER_PAGE,
                offset : 0
            },
            dataType: "json",
        }).done((data)=>{
            appendData(data.items, filmHtmlTemplate, showFilmsElement)
        })  

}

function init(){
    $.ajax({
        type: "GET",
        url: "pagination.php",
        data: {
            type:'count',
           items:ITEM_PER_PAGE
           
        },
        dataType: "json",
    }).done((data)=>{
        
        totalItems = data.totalItems;
        totalPages = data.totalPages; 
        setSelectPageOptions();  
    })  
}





function appendData(items, filmHtmlTemplate, showFilmsElement) {
    if (items.length > 0) {
        $.each(items, (index, value) => {
            let htmlMore = filmHtmlTemplate.html();
            htmlMore = htmlMore.replace(/{image}/g, value.image);
            htmlMore = htmlMore.replace(/{title}/g, value.title);
            htmlMore = htmlMore.replace(/{description}/g, value.description);
            showFilmsElement.append(htmlMore);
        });
    }
    $("body, html").animate({scrollTop: $(document).height()}, 500);
}

function setSelectPageOptions() {
	for (var i = 1; i <= totalPages; i++) {
		if (i != currentPage) {
			$('#slbPages').append('<option value="' + i + '">Page ' + (i) +'</option>');
		} else {
			$('#slbPages').append('<option selected="selected" value="' + i + '">Page ' + (i ) +'</option>');
		}
	}
}

function setPageInfo(){
	$('.pageInfo').text('Page ' + (currentPage) + ' of ' + totalPages);
	
	$('#slbPages').val(currentPage);
	
	if (currentPage == 1) {
		$('.goStart').attr('disabled','disabled');
		$('.goPrevious').attr('disabled','disabled');
	} else {
		$('.goStart').removeAttr('disabled');
		$('.goPrevious').removeAttr('disabled');
	}
	
	if (currentPage == totalPages) {
		$('.goEnd').attr('disabled','disabled');
		$('.goNext').attr('disabled','disabled');
	} else {
		$('.goNext').removeAttr('disabled');
		$('.goEnd').removeAttr('disabled');
	}
}
