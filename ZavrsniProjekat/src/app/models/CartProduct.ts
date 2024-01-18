export class CartProduct{
    public id: number;
    public imgSrc: string;
    public name: string;
    public price: number;
    public quantity : number;

    constructor(id: number, imgSrc: string, name: string, price: number, quantity : number){
        this.id = id;
        this.imgSrc = imgSrc;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
}