function addItemButton(){
    let addItem = document.createElement("BUTTON");
    document.querySelector('.prod-buy-header').appendChild(addItem); 
    addItem.innerText="add";
    console.log('success')
    addItem.addEventListener("click",function(){
        console.log('success2')


        chrome.runtime.sendMessage({
            action: "getSource",
            source: get_source(document.body)}, 
            function(response) {
            console.log(response.baz);
        });


    })
}


function get_source(document_body){
    return document_body.innerText;
}

addItemButton()
