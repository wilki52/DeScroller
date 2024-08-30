console.log('content script');
//init
onUrlChange();

//mutation observer for DOM tree change
let lastUrl = location.href; 
let url;
new MutationObserver(() => {
  url = location.href;
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

async function get_whitelist(){
    let whitelist = await chrome.storage.local.get(["whitelist"]);
    if (whitelist.whitelist == undefined) return [];
    return whitelist.whitelist;

}
async function get_blacklist(){
    let blacklist = await chrome.storage.local.get(["blacklist"]);
    if (blacklist.blacklist==undefined) return [];
    return blacklist.blacklist;
}

async function onUrlChange() {
    console.log('URL changed!', location.href);

    var paths = location.href.split('/');

    if ((/^https:\/\/(www\.)?reddit\.com\/.*\/comments\/.*/).test(location.href)){
        //get array from storage.
        const list = await get_blacklist();
        alert(list);
        if (list.includes(paths[4])){
            blockSite();
        }
        //check if subreddit is in this array.
    }
    else{
        //res = await get_status();
        res = await get_status();
        if (res==true){
            //get whitelist
            const list = await get_whitelist();
            //check if subreddit in whitelist.
            //alert(list+ " --- "+ paths[4]);

            if (!list.includes(paths[4].toLowerCase())){
                blockSite();
            }

            
        }
        
    }
}

function blockSite(){
    window.location.replace(chrome.runtime.getURL("block_alert.html"));
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