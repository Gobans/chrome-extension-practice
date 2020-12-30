let keys = ["category","productName","imageSrc","coupangPrice","wowPrice","badge","productUrl"]
let removeCount = 0


function onWindowLoad() {
        (async function fetchPopup(){
            let count = await getCount()
            let sources = await getSources()

            console.log("popup count: "+ count)
            console.log("popup sources: "+ sources)

            if(count == 0){
                //카트에 아이템을 넣어달라는 표시
                let guide = document.createElement('div')
                guide.classList.add('guide')
                guide.innerText = "There is no products that you added.\n Please add a product on page :)"
                document.body.appendChild(guide)

            }else{
                addRemoveAllButton()
                for(let index = 1; index <= count; index ++){
                    let categories =document.querySelectorAll('.category') //카테고리 전체 가져오기
                    let [existCategory, parentCategory] = await getCategory(index,categories,sources) // 원래 있는 카테고리 인지 확인
                    if (existCategory){ //이미 동일한 카테고리가 존재할 떄
                        let product = await sortAppend(index,sources)
                        product.removeChild(product.firstChild)
                        parentCategory.firstChild.nextSibling.append(product)
    
                        addRemoveButton(product,index) //삭제 버튼추가
    
                    }else{ // 동일한 카테고리가 없을 떄
                        let product = await sortAppend(index,sources)
                        let container = document.createElement('div')
    
                        container.classList.add('container')
    
                        //카테고리 따로 빼기
                        let category  = product.firstChild
                        container.appendChild(category)
    
                        let productBox = document.createElement('div')
                        productBox.classList.add('productBox')
                        productBox.setAttribute("droppable","true")
                        productBox.addEventListener('ondrop',drop,false)

                        
                        productBox.appendChild(product)
                        container.appendChild(productBox)
                        document.body.append(container)
    
                        addRemoveButton(product,index) //삭제 버튼추가
                    }
    
                }
            }

            

            


        }())

}

window.onload = onWindowLoad;

/* get product sources */

async function getCount(){
    let c = new Promise(function(resolve, reject){
        chrome.storage.sync.get("count", function(count) {
            resolve(count.count);
        })
    });
    let count = await c
    return count
}

async function getSources(){
    let s = new Promise(function(resolve, reject){
        chrome.storage.sync.get("sources", function(sources) {
            resolve(sources);
        })
    });
    
    let sources = await s
    return sources
}

async function getCategory(index,categories,sources){
    let existCategory = false
    let parentCategory = null
    for(let i in categories){
        if (categories[i].innerText == sources.sources[index].category){
            parentCategory = categories[i].parentNode
            existCategory = true
            break
        }
    }
    return [existCategory,parentCategory]
}

/* create product box */

 async function sortAppend(i,sources){

        let product = document.createElement('div')
        product.classList.add('product')
        product.id = i
        let category  = document.createElement('div')
        category.classList.add('category')
        let productName = document.createElement('div')
        productName.classList.add('productName')
        let imageSrc  = document.createElement('div')
        imageSrc.classList.add('imageSrc')
        let coupangPrice  = document.createElement('div')
        coupangPrice.classList.add('coupangPrice')
        let wowPrice  = document.createElement('div')
        wowPrice.classList.add('wowPrice')

        isWow = false


        for(let index in keys){
            let sourceList = sources.sources
            let source = sourceList[i][keys[index]]
            console.log(sourceList)
            switch(keys[index]){
                case "category":
                    category.append('\n'+source)
                    break
                case "productName":
                    productName.append('\n'+source)
                    break
                case "imageSrc":
                    let img = document.createElement('img'); 
                    img.src =  source
                    img.style['maxWidth'] = '150px'
                    img.style['maxHeight'] = '150px'
                    
                    imageSrc.append(img)
                    break
                case "coupangPrice":
                    coupangPrice.append('\n'+source+" ")
                    break
                case "wowPrice":
                    if(source !=null && source != "원"){
                        wowPrice.append('\n'+source + " ")
                        let wow_img = document.createElement('img'); 
                        wow_img.src = chrome.runtime.getURL("image/rocket_logo.png");
                        wow_img.style['maxWidth'] = '56px'
                        wow_img.style['maxHeight'] = '14px'
                        wowPrice.append(wow_img)
                        isWow = true
                    }
                    break
                case "badge":
                    if(source != null){
                        if(source == "https://image10.coupangcdn.com/image/badges/rocket/rocket_logo.png"&& isWow == false){
                            let wow_img = document.createElement('img'); 
                            wow_img.src = chrome.runtime.getURL("image/rocket_logo.png");
                            wow_img.style['maxWidth'] = '56px'
                            wow_img.style['maxHeight'] = '14px'
                            coupangPrice.append(wow_img)
                        }else if(isWow && source == "https://image7.coupangcdn.com/image/mobile_app/v3/brandsdp/loyalty/pc/rocket-fresh@2x.png"){
                            let fresh_img = document.createElement('img'); 
                            fresh_img.src = chrome.runtime.getURL("image/fresh_logo.png");
                            fresh_img.style['maxWidth'] = '56px'
                            fresh_img.style['maxHeight'] = '14px'
                            wowPrice.removeChild(wowPrice.firstChild.nextSibling)
                            wowPrice.append(fresh_img)
                        }
                        else if(source == "https://image7.coupangcdn.com/image/mobile_app/v3/brandsdp/loyalty/pc/rocket-fresh@2x.png"){
                            let fresh_img = document.createElement('img'); 
                            fresh_img.src = chrome.runtime.getURL("image/fresh_logo.png");
                            fresh_img.style['maxWidth'] = '56px'
                            fresh_img.style['maxHeight'] = '14px'
                            coupangPrice.append(fresh_img)
                        }
                       
                    }
                    break
                case "productUrl":
                    console.log(source)
                    imageSrc.addEventListener("click",function(){
                        chrome.tabs.create({ url: source });
                    })
                    break
                    
            }
        }

        product.appendChild(category)
        product.appendChild(productName)
        product.appendChild(imageSrc)
        product.appendChild(coupangPrice)
        product.appendChild(wowPrice)

        product.setAttribute("draggable","true") //드래그 기능 추가
        product.addEventListener('dragstart',dragstart,false)  //드래그 이벤트 추가

        //카테고리 분류하고 category 키에 배열을 값으로 추가. 배열안에 i값을 저장(삭제할 때 필요)
        console.log(product)
        return product
    }

/* remove product button */

function addRemoveButton(product,index){
    let removeButton = document.createElement('button')
    removeButton.classList.add('removebtn')
    removeButton.addEventListener("click",function(){
        removeProduct(product,index)
    })
    removeButton.innerText = "remove"
    product.appendChild(removeButton)
}


function removeProduct(product,index){
    chrome.runtime.sendMessage({
        action: "removeProduct",
        index : index,
        removeCount : removeCount,
    }, 
        function(response) {
            console.log(product.parentNode.childElementCount)
            console.log(product.parentNode.parentNode)
            removeCount +=1
            if(product.parentNode.childElementCount == 1){
                document.body.removeChild(product.parentNode.parentNode)
            }else{
                product.parentNode.removeChild(product)
            }
    });

}

/* remove all button */

function addRemoveAllButton(){
    let removeButton = document.createElement('button')
    removeButton.classList.add('remove-all-btn')
    removeButton.addEventListener("click",function(){
        removeAll()
    })
    removeButton.innerText = "Remove all"
    document.body.appendChild(removeButton)
}

function removeAll(){
    chrome.runtime.sendMessage({
        action: "removeAll",
    },
    function(response) {
        while (document.body.hasChildNodes() ) { 
            document.body.removeChild( document.body.firstChild ); 
        }
    
    })

}

function dragstart(e){
    console.log('drag_start')
    console.log(e)
    e.dataTransfer.setData('targetId',e.target.id);
    //data transfer에 대해 다시 봐야할듯
}
function drop(e){
    console.log("drop");
    e.preventDefault();
    let targetId = e.dataTransfer.getData('targetId');
    e.target.appendChild(document.getElementById(targetId));
}