function get_source(document_body){
    var jbBtn = document.createElement( 'button' );
    var jbBtnText = document.createTextNode( 'Click' );
    jbBtn.appendChild( jbBtnText );
    document.body.appendChild( jbBtn );
    return document_body.innerText;
}
 
chrome.extension.sendMessage({
    action: "getSource",
    source: get_source(document.body)
});