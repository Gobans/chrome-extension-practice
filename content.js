function addItemButton(){
    let addItem = document.createElement("BUTTON");
    addItem.setAttribute("style","background-color:#1F90E6; border-radius:10px; color:white; border:none; font-size: 18px")
    addItem.innerText="Add";
    document.querySelector('.prod-buy-header').appendChild(addItem); 

    
    console.log('addButton')
    
    addItem.addEventListener("click",function(){

        chrome.runtime.sendMessage({
            action: "getSource",
            sources: get_source(document)},function(response){
                alert('Successfully added to cart!')
            }
        );


    })
}


function get_source(document){
    let sources = new Object()
    sources.category = document.querySelector('#breadcrumb > li:last-child').innerText
    sources.brandName = document.querySelector('.prod-brand-name').innerText
    sources.productName = document.querySelector('div.prod-buy-header > h2').innerText
    sources.imageSrc = document.querySelector('#repImageContainer > img').src
    let prices = document.querySelectorAll('span.total-price > strong')
    sources.coupangPrice = prices[0].innerText
    if(prices[1] != undefined) sources.wowPrice = prices[1].innerText
    else sources.wowPrice = null


    //쿠팡 와우, 회원가 나눠서 보여줘야할듯

    return sources
}

addItemButton()
