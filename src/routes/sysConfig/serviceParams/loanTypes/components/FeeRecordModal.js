/*费用设置---*/
import React, { PropTypes } from 'react'
import { Form, Modal, Popconfirm } from 'antd'
import { connect } from 'dva'
import  {EditableTable,EditableCell} from '../../../../../components/Table'
import  EditFunc from '../../../../../components/Table/EditFunc'
import  FeeRecordDoViewModal  from './FeeRecordDoViewModal'
import  FeeRecordFeeDescModal  from './FeeRecordFeeDescModal'
function FeeRecordModal({
  feeRecord,
  dispatch,
  loading,
  location
  }){
  let { dataSourceMtd,count,addFlag,addArr,oldDataSourceMtd,pagination,visible,doViewType,feeDescType,doViewModalVisible,feeDescModalVisible,currentItem}=feeRecord
  const dataSourceModels={
    dataSource:dataSourceMtd,
    oldDataSource:oldDataSourceMtd,
    addArr
  }
  const nameSpace='feeRecord'
  function handleOk() {
    console.log(dataSourceMtd)
  }
  function onCancel(){
    //debugger;
    dispatch({
      type:'feeRecord/hideModal',

    })
  }
  const modalOpts={
    title:`费用设置`,
    visible,
    onOk:handleOk,
    onCancel,
    width:1000,
    okText:`保存`,
    cancelText:`关闭`
  }

  const renderColumns = (dataSource, index, key, text)=> {
    const { editable, status, tagType, options  } = dataSource[index][key];
    if (typeof editable === 'undefined') {
      return text;
    }

    const dataProps={
      editable,
      keyWord:key,
      status,
      tagType,
      options,
      value:text,
      index,
      keyName:key,
      dispatch,
      editCellOptions,
      doView,
      nameSpace,
      searchCellBtn,
      location
    }
    return <EditableCell {...dataProps} />
  }
  const editCellOptions={
    sts : [
      { value: '生效', name: '生效' },
      { value: '不生效', name: '不生效' },
    ],
  }

  //表头信息
  const tableColumns =   [
    {
      title: '贷款品种描述',
      dataIndex: 'typDesc',
      render: (text, record, index) => renderColumns(dataSourceMtd, index, 'typDesc', text),
    }, {
      title: '费用描述 ',
      dataIndex: 'feeDesc',
      render: (text, record, index) => renderColumns(dataSourceMtd, index, 'feeDesc', text)
    }, {
      title: '扣款顺序优先级',
      dataIndex: 'rpymOrdPriority',
      render: (text, record, index) => renderColumns(dataSourceMtd, index, 'rpymOrdPriority', text)
    }, {
      title: '状态',
      dataIndex: 'sts',
      render: (text, record, index) => renderColumns(dataSourceMtd, index, 'sts', text)
    },  {
      title: '费用明细',
      dataIndex: 'actions',
      render: (text, record, index) => {
        return (
          <div onClick={doView||''}>
           <a href="javascript:;">查看</a>
          </div>
        );
      },
    },  {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record, index) => EditFunc(text, record, index, dataSourceModels,dispatch,nameSpace),
    }
    ];
  const newRow=[];
  const newData = {
    key: count,
    typDesc:{
      value:'贷款品种描述',
      editable: true,
      tagType:'input',
    } ,
    feeDesc:{
      value: '费用描述',
      editable: true,
      tagType:'button',
    } ,
    rpymOrdPriority:{
      value:'1',
      editable: true,
      tagType:'inputNum',
    },
    sts:{
      value:'生效',
      editable: true,
      tagType:'select',
      options: [
        { value: '生效', name: '生效' },
        { value: '不生效', name: '不生效' },
      ],
    } ,
    actions:{
      value:'查看',
 /*     editable: false,
      tagType:'p',*/
    } ,
  };
  //查看费用明细
  const doView=()=>{
    dispatch({
      type:'feeRecord/doViewShowModal',
      payload:{
        doViewType:'doView',/*查看费用明细*/
      }
    })
  }
  //编辑表格搜索按钮---费用描述
  const searchCellBtn=()=>{
    dispatch({
      type:'feeRecord/feeDescShowModal',
      payload:{
        feeDescType:'feeDesc',
      }
    })
    dispatch({
      type:'costsSets/query',
      payload:{

      }
    })
  }
  const ediTableProps ={
    tableColumns,
    dataSourceMtd,
    pagination,
    count,
    dispatch,
    addFlag,
    nameSpace,
    newData,
    loading,
    location,
    newRow
  }
  // 查看费用明细
  const feeRecordDoViewModalProps={
 /*   item: doViewType==='doView'?{}:currentItem,*/
    type: doViewType,
    visible: doViewModalVisible,
    location,
    onOk(data){
      //此方法执行异步请求
      dispatch({
        type:`feeRecord/${doViewType}`,
        payload: data,
      })
    },
    onCancel(){
      dispatch({
        type:'feeRecord/doViewHideModal',
        addFlag:true
      })
    }
  }
  // 费用描述
  const feeDescModalProps={
    type: feeDescType,
    visible: feeDescModalVisible,
    location,
    onOk(data){
      //此方法执行异步请求
      dispatch({
        type:`feeRecord/${feeDescType}`,
        payload: data,
      })
    },
    onCancel(){
      dispatch({
        type:'feeRecord/feeDescHideModal',
        addFlag:true
      })
    }
  }
  return(
    <Modal {...modalOpts}>
      <EditableTable {...ediTableProps} />
      {/*查看费用明细*/}
      <FeeRecordDoViewModal {...feeRecordDoViewModalProps} />
      {/*费用描述*/}
      <FeeRecordFeeDescModal {...feeDescModalProps} />
    </Modal>
  )
}

FeeRecordModal.PropTypes={
  feeRecord:PropTypes.object,
  loading:PropTypes.object,
}
export default connect(({feeRecord,loading }) => ({ feeRecord,loading: loading.models.feeRecord }))(Form.create()(FeeRecordModal));


