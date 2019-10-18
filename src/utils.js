export const findById = (arr, idOne) => {
    for (let i = 0; i < arr.length; i++){
        if (arr[i].id === idOne){
            return arr[i];
        }
    }
};
