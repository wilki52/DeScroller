console.log('content script');
//init
onUrlChange();

//mutation observer for DOM tree change
let lastUrl = location.href; 
new MutationObserver(() => {
  const url = location.href;
  console.log(lastUrl+ " vs "+ url + ".");
  if (url !== lastUrl) {
    lastUrl = url;
    removeBlocks;
    onUrlChange();
    
  }
}).observe(document, {subtree: true, childList: true});


function onUrlChange() {
    console.log('URL changed!', location.href);
    if ((/^https:\/\/(www\.)?reddit\.com\/.*\/comments\/.*/).test(location.href)){
    }
    else{
        blockSite();
    }
}

function blockSite(){
    var link = document.createElement('link');
    link.className = "block";
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', chrome.runtime.getURL("block.css"));
    document.head.appendChild(link);
}

function removeBlocks(){
    var links = document.querySelectorAll(block);
    links.forEach(element=> {
        element && element.parentNode.removeChild(element);
    });
        
}
function blacklist(subreddit){

}
function whitelist(subreddit){
    
}