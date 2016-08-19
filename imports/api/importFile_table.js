// 用来保存导入的excel文件信息，主要是获取md5码以及进行唯一性判断
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

const importFileSchema = new SimpleSchema({
    md5: {
        type: String,
        label: "md5码",
        index: 1,
        max: 200,
    },
    fileName:{
        type: String,
        label:"文件名",
        index: 1,
        optional: true,
        max: 256,
    },

});

const importFileTable = new Mongo.Collection('importfiletable')
importFileTable.attachSchema(importFileSchema)

this.importFileTable = importFileTable;


export { importFileSchema, importFileTable }