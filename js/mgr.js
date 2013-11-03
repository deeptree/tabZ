var $g_res_gap = 114;
var m_catlist;
var m_catidx = 0;

function resizeUnclassified () {
    var displayWidth = window.innerHeight;
    var $el = $('#unclassified');
    var $window = $(window);
    var $new_size = $window.height() - ($g_res_gap + ($el.outerHeight(true) - $el.height()));

    if ($el.outerHeight(true) > $new_size) {
        $el.css ("height", $new_size);
        $el.css ("overflow-y", "scroll");
    }
}

var m_catname = "";

// function initCatCont ()
// {
//     alert ("m_catidx=" + m_catidx + ", name=" + m_catlist[m_catidx]);
//     m_catidx++;
//     if (m_catidx >= m_catlist.length) {
//         return;
//     }
//     chrome.storage.local.getBytesInUse (m_catlist[m_catidx], catListAmountCallback);
// }

function catListAmountCallback (dataLength) {
    // alert ("catListAmountCallback: " + m_catlist[m_catidx]);
    if (dataLength == 0) {
        m_catidx++;
        if (m_catidx >= m_catlist.length) {
            // No more category
            return;
        }
        // Get next item amount of category
        chrome.storage.local.getBytesInUse (m_catlist[m_catidx], catListAmountCallback);
        return;
    }
    // List items of current category
    initEachCatCont (m_catlist[m_catidx]);
}

function initEachCatCont (catname) {
    // alert (catname);
    if (catname == "unlist") {
        chrome.storage.local.get(catname, function(details){
            // if (details.unlist == "undefined") {
            //     alert ("List not found");
            //     return;
            // }
            // var items = JSON.parse (details.unlist);
            var items = JSON.parse (details).items;
            //
            // TODO: list all items in unlist
            //
        });
        return;
    }
    chrome.storage.local.get(catname, function(details){
        //
        // TODO: list all items in each category
        //
        // var node = $("#classified").
        // m_catidx++;
        // if (m_catidx >= m_catlist.length) {
        //     return;
        // }
        // chrome.storage.local.getBytesInUse (m_catlist[m_catidx], catListAmountCallback);
    });
}

function initAllData () {
    chrome.storage.local.get("catlist", function(details){
        var $classfiedlist = $("#classified");
        var cssbox;
        // alert ("123");

        m_catlist = details.catlist.catlist;
        //
        // Create categories
        //
        for (var i = 1; i < details.catlist.catlist.length; i++) {
            if (i % 2) {
                cssbox = "graybox";
            } else {
                cssbox = "whitebox";
            }
            $classfiedlist.append (
                '<div class="' + cssbox + '"><div class="title"><h2>' +
                 details.catlist.catlist[i] + 
                 '</h2></div></div>'
                 );
        }
        //
        // Start to add items
        //
        m_catidx = 1;
        chrome.storage.local.getBytesInUse (m_catlist[m_catidx], catListAmountCallback);
    });
}

function unlistContAmountCallback (dataLength) {
    // alert (dataLength);
    if (dataLength == 0) {
        return;
    }
    chrome.storage.local.get('unlist', function(details){
        // alert ("unlist: " + details);

        var $unclassifiedobj = $("#unclasssort");
        // var dateTime = new Date();
        var items = JSON.parse (details.unlist).items;
//        var curTime = (items.length > 0) ? items[0].time ? "";
        var curTime = "";
        var htmlstr = "";
        //
        // TODO:
        //
        // alert ("1:" + items + ",2:" + items.items);
        for (var i = 0; i < items.length; i++) {
            if (curTime != items[i].time) {
                curTime = items[i].time;
                if ( i != 0) {
                    htmlstr += '</ul>';
                    // $unclassifiedobj.append ('</ul>');
                }
                htmlstr += '<ul><li class="time">' + 
                    // dateTime.toLocaleString() + 
                    items[i].time + 
                    '<span class="operation"><span class="btn">Resotre all</span></span><span class="operation"><span class="btn">Delete all</span></span></li>';
                // $unclassifiedobj.append (
                //     '<ul><li class="time">' + 
                //     // dateTime.toLocaleString() + 
                //     items[i].time + 
                //     '<span class="operation"><span class="btn">Resotre all</span></span><span class="operation"><span class="btn">Delete all</span></span></li>');
            }
            htmlstr += '<li><img src="' + 
                'images/logo.jpg' + 
                '" width="16" height="16"><span class="list_item">' + 
                '<a href="' +
                items[i].url + 
                '">' +
                items[i].title + 
                '</a>' +
                '</span></li>';

            // $unclassifiedobj.append (
            //     '<li><img src="' + 
            //     'images/logo.jpg' + 
            //     '" width="16" height="16"><span class="list_item">' + 
            //     '<a href="' +
            //     items[i].url + 
            //     '">' +
            //     items[i].title + 
            //     '</a>' +
            //     '</span></li>');
            // if (curTime != items[i].time) {
            //     curTime = items[i].time;
            // }
        }
        htmlstr += '</ul>';
        $unclassifiedobj.append (htmlstr);
        // $unclassifiedobj.append ('</ul>');
        // $unclassifiedobj.append (
        //     '<li><img src="images/logo.jpg" width="16" height="16"><span class="list_item">' + 
        //     ''
        //     );
    });
}

function initUnListData () {
    chrome.storage.local.getBytesInUse ("unlist", unlistContAmountCallback);
}

$(function() {
    $("body").css("overflow", "hidden");

    $.fn.scrollBottom = function() {
        return $(document).height() - this.scrollTop() - this.height();
    };

    var $window = $(window);
    $window.bind("scroll resize", resizeUnclassified);
    resizeUnclassified ();
    initUnListData ();
    initAllData ();
});

// // Sortable and connectable lists with visual helper
// $('#catlist .sortable-list').sortable({
//     connectWith: '#catlist .sortable-list',
//     placeholder: 'placeholder',
// });

