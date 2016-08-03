const ProductSchemas = {};


 ProductSchemas.Product = new SimpleSchema({
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
        max: 200,
    },
    model: {
        type: String,
        label: "商品规格",
        optional: true,
        max: 200,
    },
    marketUnit: {
        type: String,
        label: "销售单位",
        optional: true,
        max: 4
    },
    salesQuantity: {
        type: Number,
        label: "销售数量",
        optional: true,
        min: 0
    },
    salesAmount: {
        type: Number,
        label: "销售金额",
        optional: true,
        decimal:true,
        min: 0
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
    category:{
        type: String,
        label:"商品类别",
        optional: true,
        max: 200,
    },
    inventory:{
        type: Number,
        label: "库存",
        optional: true,
        min: 0,
    },
    comment:{
        type: String,
        label:"备注",
        optional: true,
        max: 512,
    },
    comment_1:{
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
});



export { ProductSchemas }