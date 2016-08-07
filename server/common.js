export const getField = function(str){
    if (!_.include(_.first(this.data), str) ) {
      return undefined
    }else{
      return _.first(this.data).indexOf(str)
    }
}
