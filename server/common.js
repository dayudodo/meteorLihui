// 获取到中文字段名数组在第一行中的第几个序号
export const getField = function(str){
    if (!_.include(_.first(this.data), str) ) {
      return undefined
    }else{
      return _.first(this.data).indexOf(str)
    }
}
