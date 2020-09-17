chrome.contextMenus.create({
  contexts: ['browser_action'],
  title: 'Haz una Donación',
  onclick: function (e) {
    var newURL = "https://www.flow.cl/btn.php?token=2lbi11r";
    chrome.tabs.create({ url: newURL });
  }
}, function () { })