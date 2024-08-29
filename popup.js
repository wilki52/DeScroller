console.log("This is a popup!");

const url_span = document.querySelector(".current_url");
console.log(url_span);
console.log("ello");

var current_url;

chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    var activeTab = tabs[0];
    var activeTabId = activeTab.id; // or do whatever you need
    console.log(activeTab.url);
    url_span.innerHTML = activeTab.url;
    current_url = activeTab.url;
    var tmp = document.createElement('a');
    tmp.href = current_url;

    var paths = current_url.split('/');
    //2 www.reddit.com
    //4 subreddit
    //5 check if "comments". if it is, it clears!!

    paths[3]
    if (paths[2] == "www.reddit.com"){
        console.log('redditor!');
        //if (paths.length <6){
        //    return;
        //}
        if (paths[5] == "comments"){
            console.log('allowed')
        }
        else{
            console.log('scrolling rn? deadass?')

            var link = document.createElement('link');
            link.setAttribute('rel', 'stylesheet');
            link.setAttribute('href', 'block.css');
            document.head.appendChild(link);
        }
        
        
    }
    else{
        console.log('nope');
    }

    console.log(tmp.hostname);
    


});


//clean up url
//function get_domain(url){
    //https://www.reddit.com/r/XXXX/comments checks

    //get subreddit. if subreddit in whitelist, dont block.
    ///if subreddit in blacklist, block.
    //https:///www.reddit.com/anything else gets blacklisted.

    
//}

