"use strict";

// ------------- Brandi bo'yicha filterlash------------------

let cardWrapper = $('.wrapper');
let inputSearch = $('.header-input')
let brandOption = $('#brands');
let categoryOption = $('#category');
let ratingOption = $('#rating');
let priceOption = $('#price');
let brand = []
let category = []

// ------------ RENDER FUNCTION --------------------


function renderProducts(data) {

    if (data.length > 0) {

        data.forEach((el) => {

            const { title, brand, rating, thumbnail, price, discountPercentage } = el;
            const card = render('div', 'card',
                `
            <div class="h-[189px] bg-[#F5F5F5] flex justify-center items-center rounded-t-2xl">
                <img class="h-[189px] object-contain" src="${thumbnail}" alt="img">
            </div>
            <div class="absolute top-0 right-0 h-[53px] p-1 flex items-center rounded-tr-[16px] rounded-bl-[16px] w-[51px] bg-[#008ECC]">
                <p class="text-white text-center font-semibold text-[14px]">${Math.round(discountPercentage)}% OFF</p>
            </div>
            <div class="p-3">
                <div class="h-[80px] border-b-[1px] border-[#EDEDED]">
                    <p class="font-semibold mb-1">${title}</p>
                    <div class="flex gap-[10px] pb-2 mb-2 ">
                        <span class="font-bold">${price}$</span>
                        <del>${Math.round(price * 1.44)}$</del>
                    </div>
                </div>
                <p class="text-[#249B3E] font-semibold">Raiting - ${rating}</p>
            </div>
         `);
            card.setAttribute('class', 'relative w-[227px] border-[1px] border-[#EDEDED] rounded-2xl hover:border-[#008ECC] hover:shadow-[0px_0px_20px_10px_#0000000D] duration-150');

            cardWrapper.appendChild(card)
        })
    } else {
        cardWrapper.innerHTML = `<h1 class="text-center"> NOT FOUND </h1>`
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

    const filterBrand = product.products.filter(el => {
        return el.brand.toLowerCase() == brandName.toLowerCase()
    })

    renderProducts(filterBrand)
}


// ---------- Narxi bo'yicha sortlash ---------------

priceOption.addEventListener('change', (el) => {
    sortingPrice(product.products, el.target.value)
})

function sortingPrice(productList, state) {
    cardWrapper.innerHTML = ""

    const sortedPrice = productList.sort((a,b) => a.price - b.price)
    if (state == "down") {
        renderProducts(sortedPrice)
    } else {
        renderProducts(sortedPrice.reverse())
    }
}


// ------------------ Reytingi bo'yicha sortlash --------------


ratingOption.addEventListener('change', (el) => {
    sortingRating(product.products, el.target.value)
})

function sortingRating(productList, state) {
    cardWrapper.innerHTML = ""

    const sortedRate = productList.sort((a,b) => a.rating - b.rating)
    if (state == "up") {
        renderProducts(sortedRate)
    } else {
        renderProducts(sortedRate.reverse())
    }
}


// ------------------ O'zbek tiliga o'girish ------------------

function uzbek(product) {
    return product.products.map((el) => {
        return { id: el.id, Miqdori: el.quantity, Nomi: el.title, Tavsifi: el.description, Narxi: el.price, Chegirma: el.discountPercentage, Reytingi: el.rating, Aksiyasi: el.stock, Brandi: el.brand, Kategoriyasi: el.category, Eskizi: el.thumbnail, Rasmlari: el.images }
    })
}

const language = uzbek(product)
console.log(language);


// ----------------- Kategoriyasi bo'yicha filterlash-----------------


categoryOption.addEventListener('change', (el) => {
    sortCategory(el.target.value)
})

function sortCategory(categoryName) {
    cardWrapper.innerHTML = ""

    const filterCategory = product.products.filter(el => {
        return el.category.toLowerCase() == categoryName.toLowerCase()
    })

    renderProducts(filterCategory)
}


// -------------- Search ------------------

inputSearch.addEventListener('keyup', (e) => {
    cardWrapper.innerHTML = ""
    searchProduct(e.target.value)
})
function searchProduct(searchTerm) {
    const searchReslut = product.products.filter((el) => el.title.toLowerCase().includes(searchTerm.toLowerCase()) || el.brand.toLowerCase().includes(searchTerm.toLowerCase()))
    renderProducts(searchReslut)
}
