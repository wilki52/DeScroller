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

var res;

let read_status = async (on) => {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get([on], function (result) {
            if (result[on] === undefined) {
            reject();
            } else {
            resolve(result[key]);
            }
      });
    });
  };

  //it could be shorter but i wanted to use promises lol
async function get_status() {
    const promise = await new Promise(function(res, rej){
        chrome.storage.local.get({'on': true}, (result)=>{
            if (result.on===undefined){
                
                rej();
            }
            else{
                res(result.on);
            }
        });
    });
    return promise;
}

async function onUrlChange() {
    console.log('URL changed!', location.href);
    if ((/^https:\/\/(www\.)?reddit\.com\/.*\/comments\/.*/).test(location.href)){
    }
    else{
        //res = await get_status();
        res = await get_status();
        //alert("write: "+ res);
        if (res==true){
            blockSite();
        }
        
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