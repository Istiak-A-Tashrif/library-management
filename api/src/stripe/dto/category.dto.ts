import {  IsArray, IsNotEmpty   } from "class-validator"

export class CheckoutDto {
    @IsArray()
    @IsNotEmpty()
    product:[]

    

    shipping: any

    billing: any

    discount_id?:number
    note?:string
}


//  [
//     {
//         product_id:"",
//         quantity:'';
//         total:"",
//     }
// ]

// cupon:""
// total:""
// shipping:{
//     shipping_address_id:null,
//     name:"",
//     email:'',
//     phone:"",
// }
// billing:{
//     billing_address_id:null,
//     name:"",
//     email:'',
//     phone:"",
// }