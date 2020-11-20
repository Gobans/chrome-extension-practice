function addItemButton(){
    let addItem = document.createElement("BUTTON");
    document.querySelector('.prod-buy-header').appendChild(addItem); 
    addItem.innerText="add";
    console.log('addButton')
    addItem.addEventListener("click",function(){

        chrome.extension.sendMessage({
            action: "getSource",
            sources: get_source(document)}, 
            function(response) {
            console.log(response.baz);
        });


    })
}


function get_source(document){
    let sources = new Object()
    sources.brandName = document.querySelector('.prod-brand-name').innerText 
    return sources
}

addItemButton()
