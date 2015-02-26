

// debugger;

$(function () {
    var anchorStyle = "text-decoration:none";

    var newDiv = $('<div nowrap="" class="main-task" style="margin-left:0.3em;"><a style="color:#000000;text-decoration:none;" title="WebsFear"></div>');

    var childDiv = $('<div class="nav-child-container" style="margin-left: 0.3em; display: block;" id="N0"></div>');

    var frame = $('frame[name=navigation]');
    var leftTree = frame.contents().find('td.navtree');

    leftTree.append(newDiv);
    var childDiv = $('<div id="websfear" class="nav-child-container" style="margin-left: 0.3em; display: block;"></div>');
    var anchors = $('div', frame.contents()).find('div.nav-child-container, div.sub-child-container').find('a');

    var commonLinks = ["Application servers", "Enterprise Applications", "Queue connection factories", "Queues", "Data sources", "Secure administration, applications, and infrastructure", "WebSphere Variables", "Shared Libraries", "Save Changes to Master Repository"];

    var portalLinks = ["WebSphere application servers", "WebSphere enterprise applications", "Global security"]

    var linksAllowed = $.merge($.merge([], commonLinks), portalLinks);

    var lowerCaseLinksAllowed = $.map(linksAllowed, function (item) {
	return item.toLowerCase();
    });

    $.each(anchors, function() {
	var item = $(this);
	var href = item.attr('href');
	var title = item.attr('title');
	var text = item.text();
	if($.inArray(text.toLowerCase(), lowerCaseLinksAllowed) === -1) {
	    return;
	}
	var element = createMenuLink(href, text, title);
	childDiv.append(element);
    });
    leftTree.append(childDiv);

    function createSubLink(href, text, title) {
	return $('<ul class="nav-child" dir="ltr"><li class="navigation-bullet"><a style="text-decoration:none" dir="ltr" href="' + href + '" target="detail" title="' + title + '">' + text +'</a></li></ul>');
    }

    function createMenuLink(href, text, title) {
	return $('<div nowrap="" class="main-task" style="margin-left:0.3em;"><a style="color:#000000;text-decoration:none;" href="' + href + '" target="detail" title="' + title + '">' + text + '</a></div>');
    }

    function findMenu(text) {
	return $('frame[name=navigation]').contents().find('#websfear a').filter(function() { return $(this).text() === text; }).parent();
    }

    function findAnchorTextForHref(href) {
	$('frame[name=detail]').contents().find("a").filter(function() { return this.href === href; }).parent();
    }


    chrome.runtime.onMessage.addListener(function(request) {
	var href = request.href;
	var text = findAnchorTextForHref(href);
	
	
	findMenu(text).append(createSubLink(href));
    });
});
