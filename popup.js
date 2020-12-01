let keys = ["category","productName","imageSrc","productPrice"]
let tempCount = 0


function onWindowLoad() {
        (async function fetchPopup(){
            let count = await getCount()
            console.log(count)
            let sources = await getSources()
            console.log(sources)
            if (count != tempCount){
                let categories =document.querySelectorAll('.category')
                for(let index = tempCount; tempCount < count; tempCount ++){
                    let existCategory, parentCategory = await getCategory(index,categories,sources) // 원래 있는 카테고리 인지 확인
                    if (existCategory){
                        
                    }else{
                        let container = await sortAppend(index,sources)
                        document.body.append(container)
                    }
                }
            }


        }())

}

window.onload = onWindowLoad;

async function getCount(){
    let c = new Promise(function(resolve, reject){
        chrome.storage.local.get("count", function(count) {
            resolve(count.count);
        })
    });
    let count = await c
    return count
}

async function getSources(){
    let s = new Promise(function(resolve, reject){
        chrome.storage.local.get("sources", function(sources) {
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
    return existCategory,parentCategory
}

 async function sortAppend(i,sources){

        let container = document.createElement('div')
        container.classList.add('container')
        let category  = document.createElement('div')
        category.classList.add('category')
        let productName = document.createElement('div')
        productName.classList.add('productName')
        let imageSrc  = document.createElement('div')
        imageSrc.classList.add('imageSrc')
        let productPrice  = document.createElement('div')
        productPrice.classList.add('price')


        for(let index in keys){
            let sourceList = sources.sources
            let source = sourceList[i][keys[index]]
            console.log(category)
            
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
                    img.style['maxWidth'] = '100px'
                    img.style['maxHeight'] = '100px'
                    
                    imageSrc.append(img)
                    break
                case "productPrice":
                    productPrice.append('\n'+source)
                    break
            }
        }

        container.appendChild(category)
        container.appendChild(productName)
        container.appendChild(imageSrc)
        container.appendChild(productPrice)
        //카테고리 분류하고 category 키에 배열을 값으로 추가. 배열안에 i값을 저장(삭제할 때 필요)

        return container
    }


