// chrome.runtime.onMessage.addListener(function(request, sender,sendResponse) {
//     if (request.action == "getSource") {
//         document.body.innerText = request.source;
//     }
//     if (request.action == "addItemButton"){
//         console.log('gg')
//     }
// });

let arr = [1]

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action == "getSource") {
            let items = {"brandName":request.sources.brandName}
            arr.push(items)

            //arr[0]에 count를 저장해서 popup에서 써야할듯
            
            chrome.storage.local.set(items, function() {
                // 콜백
                chrome.extension.sendMessage({
                    action: "saveSource",
                    count: 1
                });
            });

            sendResponse({baz: "getSource"})
        }
    });
    
    