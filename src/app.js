import itemData from './items.js';
import { itemArray } from './item-array.js';

const itemImageTags = document.querySelectorAll('img');
const itemRadioTags = document.querySelectorAll('input');
// const itemOne = document.getElementById('item-one');
// const itemTwo = document.getElementById('item-two');
// const itemThree = document.getElementById('item-three');

const items = new itemArray(itemData);

let selections = 0;

let randomItemOne = items.getRandomItem();
let randomItemTwo = items.getRandomItem();
while (randomItemOne === randomItemTwo){
    randomItemTwo = items.getRandomItem();
}
let randomItemThree = items.getRandomItem();
while (randomItemThree === randomItemTwo || randomItemThree === randomItemOne){
    randomItemThree = items.getRandomItem();
}

itemRadioTags[0].value = randomItemOne.id;
itemRadioTags[1].value = randomItemTwo.id;
itemRadioTags[2].value = randomItemThree.id;
itemImageTags[0].src = randomItemOne.image;
itemImageTags[1].src = randomItemTwo.image;
itemImageTags[2].src = randomItemThree.image;

itemRadioTags.forEach((radioTag) =>{
    radioTag.addEventListener('click', () => {
        let thisRadioItemsId = radioTag.value;
        const selectedItem = items.getItemById(thisRadioItemsId);
        let itemCounter = selectedItem.counter;
        itemCounter++;
        selectedItem.counter = itemCounter;
    });
});
