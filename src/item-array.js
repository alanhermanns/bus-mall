export class itemArray {
    constructor(items){
        this.items = items.slice();
    }
    getItems() {
        return this.items;
    }

    getItemById(anId){
        let matchingItem;
        this.items.forEach(item => {
            
            if (item.id === anId){
                matchingItem = item;
            }
        });
        return matchingItem;
    }

    getRandomItem() {
        const randomItemIndex = Math.floor(Math.random() * this.items.length);
        return this.items[randomItemIndex];
    }

    incrementItemCounter(item){
        let counterValue = item.counter;
        counterValue++;
        item.counter = counterValue;
        return item;
    }

    removeItemById(itemId) {
        const items = this.items;
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (item.id === itemId) {
                items.splice(i, 1);
                return;
            }
        }
    }
}