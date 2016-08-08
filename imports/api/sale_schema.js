export const saleSchema = new SimpleSchema({
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
    sailerName:{
        type: String,
        label:"销售员",
        optional:true,
        max: 10
    },
    sailTime:{
        type: Date,
        label:"销售时间",
        optional:true
    },
    salesAmount: {
        type: Number,
        label: "销售金额",
        decimal:true,
        min: 0.1
    },
    salesQuantity:{
        type: Number,
        label:"销售数量",
        min: 1
    },
    singleCostPrice: {
        type: Number,
        label: "单台成本价",
        optional: true,
        decimal:true,
        min: 0
    },
    totalCostPrice: {
        type: Number,
        label: "总成本价",
        optional: true,
        decimal:true,
        min: 0,
    },
    royalty: {
        type: Number,
        label: "提成",
        optional: true,
        decimal:true,
        min: 0,
    }, 
    marketRoyalty: {
        type: Number,
        label: "超市提成",
        optional: true,
        decimal:true,
        min: 0,
    },
    profit: {
        type: Number,
        label: "总利润",
        optional: true,
        decimal:true,
        min: 0
    },
    importSource:{
        type: String,
        label:"导入来源",
        optional: true
    },
    comment1:{
        type: String,
        label:"备注1",
        optional: true
    }
});