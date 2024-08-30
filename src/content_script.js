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
    window.location.replace(chrome.runtime.getURL("block_alert.html"));
    //window.location = "block_alert.html";
    return;
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