"use strict";

let cardWrapper = document.querySelector('.wrapper');

// ------------ RENDER FUNCTION --------------------


function renderProducts(data) {
    
if(data.products.length > 0) {

    data.products.forEach((el)=>{

        const {title, brand, rating , thumbnail , price , discountPercentage}=el; 
        const card = document.createElement('div');
        card.setAttribute('class', 'relative w-[227px] border-[1px] border-[#EDEDED] rounded-2xl hover:border-[#008ECC] hover:shadow-[0px_0px_20px_10px_#0000000D] duration-150');
        card.innerHTML=`
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
         `;

         cardWrapper.appendChild(card);

    }) 
}else{
    cardWrapper.innerHTML=`<h1 class="text-center"> NOT FOUND </h1>`
}

}

renderProducts(product)