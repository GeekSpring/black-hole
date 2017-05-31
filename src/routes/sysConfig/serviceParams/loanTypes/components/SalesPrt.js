/**
 * Created by lenovo on 2017/5/3.
 */
/*
 促销设置弹框*/
import React, { PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Form, Row, Col, Input, Button, Icon, Select } from 'antd'
const FormItem = Form.Item;
import styles from './checkCpt.less'
const Option = Select.Option;
import  {EditableCell,EditableTable} from '../../../../../components/Table';  /*促销设置--添加*/
function handleChange(value) {
  console.log(`selected ${value}`);
}

function AdvancedSearchForm({ location, dispatch, salesPrt, loading }){
  const { pagination, isMotion } = salesPrt
  const renderColumns = (dataSource, index, key, text)=> {
    const { editable, status, tagType, options  } = dataSource[index][key];
    if (typeof editable === 'undefined') {
      return text;
    }
    return <EditableCell
      editable={editable}
      value={text}
      tagType={tagType}
      options={options}
      {...text}
      onChange={value => handleChange(key, index, value)}
      status={status}
    />
  }
  //表头信息
  const tableColumns =   [
    {
      title: 'ID',
      dataIndex: 'number',
      width: '10%',
      render: (text, record, index) => renderColumns(dataSourceMtd, index, 'number', text),
    }, {
      title: '促销描述',
      dataIndex: 'salesDescrip',
      render: (text, record, index) => renderColumns(dataSourceMtd, index, 'salesDescrip', text)
    }, {
      title: '促销开始日',
      dataIndex: 'salesStart',
      render: (text, record, index) => renderColumns(dataSourceMtd, index, 'salesStart', text)
    }, {
      title: '促销结束日',
      dataIndex: 'salesEnd',
      render: (text, record, index) => renderColumns(dataSourceMtd, index, 'salesEnd', text)
    },  {
      title: '利率调整类型',
      dataIndex: 'rateAdjustType',
      render: (text, record, index) => renderColumns(dataSourceMtd, index, 'rateAdjustType', text)
    },  {
      title: '调整值',
      dataIndex: 'adjustValue',
      render: (text, record, index) => renderColumns(dataSourceMtd, index, 'adjustValue', text)
    },  {
      title: '状态',
      dataIndex: 'loanStatus',
      render: (text, record, index) => renderColumns(dataSourceMtd, index, 'loanStatus', text)
    }, {
      title: '操作',
      dataIndex: 'operation',
      width: '10%',
      render: (text, record, index) => {
        const { editable } = dataSourceMtd[index].number;
        return (
          <div className="editable-row-operations">
            {
              editable ?
                <span>
                  <a onClick={() => editDone(index, 'save')}>保存</a>
                  <Popconfirm title="确定取消?" onConfirm={() => editDone(index, 'cancel')}>
                    <a> 取消 </a>
                  </Popconfirm>
                    <Popconfirm title="确定删除?" onConfirm={() => this.onDelete(index)}>
                      <a href="#">删除</a>
                    </Popconfirm>
                </span>
                :
                <span>
                  <a onClick={() =>edit(index)}>编辑</a>
                </span>
            }
          </div>
        );
      },
    }];
  const  dataSourceMtd= [{
    key: '0',
    number:{
      value:'1',
      editable: false,
      tagType:'input',
    } ,
    salesDescrip:{
      value:'描述',
      editable: false,
      tagType:'input',
    } ,
    salesStart:{
      value:'2015/01/01',
      editable: false,
      tagType:'datePicker',
    } ,
    salesEnd:{
      value:'2015/01/01',
      editable: false,
      tagType:'datePicker',
    } ,
    rateAdjustType:{
      value:'浮动比例',
      editable: false,
      tagType:'select',
    } ,
    loanStatus:{
      value:'lucy',
      editable: false,
      tagType:'select',
    } ,
    adjustValue:{
      value:'1',
      editable: false,
      tagType:'inputNum',
    } ,
  },]
  //表格里面的编辑按钮
  const edit=(index)=> {
    Object.keys(dataSourceMtd[index]).forEach((item) => {
      if (dataSourceMtd[index][item] && typeof dataSourceMtd[index][item].editable !== 'undefined') {
        dispatch({
          type:'pLoanTypMtd/showInput',
          payload:{
            index,
            item,
            currentItem:dataSourceMtd[index][item].editable,
          }
        })
      }
    });
  }
  const onDelete=(index)=>{
    dispatch({
      type:'pLoanTypMtd/delete',
      payload:{
        index,
      }
    })
  }
  const EditableProps={
    dataSourceMtd,
    loading,
    pagination,
    isMotion,
    dispatch,
    renderColumns,
    tableColumns,
    edit,
    onDelete,
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

    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };

    return (
      <Form
        className="ant-advanced-search-form"
      >
        <Row gutter={40}>
          <h4>贷款品种信息</h4>
          <Col span={12} >
            <FormItem {...formItemLayout} label={`贷款品种代码： `}>
              <Input placeholder="placeholder" />
            </FormItem>
          </Col>
          <Col span={12} >
            <FormItem {...formItemLayout} label={`贷款品种描述：`}>
              <Input placeholder="placeholder" />
            </FormItem>
          </Col>
          <Col span={12} >
            <FormItem {...formItemLayout} label={`贷款品种详述：`}>
              <Input type="textarea" placeholder="贷款品种详述..." autosize={{ minRows: 2, maxRows: 6 }} />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <EditableTable {...EditableProps}/>  {/*促销设置--添加、编辑*/}
        </Row>
      </Form>
    );
}

AdvancedSearchForm.propTypes = {
  salesPrt: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
}

const SalesPrtComp = Form.create()(AdvancedSearchForm);

//export  default SalesPrtComp;

export default connect(({ salesPrt, loading }) => ({ salesPrt, loading: loading.models.salesPrt }))(SalesPrtComp);
