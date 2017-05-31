/**
	 *
	 * @Description(功能描述)    : 模板设置展示页面
	 * @author(作者)             :  李迎春
	 * @date (开发日期)          :  2017/5/12 14:35
	 * @param  request
	 * @param  response
	 * @return  Templet
	 */
import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { Form, Input, InputNumber, DatePicker, Radio, Button, Select, Row, Col, Checkbox,Popconfirm } from 'antd'
const FormItem = Form.Item;
import styles from './checkCpt.less'
const Option = Select.Option;
import  {EditableCell,EditableTable} from '../../../../../components/Table';
function handleChange(value) {
  console.log(`selected ${value}`);
}

function Templet({ location, dispatch, templet, loading }){
  ////debugger
  const { pagination, isMotion ,dataSource,count,namespace} = templet
  //点击编辑按钮修改当前行数据
  const handleChangeValue=(keyName, index, value)=> {
    dispatch({
      type:'templet/changeValue',
      payload:{
        index,
        value,
        keyName
      }
    })
  }

  const renderColumns = (dataSource, index, key, text)=> {
    const { editable, status, tagType, options  } = dataSource[index][key];
    if (typeof editable === 'undefined') {
      return text;
    }
    const dataProps={
      editable,
      status,
      tagType,
      options,
      value:text,
      index,
      keyName:key,
      dispatch,
      handleChangeValue
    }
    return <EditableCell {...dataProps} />
  }
  //表格里面的编辑按钮
  const edit=(index)=> {
    Object.keys(dataSource[index]).forEach((item) => {
      if (dataSource[index][item] && typeof dataSource[index][item].editable !== 'undefined') {
        dispatch({
          type:'templet/showInput',
          payload:{
            index,
            item,
            currentItem:dataSource[index][item].editable,
          }
        })
      }
    });
  }
  const onDelete=(index)=>{
    dispatch({
      type:'templet/delete',
      payload:{
        index,
      }
    })
  }
  // 表格中编辑按钮 保存/取消
  const editDone=(index, type)=> {
    const oldData=dataSource[index]
    if(type === 'cancel'){
      Object.keys(dataSource[index]).forEach((item) => {
        if (dataSource[index][item] && typeof dataSource[index][item].editable !== 'undefined') {
          dispatch({
            type:'templet/cancelSave',
            payload:{
              oldData,
              index,
              item,
              type,
            }
          })
        }
      })
    }
    Object.keys(dataSource[index]).forEach((item) => {
      if (dataSource[index][item] && typeof dataSource[index][item].editable !== 'undefined') {
        dispatch({
          type:'templet/hideInput',
          payload:{
            index,
            item,
            type,
          }
        })
      }
    });
    /* this.setState({ data }, () => {
     Object.keys(data[index]).forEach((item) => {
     if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
     delete data[index][item].status;
     }
     });
     });*/
  }
  //表头信息
  const tableColumns =   [
    {
      title: 'ID',
      dataIndex: 'tempCde',
      width: '10%',
      render: (text, record, index) => renderColumns(dataSource, index, 'tempCde', text),
    }, {
      title: '贷款品种描述',
      dataIndex: 'typDesc',
      render: (text, record, index) => renderColumns(dataSource, index, 'typDesc', text)
    }, {
      title: '模板名称',
      dataIndex: 'tempNam',
      render: (text, record, index) => renderColumns(dataSource, index, 'tempNam', text)
    }, {
      title: '模板类型',
      dataIndex: 'tempTyp',
      render: (text, record, index) => renderColumns(dataSource, index, 'tempTyp', text)
    }, {
      title: '操作',
      dataIndex: 'operation',
      width: '10%',
      render: (text, record, index) => {
        const { editable } = dataSource[index].tempCde;
        return (
          <div className="editable-row-operations">
            {
              editable ?
                <span>
                  <a onClick={() => editDone(index, 'save')}>确认</a>
                  <Popconfirm title="确定取消?" onConfirm={() => editDone(index, 'cancel')}>
                    <a> 取消 </a>
                  </Popconfirm>
                    <Popconfirm title="确定删除?" onConfirm={() => onDelete(index)}>
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
  const ediTableProps ={
    tableColumns,
    renderColumns,
    dataSourceMtd:dataSource,
    namespace,
    count,
    dispatch,
    edit,
    editDone,
    onDelete,
    pagination

  }

  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };

  return (
    <Form className="ant-advanced-search-form">
      <Row>
        <EditableTable {...ediTableProps}/>  {/*，设置设置--添加、编辑*/}
      </Row>
    </Form>
  );
}

Templet.propTypes = {
  Templet: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
}

//export  default Templet;
export default connect(({ templet, loading }) => ({ templet, loading: loading.models.templet }))(Form.create()(Templet));
