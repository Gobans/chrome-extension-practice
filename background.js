chrome.runtime.onMessage.addListener(
    async function(request, sender, sendResponse) {
        let count = await getCount()
        let sources = await getSources()

        console.log("background count:" + count)

        if (request.action == "getSource") {
            let productUrl = await getUrl()
            let items = {
                "category":request.sources.category, 
                "productName":request.sources.productName,
                "imageSrc":request.sources.imageSrc,
                "coupangPrice":request.sources.coupangPrice,
                "wowPrice":request.sources.wowPrice,
                "productUrl":productUrl
            }
            console.log(items)
            count +=1
            sources.push(items)
            chrome.storage.sync.set({"sources": sources}, function() {
                // 콜백
            });
            chrome.storage.sync.set({"count": count}, function() {
                // 콜백
            });
        }
        else if(request.action == "removeProduct"){
            console.log(request.index)
            for(let i = request.index - request.removeCount; i<=count; i++){
                if(i == count){
                    sources.pop()
                }else{
                    sources[i] = sources[i+1]
                }
            }
    

            count -=1
            chrome.storage.sync.set({"sources": sources}, function() {
                // 콜백
            });
            chrome.storage.sync.set({"count": count}, function() {
                // 콜백
            });

            console.log(sources)
            console.log(count)
        }
    });
    


async function getCount(){
    let c = new Promise(function(resolve, reject){
        chrome.storage.sync.get("count", function(count) {
            if(Object.keys(count).length != 0){
                resolve(count.count);
            }else{
                resolve(0);
            }
        })
    });
    let count = await c
    return count
}

async function getSources(){
    let s = new Promise(function(resolve, reject){
        chrome.storage.sync.get("sources", function(sources) {
            if(Object.keys(sources).length != 0){
                resolve(sources.sources)
            }else{
                resolve([0])
            }
        })
    });
    
    let sources = await s
    return sources
}

async function getUrl(){
    let s = new Promise(function(resolve, reject){
        chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
            resolve(tabs[0].url)
            // use `url` here inside the callback because it's asynchronous!
        });
    });
    
    let productUrl = await s
    return productUrl
}