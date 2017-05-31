import React, { PropTypes } from 'react'
import { Table } from 'antd';

function CostsSetList({ loading, dataSource, pagination, onPageChange,}){
  const columns = [{
    title: 'id',
    dataIndex: 'id',
  },{
    title: '费用代码',
    dataIndex: 'costsCode',
  }, {
    title: '费用描述',
    dataIndex: 'costsDescription',
  }, {
    title: '费用类型',
    dataIndex: 'costsType',
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

export  default CostsSetList;
