let counts= 0

function onWindowLoad() {


    let keys = ["brandName","TEST"]
     
    chrome.storage.local.get("count", function(count) {
        let tempCount= count.count
        console.log(tempCount)
        chrome.storage.local.get("sources", function(sources) {
            if (count == tempCount){
                
            }else{
                console.log(sources)
                for(let i = counts; i<tempCount; i++){
                    for(let index in keys){
                        let sourceList = sources.sources
                        let source = sourceList[i][keys[index]]
                        document.body.innerText = source;

                        //받은 데이터들 분류해서 처리
                        console.log(source)
                    }
                }
                count = tempCount
            }

        });
    });
}

window.onload = onWindowLoad;






// chrome.tabs.executeScript(null, {
//     file: "getSource.js"
//     }, function() {
//         if (chrome.extension.lastError) {
//             document.body.innerText = 'There was an error injecting script : \n' + chrome.extension.lastError.message;
//         }
//     });


// chrome.tabs.executeScript(null, {
// code: 'document.body.style.backgroundColor="orange"'
// });

// print('success')

// fetch(chrome.extension.getURL('/modal.html'))
//     .then(response => response.text())
//     .then(data => {
//         document.getElementById('inject-container').innerHTML = data;
//         // other code
//         // eg update injected elements,
//         // add event listeners or logic to connect to other parts of the app
//     }).catch(err => {
//         // handle error
//     });


    // chrome.tabs.getSelected(null,function(tab) {
    //     let tablink = tab.url.split("?")[0].replace(/[0-9]/g, "");
    //     if(tablink == "https://www.coupang.com/vp/products/"){
    //         chrome.tabs.executeScript(null, {
    //             file: "getSource.js"
    //             }, function() {
    //                 if (chrome.extension.lastError) {
    //                     document.body.innerText = 'There was an error injecting script : \n' + chrome.extension.lastError.message;
    //                 }
    //             });
    //     }
    // });


 