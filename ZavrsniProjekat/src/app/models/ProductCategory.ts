export class ProductCategory{
    public id: number;
    public name: string;
    public imgSrc: string;

    constructor(id: number, name: string, imgSrc: string){
        this.id = id;
        this.name = name;
        this.imgSrc = imgSrc;
    }
}