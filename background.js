// chrome.runtime.onMessage.addListener(function(request, sender,sendResponse) {
//     if (request.action == "getSource") {
//         document.body.innerText = request.source;
//     }
//     if (request.action == "addItemButton"){
//         console.log('gg')
//     }
// });

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action == "getSource") {
            console.log(request.source)
            document.body.innerText = "da";
            sendResponse({baz: "getSource"})
        }
    });
    
    