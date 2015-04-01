chrome.extension.onMessage.addListener(
    function (request, sender, sendResponse) {
        try{
            if(request.type="function"){
                sendResponse(F[request.functionName].apply(F,request.functionParameters));
            }
        }catch(e){
            console.log("BGError: "+e.message);
        }
    });
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.sendMessage(tab.id, {
        type: "function",
        functionName:"active"
    });
});
var F={
    getItemInEStorage:function(item){
        return localStorage.getItem(item);
    },
    setItemInEStorage:function(item,value){
        return localStorage.setItem(item,value)
    },
    addKnownWord:function(index){
        if(G.knownWords.indexOf(index)==-1){
            G.knownWords.push(index);
            updateKnownWords();
        }
    },
    getKnownWords:function(){
        return G.knownWords;
    },
    addWebsiteIgnoreList:function(name){
        var list = F.getWebsiteIgnoreList();
        list.push(name);
        F.setItemInEStorage("ignoreWebsites",JSON.stringify(list));
    },
    getWebsiteIgnoreList:function(){
        var list = F.getItemInEStorage("ignoreWebsites");
        if(list==null)list=[];
        else list=JSON.parse(list);
        return list;
    }

}
var G = {};
function init(){
    if(F.getItemInEStorage("knownWords")==null){
        F.setItemInEStorage("knownWords",JSON.stringify([]))
    }else{
        G.knownWords = JSON.parse(F.getItemInEStorage("knownWords"));
    }
}
function updateKnownWords(){
    F.setItemInEStorage("knownWords",JSON.stringify(G.knownWords));
}
init();