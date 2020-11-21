// chrome.runtime.onMessage.addListener(function(request, sender,sendResponse) {
//     if (request.action == "getSource") {
//         document.body.innerText = request.source;
//     }
//     if (request.action == "addItemButton"){
//         console.log('gg')
//     }
// });

let count = 0
let sources = []

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action == "getSource") {
            let items = {"brandName":request.sources.brandName,"TEST":"test"}
            count +=1
            sources.push(items)
            chrome.storage.local.set({"sources": sources}, function() {
                // 콜백
            });
            chrome.storage.local.set({"count": count}, function() {
                // 콜백
            });


            sendResponse({baz: "getSource"})
        }
    });
    
    