import React, { PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import CostsSetList from './costsSetList'

function CostsSet({ location, dispatch, costsSets, loading }) {
  const { list, pagination, isMotion } = costsSets
  //const { field, keyword } = location.query
  const CostsSetListProps={
    dataSource:list,
    loading,
    pagination,
    isMotion,
    onPageChange(page){
      const {query,pathname}=location
      dispatch({
        type:'costsSets/query',//model下的reducers方法处理
        payload:{
          page: page.current,
          pageSize:page.pageSize,
        }
      })
    }
  }
  return (
    <div className="content-inner">
      <CostsSetList {...CostsSetListProps}/>
    </div>
  );
}
CostsSet.propTypes = {
  loanTypes: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
}

export default connect(({ costsSets, loading }) => ({ costsSets, loading: loading.models.costsSets }))(CostsSet);
