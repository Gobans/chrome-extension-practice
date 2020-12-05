let count = 0
let sources = []

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action == "getSource") {
            let items = {
                "category":request.sources.category, 
                "productName":request.sources.productName,
                "imageSrc":request.sources.imageSrc,
                "productPrice":request.sources.productPrice
            }
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
        else if(request.action == "removeProduct"){
            for(let i = request.index; i<count; i++){
                if(i == count-1){
                    sources.pop()
                }else{
                    sources[i] = sources[i+1]
                }
            }
            count -=1
            chrome.storage.local.set({"sources": sources}, function() {
                // 콜백
            });
            chrome.storage.local.set({"count": count}, function() {
                // 콜백
            });

        }
    });
    
    