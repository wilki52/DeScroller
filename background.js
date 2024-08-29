let blocked_sites = ["reddit.com/r/greentext"]
console.log("background check!");


chrome.webNavigation.onCompleted.addListener(function() {
    console.log("This is my favorite website!");
    var link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', 'block.css');
    document.head.appendChild(link);
}, {url: [{urlMatches : 'https://www.reddit.com/*'}]});