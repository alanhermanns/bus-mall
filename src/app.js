import itemData from './items.js';
import { itemArray } from './item-array.js';
import { findById } from './utils.js';

const itemImageTags = document.querySelectorAll('img');
const itemRadioTags = document.querySelectorAll('input');
const itemSection = document.getElementById('singular-display-section');
// const itemOne = document.getElementById('item-one');
// const itemTwo = document.getElementById('item-two');
// const itemThree = document.getElementById('item-three');

const items = new itemArray(itemData);


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
        let jsonTotal = localStorage.getItem('TOTAL');
        let total;
        if (jsonTotal) {
            total = JSON.parse(jsonTotal);
        }
        else {
            total = 0;
        }
        let json = localStorage.getItem('CHOOSINGS');
        let choosings;
        if (json) {
            choosings = JSON.parse(json);
        }
        else {
            choosings = [];
        }

        let thisRadioItemsId = radioTag.value;
        const selectedItem = items.getItemById(thisRadioItemsId);

        // let itemCounter = selectedItem.counter;
        // itemCounter++;
        // selectedItem.counter = itemCounter;

        let testItem = findById(choosings, selectedItem.id);

        if (!testItem) {
            selectedItem.counter = selectedItem.counter + 1;
            choosings.push(selectedItem);
        }
        else {
            testItem.counter++;
        }

        let stringifiedChooosings = JSON.stringify(choosings);
        localStorage.setItem('CHOOSINGS', stringifiedChooosings);
        console.log(stringifiedChooosings);

        total++;
        let stringifiedTotal = JSON.stringify(total);
        localStorage.setItem('TOTAL', stringifiedTotal);
        if (total >= 25) {
            document.body.removeChild(itemSection);
            const finalList = document.createElement('p');
            finalList.textContent = stringifiedChooosings;
            document.body.appendChild(finalList);
        }
        if (total < 25) {
            location.reload();
        }
    });
});
