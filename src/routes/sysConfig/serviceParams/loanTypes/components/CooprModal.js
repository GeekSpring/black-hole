/**
	 *
	 * @Description(功能描述)    : 机构选择
	 * @author(作者)             :  李迎春
	 * @date (开发日期)          :  2017/5/25 15:06
	 * @param  request
	 * @param  response
	 * @return  Object
	 */
import React, { PropTypes } from 'react'
import { Form, Modal, Col, Row, Button } from 'antd'
import {isEmpty} from '../../../../../utils'
import { connect } from 'dva'
import {TransferTable} from '../../../../../components/Table'
import {Search,SearchCaxs} from '../../../../../components'
require('../index.less')

const CooprModal=({ coopr, location,loading,dispatch,field, keyword})=>{

  let { dataSource,targetSource,operationSource,rightSelectedRows,leftSelectedRows,visible,count,pagination,changeBtn}=coopr
  console.log('dataSource',dataSource)
  const nameSpace='coopr'


  function handleOk() {

  }
  function onCancel(){
    dispatch({
      type:`${nameSpace}/cooprModalHide`
    })
  }
  // 简单搜索/高级搜索
  const handleChangeType=()=>{
    dispatch({
      type:`${nameSpace}/changeBtnType`,
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
      { value: 'cooprCde', name: '合作机构代码',titVal:'cooprCde' },
      { value: 'cooprName', name: '合作机构名称',titVal:'cooprName' },
      { value: 'all', name: '所有条件' }
    ],
    selectProps: {
      defaultValue: field || '合作机构名称',
    },
    onSearch (fieldsValue) {
      dispatch(routerRedux.push({
        pathname: '/sysConfig/serviceParams/loanTypes',
        query:fieldsValue,
      }))
    }
  }

  //动态生成表单数据
  const searchColums = [
    {
      title: '合作机构代码',
      dataIndex: 'cooprCde',
      searchType:'input'
    }, {
      title: '合作机构名称',
      dataIndex: 'cooprName',
      searchType:'input'
    }
  ];
  //条件查询  form 表单 props
  const SearchFilterProps={
    onSearch (fieldsValue) {
      const {pathname}=location
      dispatch(routerRedux.push({
        pathname,
        query:fieldsValue,
      }))
    },
    searchColums,
  }


  const modalOpts={
    title:`合作机构信息`,
    visible,
    handleOk,
    onCancel,
    width:1300,
    okText:`保存`,
    cancelText:`关闭`
  }
  //表头信息
  const tableColumns =   [
    {
      title: '合作机构代码',
      dataIndex: 'cooprCde'
    }, {
      title: '合作机构名称',
      dataIndex: 'cooprName'
    }, {
      title: '机构性质',
      dataIndex: 'cooprKind'
    },{
      title: '所在省',
      dataIndex: 'cooprProvince'
    },
    {
      title: '所在市',
      dataIndex: 'cooprCity'
    },
    {
      title: '所在区',
      dataIndex: 'cooprArea'
    },
  ];
  //选中行的参数
  function doLeftSelectedRows(selectedRowsParam) {
    dispatch({ type: `${nameSpace}/getLeftSelectedRows`, payload: {selectedRowsParam} })
  }

  //选中行的参数
  function doRightSelectedRows(selectedRowsParam) {
    dispatch({ type: `${nameSpace}/getRightSelectedRows`, payload: {selectedRowsParam} })
  }
  //左边表props
  const leftTableProps ={
    tableColumns,
    dataSource:dataSource,
    pagination,
    getSelectedRows(selectedRowsParam){
      doLeftSelectedRows(selectedRowsParam);
    },
    location,
    loading
  }
  //右边表props
  const rightTableProps ={
    tableColumns,
    dataSource:targetSource,
    getSelectedRows(selectedRowsParam){
      doRightSelectedRows(selectedRowsParam);
    },
  }

  function doLeftOperation() {
    console.log('leftSelectedRows===',leftSelectedRows)
  }
  const transferProps ={
    leftTableProps,
    rightTableProps,
    visible:false,
    rightOperation(){
      doRightOperation();
    },
    leftOperation () {
      doLeftOperation();
    },
  }

  return(
  <Modal wrapClassName="vertical-center-modal" {...modalOpts}>
    <div>
      <div>
        <Row>
          <Button type="primary" style={{float:'left'}} onClick={handleChangeType}>
            {changeBtn?'高级搜索':'简单搜索'}
          </Button>
        </Row>
        <br/>
        <div className="ant-advanced-search-form">
          {
            changeBtn?<Row>
              <Col lg={8} md={12} sm={16} xs={24} style={{ marginBottom: 16 }}>
                <Search {...searchGroupProps} />
              </Col>
            </Row>
              :
              <SearchCaxs {...SearchFilterProps}/>
          }
        </div>
      </div>
      <TransferTable {...transferProps}/>
    </div>
  </Modal>
  )
}



export default connect(({coopr,loading }) => ({ coopr,loading: loading.models.coopr }))(Form.create()(CooprModal));
