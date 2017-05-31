/*费用设置---查看费用--适用功能---*/
import React, { PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Table } from 'antd';

function CostsSetList({ loading, dataSource, pagination, onPageChange,}){
  const columns = [ {
    title: '功能代码',
    dataIndex: 'costsCode',
  }, {
    title: '功能描述',
    dataIndex: 'costsDescription',
  }, {
    title: '状态',
    dataIndex: 'dataType',
  } ];
  return (<div>
    <Table
      columns={columns}
      dataSource={dataSource}
      rowKey={record => record.id}
      loading={loading}
      onChange={onPageChange}
      pagination={pagination}
    />
  </div>)
}
CostsSetList.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  pagination: PropTypes.object,
  onPageChange: PropTypes.func
}

function FeeRecordToolBarComp({ location, dispatch, costsSets, loading }) {
  const { list, pagination, isMotion } = costsSets
  //debugger;
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
FeeRecordToolBarComp.propTypes = {
  loanTypes: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
}

export default connect(({ costsSets, loading }) => ({ costsSets, loading: loading.models.costsSets }))(FeeRecordToolBarComp);

