let count= 0

chrome.extension.onMessage.addListener(function(request, sender) {
    console.log(request)
    if (request.action == "saveSource") {
        count = request.count;
        console.log(count)
    }
});

function onWindowLoad() {


    let keys = ["brandName"]
 
    chrome.storage.local.get(keys, function(items) {
        for(let index in keys){
            let source = items[keys[index]]
            document.body.innerText = source;
        }
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


 