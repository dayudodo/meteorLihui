// 对账表，使用二维码来输入，并且统计数量
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

const checkCountSchema = new SimpleSchema({
    productId:{
        type: String,
        label:"商品id",
        index: 1,
        optional: true,
        max: 50
    },
    barCode: {
        type: String,
        label: "国际条码",
        index: 1,
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
        label:"计数",
        optional: true,
    }
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
    checker:{
        type: String,
        label:'对账员',
        optional: true,
        max: 10
    }

});

const checkCountTable = new Mongo.Collection('checkcounttable')
checkCountTable.attachSchema(checkCountSchema)

this.checkCountTable = checkCountTable;


export { checkCountSchema, checkCountTable }