export const saleSchema = new SimpleSchema({
    productId:{
        type: String,
        label:"商品id",
        max: 50
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
    comments:{
        type: String,
        label:"备注",
        optional: true
    }
});