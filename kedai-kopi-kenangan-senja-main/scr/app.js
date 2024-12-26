document.addEventListener('alpine:init', () => {
    Alpine.data('products' , () => ({
        items: [
            {id: 1, name: 'Robusta Brazil' , img: '1.jpg' , price: 20000},
            {id: 2, name: 'Arabica Blend' , img: '2.jpg' , price: 25000},
            {id: 3, name: 'coffe bubuk' , img: '3.jpg' , price: 25000},
            {id: 4, name: 'Kopi merapi' , img: '4.jpg' , price: 25000},
            {id: 5, name: 'hansome coffe' , img: '5.jpg' , price: 25000},
        ],
    }));

Alpine.store('cart', {
    items: [], 
    total: 0,
    quantity: 0,
    add (newItem) {
        //CEK same item

        const cartItem = this.items.find ((item) => item.id == newItem.id);

        //kosong

        if(!cartItem) {
            this.items.push({...newItem, quantity: 1, total : newItem.price});
            this.quantity++;
            this.total += newItem.price
        } else {
            //ada 
            this.items =this.items.map((item) => {
                if(item.id !== newItem.id) {
                    return item;
                } else{
                    item.quantity++;
                    item.total = item.price * item.quantity;
                    this.quantity++;
                    this.total += item.price
                    return item;
                }
            })
        }
    },
    remove(id){
        //remove item

        const cartItem = this.items. find ((item) =>item.id == id);

        if(cartItem.quantity > 1 ) {
            //telusuri

            this.items = this.items.map ((item) => {
                //beda
                if (item.id !== id) {
                    return item;
                } else {
                    item.quantity--;
                    item.total =item.price * item.quantity;
                    this.quantity--;
                    this.total -= item.price;
                    return item;
                }
            })
        } else if (cartItem.quantity == 1) {
            this.items = this.items.filter((item) => item.id !== id );
            this. quantity--;
            this.total -=cartItem.price;
        }
    }
});
});


const checkoutButton = document.querySelector ('.checkout-button');
checkoutButton.disabled = true;

const form = document.querySelector('#checkoutForm');

form.addEventListener('keyup', function(){
    for(let i=0; i < form.nextElements.length; i++) {
        if (form.elements[i].value.length !== 0){
            checkoutButton.classList.remove('disabled');
            checkoutButton.classList.add('disabled');
        } else{
            return false;

        }
    }
    checkoutButton.disabled = false;
    checkoutButton.classList.remove('disabled');
});




//rupiah

const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID' ,{
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number);
};