import { Mongo } from 'meteor/mongo';
import { Products }  from '/imports/api/products'

const checkProducts = new Mongo.Collection('checkproducts');

var CheckProductSchemas = {};


 CheckProductSchemas.Check = new SimpleSchema({
    productId:{
        type: String,
        label:'产品Id',
        index: 1,
        optional: true,
    },
    barCode: {
        type: String,
        label: "国际条码",
        max: 200,
        unique: true,
    },
    productName: {
        type: String,
        label: "商品名称",
        optional: true,
        max: 200,
    },
    count:{
        type: Number,
        label:'数量',
        optional: true,
    },
    comment1:{
        type: String,
        label:"备注1",
        optional: true,
        max: 512,
    },
    createdAt: {
        type: Date,
        label: "创建时间",
        optional: true,
        defaultValue: new Date(),
        autoform:{
            type: 'datetime-local'
        },
    },
    updatedAt: {
        type: Date,
        label: "更新时间",
        optional: true,
        defaultValue: new Date(),
        autoform:{
            type: 'datetime-local'
        },
    },
});

checkProducts.attachSchema(CheckProductSchemas.Check)
checkProducts.helpers({
    product(){
        return Products.findOne({barCode: this.barCode})
    }
})

export { checkProducts }