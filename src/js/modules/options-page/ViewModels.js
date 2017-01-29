WordsList=function(){
    var self = this;
    self.words = ko.observableArray([]);
    self.findByIdx=function(idx){
//        return self.words()[idx];
    }
    self.knownWords=ko.observableArray([]);
    self.kw_selected=ko.observableArray([]);
    self.delete_kw=function(){
        if(self.kw_selected().length==0)return;
        self.kw_selected().forEach(function(w,i){
            self.unknownWords.push(w);
        });
        self.knownWords.removeAll(self.kw_selected());
        self.kw_changes();
    }
    self.kw_changes=function(){
        var kw = self.knownWords();
        var saveArray = [];
        for(var i=0;i<kw.length;i++){
            saveArray.push(w5000.indexOf(kw[i]));
        }
        localStorage.setItem("knownWords",JSON.stringify(saveArray));
    }

    self.unknownWords=ko.observableArray([]);
    self.uw_selected=ko.observableArray([]);
    self.delete_uw=function(){
        if(self.uw_selected().length==0)return;
        self.uw_selected().forEach(function(w,i){
            self.knownWords.push(w);
        });
        self.unknownWords.removeAll(self.uw_selected());
        self.kw_changes();
    }

    var knowns = JSON.parse(localStorage.getItem("knownWords"));
    w5000.forEach(function(o,i){
        if(knowns.indexOf(i)>-1){// known
            self.knownWords.push(o);
        }else{
            self.unknownWords.push(o);
        }
    })
}
define({
    WordsList:WordsList
})