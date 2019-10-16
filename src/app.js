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

let jsonRemoved1 = localStorage.getItem('REMOVED1');
let jsonRemoved2 = localStorage.getItem('REMOVED2');
let jsonRemoved3 = localStorage.getItem('REMOVED3');
let randomItemOne;
let randomItemTwo;
let randomItemThree;
debugger;
if (jsonRemoved1 && jsonRemoved2 && jsonRemoved3) {
    randomItemOne = JSON.parse(jsonRemoved1);
    randomItemTwo = JSON.parse(jsonRemoved2);
    randomItemThree = JSON.parse(jsonRemoved3);
}

let jsonWorking = localStorage.getItem('WORKING');
let working;
if (jsonWorking){
    working = new itemArray(itemData);
    working = working.removeItemById(randomItemOne.id, working);
    working = working.removeItemById(randomItemTwo.id, working);
    working = working.removeItemById(randomItemThree.id, working);
    localStorage.setItem('WORKING', JSON.stringify(working));
    debugger;
} 
else {
    working = new itemArray(itemData);
    jsonWorking = localStorage.setItem('WORKING', JSON.stringify(working));
}

randomItemOne = working.getRandomItem(); // send to local storage
randomItemTwo = working.getRandomItem(); // send to local storage
while (randomItemOne === randomItemTwo){
    randomItemTwo = working.getRandomItem(); // send to local storage
}
randomItemThree = working.getRandomItem();
while (randomItemThree === randomItemTwo || randomItemThree === randomItemOne){
    randomItemThree = working.getRandomItem();
}

jsonRemoved1 = localStorage.setItem('REMOVED1', JSON.stringify(randomItemOne));
jsonRemoved2 = localStorage.setItem('REMOVED2', JSON.stringify(randomItemTwo));
jsonRemoved3 = localStorage.setItem('REMOVED3', JSON.stringify(randomItemThree));


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

        total++;
        let stringifiedTotal = JSON.stringify(total);
        localStorage.setItem('TOTAL', stringifiedTotal);
        if (total >= 25) {
            document.body.removeChild(itemSection);
            let finalChoosings = JSON.parse(localStorage.getItem('CHOOSINGS'));
            const finalList = document.createElement('ul');
            for (let i = 0; i < finalChoosings.length; i++){
                const listItem = document.createElement('li');
                listItem.textContent = finalChoosings[i].name + ',' + ' ' + finalChoosings[i].counter;
                finalList.appendChild(listItem);
            }
            // finalList.textContent = stringifiedChooosings;
            document.body.appendChild(finalList);
        }
        if (total < 25) {
            location.reload();
        }
    });
});
