
async function add_to_whitelist(subreddit){
    let list = await chrome.storage.local.get(["whitelist"]);
    let whitelist = list.whitelist || [];
    
    if (whitelist.includes(subreddit)){
        return 0;
    }
    whitelist.push(subreddit);
    await chrome.storage.local.set({whitelist});

    return 1;
}

async function remove_from_whitelist(subreddit){
    let list = await chrome.storage.local.get(["whitelist"]);
    let whitelist = list.whitelist || [];
    
    var index = whitelist.indexOf(subreddit);
    if (index !== -1) {
        whitelist.splice(index, 1);
    }

    await chrome.storage.local.set({whitelist});
}

async function add_to_blacklist(subreddit){
    let list = await chrome.storage.local.get(["blacklist"]);
    let blacklist = list.blacklist || [];
    
    if (blacklist.includes(subreddit)){
        return 0;
    }
    blacklist.push(subreddit);
    await chrome.storage.local.set({blacklist});

    return 1;
}

async function remove_from_blacklist(subreddit){
    let list = await chrome.storage.local.get(["blacklist"]);
    let blacklist = list.blacklist || [];
    
    var index = blacklist.indexOf(subreddit);
    if (index !== -1) {
        blacklist.splice(index, 1);
    }

    await chrome.storage.local.set({blacklist});
}


///buttons
const whitelist = document.querySelector(".whitelist");
const blacklist = document.querySelector(".blacklist");
const w_button = document.querySelector('.add-w');
const b_button = document.querySelector('.add-b');


//add to ui list
async function add_to_html_list(list, val, id){
    //cringe solution but i dont wanna do async rn lol
    

    let li = document.createElement("li");
    li.textContent = val;
    const button = document.createElement("button");
    button.textContent  = "X";

    button.addEventListener("click", function(){
        if (id=="#white") remove_from_whitelist(val);
        else remove_from_blacklist(val);
        button.parentNode.remove();
        
    });

    li.appendChild(button);
    list.appendChild(li);
    
}

async function init(){
    let listw = await chrome.storage.local.get(["whitelist"]);
    listwhite  = listw.whitelist || [];
    listwhite.forEach(element=>{
        add_to_html_list(whitelist, element, "#white");
    });
    
    let listb = await chrome.storage.local.get(["blacklist"]);
    listblack = listb.blacklist || [];
    listblack.forEach(element=>{
        add_to_html_list(blacklist, element, "#black");
    });
}
async function on_button_click(){
    await init();

    w_button.addEventListener("click", function(event){
        const input = document.querySelector("#white");
        const val = input.value.toLowerCase();

        var pass = true;
        for (var i=0; i< whitelist.children.length; i++){
            if ((val+"X") ==whitelist.children[i].textContent){
                alert("subreddit already whitelisted");
                pass = false;
            }
        }
        if (pass){
            add_to_whitelist(val);
            add_to_html_list(whitelist, val, "#white");
        }
    });
    b_button.addEventListener("click", function(event){
        const input = document.querySelector("#black");
        const val = input.value.toLowerCase();

        var pass = true;
        for (var i=0; i< blacklist.children.length; i++){
            if ((val+"X") ==blacklist.children[i].textContent){
                alert("subreddit already blacklisted");
                pass = false;
            }
        }
        if (pass){
            add_to_blacklist(val);
            add_to_html_list(blacklist, val, "#black");
        }

    });
}

on_button_click();

