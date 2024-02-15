"use strict";

// ------------- Brandi bo'yicha filterlash------------------

let cardWrapper = $('.wrapper');
let brandOption = $('#brands');
let brand = []

// ------------ RENDER FUNCTION --------------------


function renderProducts(data) {
    
if(data.length > 0) {

    data.forEach((el)=>{

        const {title, brand, rating , thumbnail , price , discountPercentage}=el; 
        const card = render('div', 'card',
        `
        <div class="h-[189px] bg-[#F5F5F5] flex justify-center items-center rounded-t-2xl">
            <img class="h-[189px] object-contain" src="${thumbnail}" alt="img">
        </div>
        <div class="absolute top-0 right-0 h-[53px] p-1 flex items-center rounded-tr-[16px] rounded-bl-[16px] w-[51px] bg-[#008ECC]">
            <p class="text-white text-center font-semibold text-[14px]">${Math.round(discountPercentage)}% OFF</p>
        </div>
        <div class="p-3">
            <p class="font-semibold mb-1">${title}</p>
            <div class="flex gap-[10px] pb-2 mb-2 border-b-[1px] border-[#EDEDED]">
                <span class="font-bold">${price}$</span>
                <del>${Math.round(price*1.44)}$</del>
            </div>
            <p class="text-[#249B3E] font-semibold">Raiting - ${rating}</p>
        </div>
         `);
        card.setAttribute('class', 'relative w-[227px] border-[1px] border-[#EDEDED] rounded-2xl hover:border-[#008ECC] hover:shadow-[0px_0px_20px_10px_#0000000D] duration-150');


         cardWrapper.appendChild(card);

    }) 
}else{
    cardWrapper.innerHTML=`<h1 class="text-center"> NOT FOUND </h1>`
}

}

renderProducts(product.products)

function findBrand(data) {
    if (data.length > 0) {
        data.forEach((el) => {
            if (!brand.includes(el.brand)) {
                brand.push(el.brand)
            }
        })
    }
}

findBrand(product.products)


function renderBrand(data) {
    if (data.length > 0) {
        data.forEach((el) => {
            const option = render('option', 'option', el)
            brandOption.appendChild(option)
        })
    }
}

renderBrand(brand)

brandOption.addEventListener('change', (el) => {
    sortBrands(el.target.value)
})

function sortBrands(brandName) {
    cardWrapper.innerHTML = ""

    const filterBrand = product.products.filter(el =>{
        return el.brand.toLowerCase() == brandName.toLowerCase()
    })

    renderProducts(filterBrand)
}







// ---------- Narxi bo'yicha sortlash ---------------

function sortPrice(product) {
    const priceDown = product.products.sort((a,b) => a.price - b.price).map((el) => {
        return {nomi:el.title, narxi:el.price}
    })
    return priceDown
}

const price = sortPrice(product)
console.log(price);


// ------------------ Reytingi bo'yicha sortlash --------------

function sortRate(productList) {
    return productList.products.sort((a,b) => a.rating - b.rating).map((el) => {
        return {nomi:el.title, reytingi:el.rating}
    })
}

const rate = sortRate(product)
console.log(rate);


// ------------------ O'zbek tiliga o'girish ------------------

function uzbek(product) {
    return product.products.map((el) => {
        return {id:el.id, Miqdori:el.quantity, Nomi:el.title, Tavsifi:el.description, Narxi:el.price, Chegirma:el.discountPercentage, Reytingi:el.rating, Aksiyasi:el.stock, Brandi:el.brand, Kategoriyasi:el.category, Eskizi:el.thumbnail, Rasmlari:el.images}
    })
}

const language = uzbek(product)
console.log(language);


// ----------------- Kategoriyasi bo'yicha filterlash-----------------

function categoryCount(productList, categories) {
    return productList.products.filter((el) => el.category.toLowerCase() == categories.toLowerCase())
}
const category = categoryCount(product, "smartphones")
console.log(category);
