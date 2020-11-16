function add_icon(){
    var newDiv = document.body.createElement("div"); 
    // and give it some content 
    var newContent = document.body.createTextNode("환영합니다!"); 
    // add the text node to the newly created div
    newDiv.appendChild(newContent);
    let p = document.getElementsByClassName("prod-buy-header");
    p.appendChild(newDiv);
}
 
chrome.extension.sendMessage({
    action: "addIcon",
    source: add_icon()
});