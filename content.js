function addItemButton(){
    let addItem = document.createElement("BUTTON");
    document.querySelector('.prod-buy-header').appendChild(addItem); 
    addItem.innerText="add";
    console.log('addButton')
    addItem.addEventListener("click",function(){

        chrome.runtime.sendMessage({
            action: "getSource",
            sources: get_source(document)}
        );


    })
}


function get_source(document){
    let sources = new Object()
    sources.category = document.querySelector('#breadcrumb > li:last-child').innerText
    sources.brandName = document.querySelector('.prod-brand-name').innerText
    sources.productName = document.querySelector('div.prod-buy-header > h2').innerText
    sources.imageSrc = document.querySelector('#repImageContainer > img').src
    sources.productPrice = document.querySelector('span.total-price > strong').innerText
    //쿠팡 와우, 회원가 나눠서 보여줘야할듯

    return sources
}

addItemButton()
