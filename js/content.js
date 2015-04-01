requirejs.config(requirejsConfig);
function init(){
    F.active = active;
    useguide();
    getKnownWords();
}
function initActive(){
    WordVM = new WordsViewModel();
    fixBootstrapIcon();
}
function active(){
    if($(".cmnw.cmnw_bar").length==0){
        initActive();
        cmnWords($("*").not(".cmnw"));
        insertDOM();
        wordList();
    }else{
        $(".cmnw.cmnw_bar").show();
    }
}
var flag_detectWord = false;
var flag_buildWord = false;
var wordsInPage = [];
var G={
    knownWords:[]
}
// DTO
function UnknownWord(word,rank){
    var self = this;
    this.word = word;
    this.rank = rank;
    self.moverItem=function(word){
        $(".cmnw_word[data-rank='"+word.rank+"']").addClass("cmnw_highlight");
    }
    self.moutItem=function(word){
        $(".cmnw_word[data-rank='"+word.rank+"']").removeClass("cmnw_highlight");
    }
}
// Model
function WordsViewModel(){
    var self = this;
    self.unknownWords=ko.observableArray([])
    self.removeUnknownWord=function(word){
        self.unknownWords.remove(word);
        callBGFunction("addKnownWord",[word.rank]);
        $(".cmnw_word[data-rank='"+word.rank+"']").attr("data-known",true);
    }
}
var WordVM;
// Model.End

// Insert extension's dom content
function insertDOM(){
    var bar = $("<div class='cmnw display cmnw_bar' data-cmnw=''></div>")
//    var btn_active = $("<a href='javascript:void(0)' class='btn'>Check Common Words</a>");
//    bar.append(btn_active);
//    btn_active.click(function(){
//        cmnWords($("*").not(".cmnw"));
//    })

    var btn_words = $("<a href='javascript:void(0)' class='btn'>Words List</a>");
    btn_words.click(wordList_click);
    bar.append(btn_words);

    var btn_close = $('<button class="btn bclose">Close</button>');
    bar.append(btn_close);
    btn_close.click(function(){
        $(".cmnw.display").fadeOut(300);
    })
//    btn_close.find(".ignore").click(function(){
//        $(".cmnw.display").fadeOut(300);
//        callBGFunction("addWebsiteIgnoreList",[location.origin])
//    })
    $(document.body).append(bar);
    var words_panel = $("<div class='cmnw display unknownWords'>" +
        "<ul data-bind='foreach: unknownWords' class='nav nav-pills nav-stacked'>" +
        "<li class='uw' data-bind='click: $root.removeUnknownWord," +
        "event:{mouseover: moverItem,mouseout:moutItem}," +
        "attr:{\"data-rank\":rank}'>" +
        "<a data-bind='text:word'>" +
        "</a></li></ul></div>");
    $(document.body).append(words_panel);

}
function wordList_click(){
    var panel = $(".cmnw.unknownWords")
    if(panel.is(":visible")){
        panel.fadeOut(300);
    }else{
        if(flag_detectWord){
            panel.fadeIn(300);
        }
    }
}
function getKnownWords(){
    callBGFunction("getKnownWords",[],function(knownWords){
        G.knownWords = knownWords;
    });
}
function wordList(){
    if(!flag_buildWord){
        var words = [];
        wordsInPage.sort(function(a,b){return a-b});
        wordsInPage.forEach(function(v){
            if(G.knownWords.indexOf(v)==-1)
                WordVM.unknownWords.push(new UnknownWord(w5000[v],v));
        })
        ko.applyBindings(WordVM);
        flag_buildWord = true;
    }
}
function cmnWords($e){
    var regText = /\w+/
    var spliter = /([ ",.!?])/
    $e
        .andSelf()
        .contents()
        .filter(function(){
            return this.nodeType === 3 && $(this).parents("style,script,.cmnw").length==0 && this.nodeValue.trim() != "";
        })
        .each(function(){
            var val = this.nodeValue;
            var newVal = "";
            var ws = val.split(spliter);
            ws.forEach(function(v,i,a){
                var nv = v;
                if(regText.test(v)==true){
                    var pos = w5000.indexOf(v.toLocaleLowerCase());
                    var star = pos < 1000 ? 1:pos < 2500 ?2:3;
                    var title = "This word is ranked "+pos+".Click to show toolbar"
                    if(pos>-1){
                        var known = false;
                        if(G.knownWords.indexOf(pos)>-1){
                            known = true
                        }else{
                            if(wordsInPage.indexOf(pos)==-1){
                                wordsInPage.push(pos)
                            }
                        }
                        nv="<span class='cmnw_word' data-rank='"+pos+"' data-star='"+star+"' " +
                            "data-word='"+v+"' title='"+title+"' " +
                            "data-known="+known+">"+v+"</span>";
                    }
                }
                newVal+=" "+nv;
            })
            var newNodes = $.parseHTML(newVal);
            var thisNode = this;
            newNodes.forEach(function(v){
                thisNode.parentNode.insertBefore(v,thisNode);
            });
            this.parentNode.removeChild(this);
        });
    $(".cmnw_word").hover(function(){
        var dtrank = $(this).attr("data-rank");
        $(".cmnw_word[data-rank='"+dtrank+"']").addClass("cmnw_highlight");
//        $(".cmnw.unknownWords li[data-rank="+dtrank+"]").addClass("active")
//        $(".cmnw.unknownWords").stop().scrollTo($(".cmnw.unknownWords li[data-rank="+dtrank+"]"),500);
    },function(){
        var dtrank = $(this).attr("data-rank");
        $(".cmnw_word[data-rank='"+dtrank+"']").removeClass("cmnw_highlight");
    })
    $(".cmnw_word").click(function(){
        var nth = $(".cmnw_word").index($(this));
        showWordFunctionPopup(nth);
    })
    flag_detectWord = true;
}
function showWordFunctionPopup(nth){
    $(".cmnw.wordfunctiontool").remove();
    var html = $("<div class='cmnw wordfunctiontool'>" +
        "<a href='javascript:void(0)' class='known'>Known</a> " +
        "</div> ")
    var tar = $(".cmnw_word").eq(nth);

    html.css({
        top:tar[0].offsetTop+tar.height(),
        left:tar[0].offsetLeft-3
    })
    html.find("a.known").click(function(){
        try{
            $(".unknownWords li[data-rank="+tar.attr("data-rank")+"]").trigger("click")
            html.fadeOut(200);
        }catch(e){}
    })
    html.hover(function(){

    },function(){
        html.fadeOut(200);
    })
    tar.after(html);
}
//function selectContainer(){
//    if($(".cmnw_select").length == 0){
//        $(document.body).append("<div class='cmnw_select'></div>");
//    }
//    var sl = $(".cmnw_select");
//    $("div").hover(function(e){
//        e.stopPropagation();
//        var $this = $(this);
//        sl.show();
//        sl.css({
//            width:$this.width(),
//            height:$this.height(),
//            top:$this.offset().top,
//            left:$this.offset().left
//        })
//
//        console.log($this.attr("class"));
//    },function(){
//
//    })
//}

//callBGFunction("getWebsiteIgnoreList",[],function(lists){
//    if(lists.indexOf(location.origin)==-1)init();
//})
require(["jquery","util/lib"],function($,lib){
    require(["useguide"],function(useguideF){
        useguide = useguideF
        init();
    })
})