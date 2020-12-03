let keys = ["category","productName","imageSrc","productPrice"]
let tempCount = 0


function onWindowLoad() {
        (async function fetchPopup(){
            let count = await getCount()
            let sources = await getSources()
            console.log(sources)
            if (count != tempCount){
                console.log(count)
                console.log(tempCount)
                for(let index = tempCount; index < count; index ++){
                    let categories =document.querySelectorAll('.category')
                    console.log(categories)
                    let [existCategory, parentCategory] = await getCategory(index,categories,sources) // 원래 있는 카테고리 인지 확인
                    console.log(existCategory)
                    if (existCategory){
                        let product = await sortAppend(index,sources)
                        product.firstChild.innerText = ""
                        parentCategory.parentNode.append(product)
                        //카테고리는 따로 뺴서 추가해야 할 것 같다.
                    }else{
                        let product = await sortAppend(index,sources)
                        let container = document.createElement('div')
                        container.classList.add('container')
                        container.appendChild(product)
                        document.body.append(container)
                        tempCount =count
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
        console.log(categories[i])
        if (categories[i].innerText == sources.sources[index].category){
            parentCategory = categories[i].parentNode
            existCategory = true
            break
        }
    }
    console.log(existCategory)
    return [existCategory,parentCategory]
}

 async function sortAppend(i,sources){

        let product = document.createElement('div')
        product.classList.add('product')
        let category  = document.createElement('div')
        category.classList.add('category')
        let productName = document.createElement('div')
        productName.classList.add('productName')
        let imageSrc  = document.createElement('div')
        imageSrc.classList.add('imageSrc')
        let productPrice  = document.createElement('div')
        productPrice.classList.add('productPrice')


        for(let index in keys){
            let sourceList = sources.sources
            let source = sourceList[i][keys[index]]
            
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
                case "productPrice":
                    productPrice.append('\n'+source)
                    break
            }
        }

        product.appendChild(category)
        product.appendChild(productName)
        product.appendChild(imageSrc)
        product.appendChild(productPrice)
        //카테고리 분류하고 category 키에 배열을 값으로 추가. 배열안에 i값을 저장(삭제할 때 필요)

        return product
    }


