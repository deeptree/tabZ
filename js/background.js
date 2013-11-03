
var targetWindow = null;
var tabCount = 0;
var rrr="";
var newtab = null;
//var className="";
//飲用jquery


function start(tab) {
  chrome.windows.getCurrent(getWindows);
}

function getWindows(win) {
  targetWindow = win;
  chrome.tabs.getAllInWindow(targetWindow.id, getTabs);
}

function getTabs(tabs) {
  tabCount = tabs.length;
  // We require all the tab information to be populated.
  chrome.windows.getAll({"populate" : true}, moveTabs);
}

function moveTabs(windows) {
  // open new tab
  openMgr();

  // create new object data
  var data=new Object();
  data.items= new Array();
  // how many windows
  var numWindows = windows.length;
  // how many tabs
  var tabPosition = tabCount;
	var time=Date();

  for (var i = 0; i < numWindows; i++) {
    var win = windows[i];

    if (targetWindow.id != win.id) {
      continue;
    }

    // get quatity of tabs for current window
    var numTabs = win.tabs.length;

    for (var j = 0; j < numTabs; j++) {
      var tab = win.tabs[j];
      var item = new Object();
//           var yqlAPI = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Ftw.yahoo.com%22%20and%20xpath%3D%22%2F%2Fimg%20%7C%20%2F%2Ftitle%22&format=json&diagnostics=true&callback=?";
//           $.getJSON(yqlAPI, function(json){
//           	item.imgurl=json.query.results.title;
//           	//alert(json.query.results.title);
//           });
      //tab就是所有的標簽資料，裡面內容請看http://developer.chrome.com/extensions/tabs.html#type-Tab
      //存
//         chrome.tabs.captureVisibleTab(targetWindow.id,{'quality':'1'},
//         function (strurl){
//         item.imgurl=strurl;
//         });
      item.url=tab.url;
      item.time=time;
    	item.title=tab.title;
  	//item.imgurl="yyyyyy";
      item.desc="kkkkk";
      item.star=0;
      // item.tabid=tab.id;
      data.items[j]=item;

    	// close tab
  		chrome.tabs.remove(tab.id);
	
      tabPosition++;
    }
  }
  //存黨
  chrome.storage.local.set({'unlist':JSON.stringify(data)});
  
  //取黨
  //rrr="";
  //alert("1");
  // chrome.storage.local.get("unlist", function(details){
  //   rrr = details.unlist;
  //   if(!rrr || (rrr == "undefined")) {
  //     chrome.storage.local.set({"unlist":JSON.stringify(data)});
  //   }else{
  //     var dataOld = JSON.parse(rrr); 
  //     // 		var arr=olddata.items;
  //     // 		for (var i = 0; i < arr.length; i++) {
  //     // 			data.items.push(arr[i]); 
  //     // 		}
  //   	var dataNew=new Object();
  //   	dataNew.items= new Array();
  //   	//data.items[0]=item;
  //   	for (var i = 0; i < data.items.length; i++) {
  //     	dataNew.items.push(data.items[i]); 
  //   	}
  //   	for (var i = 0; i < dataOld.items.length; i++) {
  //     	dataNew.items.push(dataOld.items[i]); 
  //   	}
  //   	chrome.storage.local.set({'unlist':JSON.stringify(dataNew)},function(){
  //      //  for (var i = 0; i < data.items.length; i++) {
  //      //  	chrome.tabs.remove(data.items[i].tabid);
  //     	// }
  //       chrome.tabs.reload(newtab.id);
  //   	});
  //   }
  // });

  chrome.tabs.reload(newtab.id);
	
}

function getOneTab(tab){
	var item=new Object();
	item.url=tab.url;
  item.time=Date();
  item.title=tab.title;
  //item.imgurl="yyyyyy";
  item.desc="kkkkk";
  item.star=0;
  	//取黨
  	rrr="";
  	//alert("1");
	chrome.storage.local.get('unlist', function(details){
	rrr = details.unlist;
	if(!rrr){
		var data=new Object();
			data.items= new Array();
			data.items[0]=item;
		chrome.storage.local.set({'unlist':JSON.stringify(data)});
	}else{
		//alert(rrr);
		var dataOld = JSON.parse(rrr); 
// 		data.items.push(item);
			var data=new Object();
			data.items= new Array();
			data.items[0]=item;
			for (var i = 0; i < dataOld.items.length; i++) {
			data.items.push(dataOld.items[i]); 
		}
		chrome.storage.local.set({'unlist':JSON.stringify(data)});
		//alert("2"+JSON.stringify(data));
	}
	chrome.tabs.remove(tab.id);  
  });
}

function getcat1Tab(tab){
	var item=new Object();
	item.url=tab.url;
  item.time=Date();
  item.title=tab.title;
  //item.imgurl="yyyyyy";
  item.desc="kkkkk";
  item.star=0;
  	//取黨
  	rrr="";
  	//alert("1");
	chrome.storage.local.get('later', function(details){
		rrr = details.later;
		if(!rrr){
			var data=new Object();
  			data.items= new Array();
  			data.items[0]=item;
			chrome.storage.local.set({'later':JSON.stringify(data)});
		}else{
			var data = JSON.parse(rrr); 
			data.items.push(item);
			chrome.storage.local.set({'later':JSON.stringify(data)});
			//alert("2"+JSON.stringify(data));
		}
		chrome.tabs.remove(tab.id);  
  });
}

function openMgr(){
  newtab= {'url': 'main.html'};
  chrome.tabs.create(newtab);

}

//chrome.browserAction.setPopup({'popup':'popup.html'});
// Set up a click handler so that we can merge all the windows.
//chrome.browserAction.onClicked.addListener(start);
//ALL
$('#inall').click(function(){
    //chrome.tabs.getCurrent(start);
    chrome.tabs.getSelected(null,start);
});
//單頁未分類
$('#inone').click(function(){

	//className="unlist";
    chrome.tabs.getSelected(null,getOneTab);
});
//單頁分類
$('.catobj').click(function(){
	// alert($(this).children().html());
	//className=$(this).children().html();
	//chrome.tabs.getSelected(null,getOneTab);
	//if("cat1"==$(this).children().html()){
		chrome.tabs.getSelected(null,getcat1Tab);
	//}
	
});
$('#callmgr').click(function(){
    openMgr();
});

function initCatList () {
  chrome.storage.local.get('catlist', function(details){
    var $catlistobj = $("#incat");

    //
    // Check if category list exist or not
    //
    if (details.catlist == "undefined") {
      alert ("Category not found");
      return;
    }

    //
    // Append categories into popup window
    //
    // alert (details.catlist.catlist[0]);
    for (var i = 1; i < details.catlist.catlist.length; i++) {
      if (i == 1) {
        $catlistobj.append ('<div class="catobj h40 pure-u-1 opts firstopt"><div class="txt txt_left">' + details.catlist.catlist[i] + '</div></div>');
      } else if ((i + 1) == details.catlist.catlist.length) {
        $catlistobj.append ('<div class="catobj h40 pure-u-1 opts lastopt"><div class="txt txt_left">' + details.catlist.catlist[i] + '</div></div>');
      } else {
        $catlistobj.append ('<div class="catobj h40 pure-u-1 opts"><div class="txt txt_left">' + details.catlist.catlist[i] + '</div></div>');
      }
    }
  });
}

function initDataCallback () {
  initCatList ();
}

function dataAmountCallback (dataLength) {
  if (dataLength == 0) {
    var catobj = new Object ();

    //
    // Category not found, create defaults
    //
    catobj.catlist = new Array ();
    catobj.catlist[0] = "unlist";
    catobj.catlist[1] = "later";
    catobj.catlist[2] = "job";
    catobj.catlist[3] = "life";
    chrome.storage.local.set({"catlist": catobj}, initDataCallback);
    return;
  }

  initCatList ();
}

function initCategory () {
  chrome.storage.local.getBytesInUse ("catlist", dataAmountCallback);
}

$( document ).ready(function () {
  if ($("#incat").length > 0) {
    initCategory ();
  // } else {

  //   // Sortable and connectable lists with visual helper
  //   $('#catlist .sortable-list').sortable({
  //       connectWith: '#catlist .sortable-list',
  //       placeholder: 'placeholder',
  //   });

  }
});


