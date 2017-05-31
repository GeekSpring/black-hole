/*费用设置---查看费用--费用计算---*/
import React, { PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Table } from 'antd';

function CostsSetList({ loading, dataSource, pagination, onPageChange,}){
  const columns = [{
    title: '收取类型',
    dataIndex: 'feeTnrTyp',
  },{
    title: '支持最小期限',
    dataIndex: 'feeMinTnr',
  }, {
    title: '支持最大期限',
    dataIndex: 'feeMaxTnr',
  }, {
    title: '贷款最小金额（含）',
    dataIndex: 'loanMinAmt',
  }, {
    title: '贷款最大金额（含）',
    dataIndex: 'loan_max_amt',
  }, {
    title: '期限单位',
    dataIndex: 'tnr_unit',
  },{
    title: '计算类型',
    dataIndex: 'fee_action_typ',
  }, {
    title: '计算基础',
    dataIndex: 'fee_pct_base',
  }, {
    title: '开始期数',
    dataIndex: 'fee_tnr_str',
  }, {
    title: '结束期数',
    dataIndex: 'fee_tnr_end',
  }, {
    title: '费用比例',
    dataIndex: 'fee_pct',
  }, {
    title: '费用金额',
    dataIndex: 'fee_fix_amt',
  }, {
    title: '最低费用',
    dataIndex: 'fee_min_amt',
  }, {
    title: '最高费用',
    dataIndex: 'fee_max_amt',
  }, {
    title: '是否摊销',
    dataIndex: 'fee_acc_ind',
  }, {
    title: 'SEQ',
    dataIndex: 'seq',
  },  {
    title: '费用代码',
    dataIndex: 'fee_cde',
  }, {
    title: '最新变更时间',
    dataIndex: 'last_chg_dt',
  }, {
    title: '最新变更用户',
    dataIndex: 'last_chg_usr',
  }, ];
  return (<div>
    <Table
      columns={columns}
      bordered
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

function FeeRecordFeeCalComp({ location, dispatch, costsSets, loading }) {
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
FeeRecordFeeCalComp.propTypes = {
  loanTypes: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
}

export default connect(({ costsSets, loading }) => ({ costsSets, loading: loading.models.costsSets }))(FeeRecordFeeCalComp);

