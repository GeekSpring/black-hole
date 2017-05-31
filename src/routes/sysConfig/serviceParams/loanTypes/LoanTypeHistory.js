import React, { PropTypes } from 'react'
import { routerRedux,browserHistory } from 'dva/router'
import { connect } from 'dva'
import { Modal, Col, Row, Button } from 'antd'
import {LoanTypeModal,LoanTypesHistoryButton,SearchCaxs,RadioTable,CheckComputationModal,SalesPromotionModal,PCommRelRecordModal,LoanTypesCopyProModal,FeeRecordModal} from './components'
import {isEmpty} from '../../../../utils'
import {Search} from '../../../../components'

function LoanTypeHistory({ location, dispatch, loading, loanTypeHistory  }) {

  const { list, pagination, currentItem, modalVisible, copyProductVisible, modalType,checkCptType,salesPrtType, feeRecordType, isMotion, checkModalVisible,salesPrtModalVisible,selectedRows,feeRecordModalVisible,changeBtn} = loanTypeHistory
  // 动态生成表单数据
  const searchColums = [
    {
      title: '贷款品种代码',
      dataIndex: 'typCde',
      searchType:'input'
    }, {
      title: '贷款品种描述',
      dataIndex: 'typDesc',
      searchType:'input'
    }, {
      title: '贷款类型',
      dataIndex: 'typGrp',
      searchType:'select',
      selectOptions: [
        { value: 'carLoan', name: '汽车消费贷款' },
        { value: 'generalLoan', name: '一般消费贷款' },
        { value: 'productLoan', name: '耐用消费品贷款' }
      ],
    }, {
      title: '状态',
      dataIndex: 'typSts',
      searchType: 'radio',
      plainOptions : [
        { label: '生效', value: '0' },
        { label: '失效', value: '1' },
        { label: '待生效', value: '2' },
      ]
    }
  ];
  //修改
  const doUpdate=(id)=>{
    browserHistory.push(`/sysConfig/serviceParams/loanTypes/detail?id=${id}`);
  }
  //表头信息
  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
    }, {
      title: '贷款品种代码',
      dataIndex: 'typCde',
    }, {
      title: '贷款品种描述',
      dataIndex: 'typDesc',
    }, {
      title: '贷款类型',
      dataIndex: 'typGrp',
    },{
      title: '版本号',
      dataIndex: 'typVer',
    }, {
      title: '最后修改日期',
      dataIndex: 'lastChgDt',
    }, {
      title: '操作',
      render:(index)=>{
        return <a onClick={doUpdate.bind(null,index.id)}>修改</a>
      },
    }
  ];
  // 表单搜索props
  const LoanTypeFilterProps={
    onSearch (fieldsValue) {
      const {pathname}=location
      dispatch(routerRedux.push({
        pathname,
        query:fieldsValue,
      }))
    },
    searchColums,
  }
  //表格数据操作按钮 LoanTypesButton
  const LoanTypesButtonProps={

  }
  const PCommRelRecordModalProps={}
  //表格 list props
  const LoanTypeListProps={
    dataSource:list,
    loading,
    pagination,
    isMotion,
    columns,
    selectedRows,
    onChangeRadio(selectedRow){
      console.log(selectedRow)
      dispatch({
        type:'loanTypes/selectedRow',
        payload:{
          selectedRows:selectedRow,
        }
      })
    },
    onPageChange(page){
      const {query,pathname}=location
      dispatch(routerRedux.push({
        pathname,
        query:{
          ...query,
          page: page.current,
          pageSize:page.pageSize
        }
      }))
    }
  }
  return (
    <span>
      <h2>贷款品种历史版本</h2>
      <div className="content-inner">
        <SearchCaxs {...LoanTypeFilterProps}/>
        <LoanTypesHistoryButton {...LoanTypesButtonProps}/>
        <RadioTable {...LoanTypeListProps}/>
        <PCommRelRecordModal {...PCommRelRecordModalProps}/>
      </div>
    </span>
  );
}

LoanTypeHistory.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
  loanTypeHistory: PropTypes.object,
}



export default connect(
  ({loanTypeHistory, loading }) => (
    {  loading: loading.models.loanTypeHistory, loanTypeHistory }
  ))(LoanTypeHistory);
