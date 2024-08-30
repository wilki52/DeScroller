console.log("This is a popup!");


//get on status
//if on, 
//init
async function get_status() {
    const promise = await new Promise(function(res, rej){
        chrome.storage.local.get({'on': true}, (result)=>{
            if (result.on==undefined){
                rej();
            }
            else{
                res(result.on);
            }
        });
    });
    return promise;
}
async function init_logo(){
    const btn_stat = await get_status();
    if (btn_stat){
        turn_on(button);
    }
    else{
        turn_off(button);
    }

}



//init
var button = document.querySelector(".logo");
init_logo();

button.addEventListener("click", function(){
    if (button.classList.contains("on")) {
        turn_off(button);
    }
    else{
        turn_on(button);
    }
    
});

async function turn_on(btn){
    btn.classList.remove("off");
    btn.classList.add("on");
    await chrome.storage.local.set({on : true})
}
async function turn_off(btn){
    btn.classList.remove("on");
    btn.classList.add("off");
    await chrome.storage.local.set({ on : false})
}

var edit_btn = document.querySelector(".edit-btn");

edit_btn.addEventListener("click", function(){
    //window.location.replace(chrome.runtime.getURL("settings.html"));
    chrome.tabs.create({url: "settings.html"});

});

