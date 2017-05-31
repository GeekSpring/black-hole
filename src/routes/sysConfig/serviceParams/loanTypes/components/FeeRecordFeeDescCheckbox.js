/*费用设置---费用描述---*/
import React, { PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import {isEmpty} from '../../../../../utils'
import { connect } from 'dva'
import { Table, Col, Row, Button,Modal } from 'antd';
import {Search,SearchCaxs} from '../../../../../components'
import  {EditableTable,EditableCell} from '../../../../../components/Table'
function CostsSetList({ loading, dataSource, pagination, onPageChange,onChangeRadio,selectedRows }){


  const rowSelection = {
    type:'checkbox',
    onChange: (selectedRowKeys, selectedRow) => {
      onChangeRadio(selectedRow)
      selectedRows=selectedRow
    },

    onSelect: (record, selected, selectedRows) => {
      console.log(selected)
      console.log(selectedRows)
      console.log(record.typDesc)

    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      // console.log(selected, selectedRows, changeRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User',    // Column configuration not to be checked
    }),
  };

  const columns =[
    {
      title: '贷款品种描述',
      dataIndex: 'typDesc',
      render: (item) => {
        return item.value
      },
    }, {
      title: '费用描述 ',
      dataIndex: 'feeDesc',
      render: (item) => {
        return item.value
      },
    }, {
      title: '扣款顺序优先级',
      dataIndex: 'rpymOrdPriority',
      render: (item) => {
        return item.value
      },
    }, {
      title: '状态',
      dataIndex: 'sts',
      render: (item) => {
        return item.value
      },
    }
  ];

  return (<div>
    <Table
      bordered
      rowSelection={rowSelection}
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
  selectedRows: PropTypes.object,
  onChangeRadio: PropTypes.func,
  onPageChange: PropTypes.func
}

function CostsSet({ location, dispatch, costsSets, loading ,field,keyword,feeRecord}) {
  const {dataSourceMtd} = feeRecord
  const { list, pagination, isMotion,changeBtn,selectedRows,selectedRow } = costsSets
  //debugger;
  //const { field, keyword } = location.query
  const CostsSetListProps={
    dataSource:list,
    loading,
    pagination,
    isMotion,
    onChangeRadio(selectedRow){
      console.log(selectedRow)
      dispatch({
        type:'costsSets/selectedRow',
        payload:{
          selectedRows:selectedRow,
        }
      })
    },

    onPageChange(page){
      const {query,pathname}=location
      dispatch({
        type:'costsSets/query',//model下的reducers方法处理
        payload:{
          page: page.current,
          pageSize:page.pageSize,
          pathname
        }
      })
    }
  }
  // 简单搜索/高级搜索
  const handleChangeType=()=>{
    dispatch({
      type:'costsSets/changeBtnType',
      payload:{
        changeBtn
      }
    })
  }
  //搜索
  const searchColums = [
    {
      title: '费用代码',
      dataIndex: 'typCde',
      searchType:'input'
    }, {
      title: '费用描述',
      dataIndex: 'typDesc',
      searchType:'input'
    },
  ];
  //高级搜索
  const searchGroupProps = {
    field,
    keyword,
    size: 'large',
    select: true,
    selectOptions: [
      { value: 'typDesc', name: '费用描述',titVal:'typDesc' },
      { value: 'typCde', name: '费用代码',titVal:'typCde' },
      { value: 'all', name: '所有条件' }
    ],
    selectProps: {
      defaultValue: field || '所有条件',
    },
    onSearch (fieldsValue) {
      dispatch({
        type:'costsSets/query',
        payload:fieldsValue
      }
      )
    }
  }
  //条件查询  form 表单 props
  const LoanTypeFilterProps={
    onSearch (fieldsValue) {
      const {pathname}=location
      console.log(fieldsValue)
      dispatch({
        type:'costsSets/query',
        payload:fieldsValue
      })
    },
    searchColums,
  }

  const selectAndReturn=()=>{   /*费用描述----选取并返回*/
    if(!isEmpty(selectedRows)){
      //const selectedValue = selectedRows[0].typDesc  /*选中的值*/
      dispatch({
        type:'feeRecord/feeDescHideModal',
      })
      //dispatch({
      //  type:'feeRecord/updateSelectData',
      //  payload:{
      //    selectedValue,
      //  }
      //})
      /*选中返回数据*/
      console.log('0000000000000000000'+dataSourceMtd)
      dispatch({
          type:'feeRecord/returnNewData',
          payload: {
            selectedRows:selectedRows.concat(dataSourceMtd)
          }
        })
     //debugger;
      console.log(selectedRows)
    }else{
      Modal.confirm({
        title: '警告',
        iconType: 'exclamation-circle-o',
        content: '请先选择一条记录!',
        okText: '确定',
      });
    }
  }
  return (
    <div className="content-inner">
      <div>
        <h4>输入查询条件
          <Button type="primary" style={{float:'right'}} onClick={handleChangeType}>
            {changeBtn?'高级搜索':'简单搜索'}
          </Button>
        </h4>
        <br/>
        <div className="ant-advanced-search-form">
          {
            changeBtn?
              <Row>
              <Col lg={8} md={12} sm={16} xs={24} style={{ marginBottom: 16 }}>
                <Search {...searchGroupProps} />
              </Col>
             </Row>
              :
              <SearchCaxs {...LoanTypeFilterProps}/>
          }
        </div>
      </div>
      {/*费用描述*/}
      <CostsSetList {...CostsSetListProps}/>
      <Row>
        <Col span={40} style={{textAlign:'center'}}>
          <Button type="primary" onClick={selectAndReturn}>选取并返回</Button>
        </Col>
      </Row>
    </div>
  );
}
CostsSet.propTypes = {
  loanTypes: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
  changeBtn: PropTypes.bool,
}

export default connect(({ costsSets, feeRecord,loading }) => ({ costsSets, feeRecord,loading: loading.models.costsSets }))(CostsSet);

