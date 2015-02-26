
chrome.contextMenus.create({ title: "Add to shortcuts", contexts: ["all"] });

chrome.contextMenus.onClicked.addListener(function (info, tab) {
	var href = info.linkUrl;
	
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {href: href});
	});
});
