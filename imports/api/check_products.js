import { Mongo } from 'meteor/mongo';
const checkProducts = new Mongo.Collection('checkproducts');

var CheckProductSchemas = {};


 CheckProductSchemas.Check = new SimpleSchema({
    product_id:{
        type: String,
        label:'产品Id',
    },
    barCode: {
        type: String,
        label: "国际条码",
        index: 1,
        unique: true,
        max: 200,
    },
    productName: {
        type: String,
        label: "商品名称",
        optional: true,
        index: 1,
        max: 200,
    },
    count:{
        type: Number,
        label:'数量',
        optional: true,
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

export { checkProducts }