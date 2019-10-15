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

}
