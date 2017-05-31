import React, { PropTypes } from 'react'
import { routerRedux,browserHistory } from 'dva/router'
import { connect } from 'dva'
import { Icon,Modal, Col, Row, Button } from 'antd'
import {LoanTypeModal,LoanTypesButton,SearchCaxs,RadioTable,CheckComputationModal,SalesPromotionModal,LoanTypesCopyProModal,FeeRecordModal,TempletModal,LoanTypExtModal} from './components'


import {Search} from '../../../../components'


function LoanType({ location, dispatch, loanTypes, loading, field, keyword}) {

  //动态生成表单数据
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
  //表头信息
  const columns = [
    {
      title: '贷款品种代码',
      dataIndex: 'typCde',
    }, {
      title: '贷款品种描述',
      dataIndex: 'typDesc',
    }, {
      title: '贷款类型',
      dataIndex: 'typGrp',
    }, {
      title: '生效日期',
      dataIndex: 'startDt',
    }, {
      title: '状态',
      dataIndex: 'typSts',
    }
  ];
  //loanTypes model 关联数据
  const { list, pagination, currentItem, modalVisible, copyProductVisible, modalType,checkCptType,salesPrtType, isMotion, checkModalVisible,salesPrtModalVisible,selectedRows,changeBtn} = loanTypes
  // 弹窗 modal props　　－－－－ｄｅｍｏ
  const loanTypesModalpProps={
    /*item: create==='create'?{}:currentItem,*/
    type: modalType,
    visible: modalVisible,
    selectedRows,
    onOk(data){
      //此方法执行异步请求
      dispatch({
        type:`loanTypes/${modalType}`,
        payload: data,
      })

    },
    onCancel(){
      dispatch({
        type:'loanTypes/hideModal'
      })
    }

  }
  // 弹窗 modal props-----核算设置
  const CheckComputationModalProps={
    item: checkCptType==='checkCptSet'?{}:currentItem,
    type: checkCptType,
    visible: checkModalVisible,
    onOk(data){
      //此方法执行异步请求
      dispatch({
        type:`loanTypes/${checkCptType}`,
        payload: data,
      })
    },
    onCancel(){
      dispatch({
        type:'loanTypes/checkHideModal',
        addFlag:true
      })
    }
  }
  // 弹窗 modal props-----促销设置
  const salesPromotionModalProps={
    item: salesPrtType==='salesPrt'?{}:currentItem,
    type: salesPrtType,
    visible: salesPrtModalVisible,
    onOk(data){
      //此方法执行异步请求
      dispatch({
        type:`loanTypes/${salesPrtType}`,
        payload: data,
      })
    },
    onCancel(){
      dispatch({
        type:'loanTypes/salesPrtHideModal',
        addFlag:true
      })
    }
  }

  //条件查询  form 表单 props
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
  //表格 list props
  const LoanTypeListProps={
    dataSource:list,
    loading,
    pagination,
    isMotion,
    columns,
    selectedRows,
    onChangeRadio(selectedRow){
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
  //表格数据操作按钮 LoanTypesButton
  const LoanTypesButtonProps={selectedRows, dispatch}
  // 简单搜索/高级搜索
  const handleChangeType=()=>{
    dispatch({
      type:'loanTypes/changeBtnType',
      payload:{
        changeBtn
      }
    })
  }
  //高级搜索
  const searchGroupProps = {
    field,
    keyword,
    size: 'large',
    select: true,
    selectOptions: [
      { value: 'typDesc', name: '贷款品种描述',titVal:'typDesc' },
      { value: 'typCde', name: '贷款品种代码',titVal:'typCde' },
      { value: 'all', name: '所有条件' }
    ],
    selectProps: {
      defaultValue: field || '贷款品种描述',
    },
    onSearch (fieldsValue) {
      dispatch(routerRedux.push({
        pathname: '/sysConfig/serviceParams/loanTypes',
        query:fieldsValue,
      }))
    }
  }
  //复制产品 props LoanTypesCopy
  const LoanTypesCopyProps={
    visible: copyProductVisible,
    onOk(data){
      //此方法执行异步请求
      browserHistory.push(`/sysConfig/serviceParams/loanTypes/detail`);
      dispatch({
        type:`loanTypes/${checkCptType}`,
        payload: data,
      })
    },
    onCancel(){
      dispatch({
        type:'loanTypes/copyProHideModal'
      })
    }
  }


  return (
  <div className="content-inner">
    <div>
      <h4>输入查询条件
        <Button type="primary" style={{float:'right'}} onClick={handleChangeType}>
          {changeBtn?'高级搜索':'简单搜索'}
        </Button>
      </h4><br/>
      <div className="ant-advanced-search-form">
        {
          changeBtn?<Row>
            <Col lg={8} md={12} sm={16} xs={24} style={{ marginBottom: 16 }}>
              <Search {...searchGroupProps} />
            </Col>
          </Row>
            :
            <SearchCaxs {...LoanTypeFilterProps}/>
        }
      </div>
    </div>
    <LoanTypesButton {...LoanTypesButtonProps}/>
    <RadioTable {...LoanTypeListProps}/>
    <LoanTypeModal {...loanTypesModalpProps}/>
    <CheckComputationModal {...CheckComputationModalProps}/>
    {/*促销设置*/}
    <SalesPromotionModal {...salesPromotionModalProps}/>
    {/*模板设置弹出层*/}
    <TempletModal location={location}/>
    {/*其它设置弹出层*/}
    <LoanTypExtModal/>
    {/*复制产品*/}
    <LoanTypesCopyProModal {...LoanTypesCopyProps}/>
    {/*费用设置*/}
    <FeeRecordModal location={location}/>
  </div>
  );
}

LoanType.propTypes = {
  loanTypes: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
  changeBtn: PropTypes.bool,
}



export default connect(
  ({loanTypes, loading}) => (
    { loanTypes, loading: loading.models.loanTypes }
  ))(LoanType);
