import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Products, nameTable }  from '/imports/api/products'
import { saleSchema } from './sale_schema'

const SaleTable = new Mongo.Collection('saletable')
SaleTable.attachSchema(saleSchema)

this.SaleTable = SaleTable;


export { SaleTable }