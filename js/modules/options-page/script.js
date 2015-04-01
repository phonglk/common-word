requirejs.config(requirejsConfig);
var wordsList;
require(["options-page/ViewModels"],function(vms){
    $(function(){
        wordsList = new vms.WordsList();
        ko.applyBindings(wordsList);
    })
})