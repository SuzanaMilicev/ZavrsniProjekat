export class Product{
    public id: number;
    public imgSrc: string;
    public name: string;
    public price: number;
    public description: string;
    public catId: number;

    constructor(id: number, imgSrc: string, name: string, price: number, description: string, catId: number){
        this.id = id;
        this.imgSrc = imgSrc;
        this.name = name;
        this.price = price;
        this.description = description;
        this.catId = catId;
    }
}