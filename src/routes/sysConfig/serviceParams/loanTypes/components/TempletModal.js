/**
 *
 * @Description(功能描述)    : 模板设置弹出层
 * @author(作者)             :  李迎春
 * @date (开发日期)          :  2017/5/12 14:40
 * @param  request
 * @param  response
 * @return  TempletShowModal
 */
import React, { PropTypes } from 'react'
import { Form, Modal, Popconfirm } from 'antd'
import {isEmpty} from '../../../../../utils'
import { connect } from 'dva'
import  {EditableTable,EditableCell} from '../../../../../components/Table'
import  EditFunc from '../../../../../components/Table/EditFunc'
const TempletModal=({
                      templet,
                      dispatch,
                      location,
                      loading,
                    })=>{
  let { dataSource,count,addFlag,addArr,oldDataSource,pagination,visible,selectedRows}=templet
  const nameSpace='templet'
  const dataSourceModels={
    dataSource:dataSource,
    oldDataSource:oldDataSource,
    addArr
  }
  function handleOk() {

  }
  function onCancel(){
    dispatch({
      type:`${nameSpace}/templetModalHide`
    })
  }

  const modalOpts={
    title:`模板设置`,
    visible,
    handleOk,
    onCancel,
    width:1000,
    okText:`保存`,
    cancelText:`关闭`
  }

  //表格行编辑
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
      location,
      nameSpace
    }
    return <EditableCell {...dataProps} />
  }
  const editCellOptions={
    tempCde:{

    } ,
    typDesc:{

    } ,
    tempNam:{

    } ,
    tempTyp:[
      { value: ' ', name: '请选择' },
      { value: '01', name: '一般贷款合同模板' },
      { value: '02', name: '还款计划' },
      { value: '03', name: '贷款催收逾期通知书' },
      { value: '04', name: '扣款授权书' },
    ] ,
  }
  /*表格中的当前选中行编辑按钮*/
  const edit=(index)=> {
    dispatch({
      type:`${nameSpace}/saveOldData`,//调用model中的方法，将编辑之前的数据克隆
      payload:{
        oldData:dataSource[index]
      }
    })
    //显示编辑的信息
    Object.keys(dataSource[index]).forEach((item) => {
      if (dataSource[index][item] && typeof dataSource[index][item].editable !== 'undefined') {
        dispatch({
          type:`${nameSpace}/showInput`,
          payload:{
            index,
            item,
            currentItem:dataSource[index][item].editable,
          }
        })
      }
    });
  }
  /*表格中的当前选中行删除按钮*/
  const onDelete=(index)=>{
    let newDataSource=dataSource.filter(function (item) {
      return item.key!=dataSource[index].key;//将当前的删除数据筛除
    })
    console.log(newDataSource)
    dispatch({
      type:`${nameSpace}/deleteCol`,//调用model方法，将删除后的数据克隆到dataSource
      payload:{
        dataSource:newDataSource,
      }
    })
  }
  // 表格中编辑按钮 保存/取消
  const editDone=(index, type)=> {
    let oldData;
    for(let i=0;i<oldDataSource.length;i++){
      if(dataSource[index].key===oldDataSource[i].key){//将编辑和原数据融合
        oldData=oldDataSource[i]
        console.log(oldData.mtdTyp)
      }
    }
    if(type === 'cancel'){//取消编辑
      dispatch({
        type:`${nameSpace}/cancelSave`,
        payload:{
          oldData,
          index,
        }
      })
    }
    Object.keys(dataSource[index]).forEach((item) => {
      if (dataSource[index][item] && typeof dataSource[index][item].editable !== 'undefined') {
        dispatch({
          type:`${nameSpace}/hideInput`,
          payload:{
            index,
            item,
            type,
          }
        })
      }
    });
    if(addArr.length=='1'){
      debugger;
      dispatch({
        type:`${nameSpace}/clearAddArr`,
        payload:{
          index
        }
      });
    }
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
    },{
      title: '操作',
      dataIndex: 'operation',
      render: (text, record, index) => EditFunc(text, record, index, dataSourceModels,dispatch,nameSpace),
    }
  ];
  const newData = {
    key: count,
    tempCde:{
      value:'',
      editable: true,
      tagType:'input',
    } ,
    typDesc:{
      value: '',
      editable: true,
      tagType:'input',
    } ,
    tempNam:{
      value: '',
      editable: true,
      tagType:'input',
    } ,
    tempTyp:{
      value:' ',
      editable: true,
      tagType:'select',
      options: [
        { value: ' ', name: '请选择' },
        { value: '01', name: '一般贷款合同模板' },
        { value: '02', name: '还款计划' },
        { value: '03', name: '贷款催收逾期通知书' },
        { value: '04', name: '扣款授权书' },
      ],
    } ,
  };

  const ediTableProps ={
    selectedRows,
    tableColumns,
    dataSourceMtd:dataSource,
    pagination,
    location,
    count,
    dispatch,
    addFlag,
    nameSpace,
    newData,
    loading,
    onDel (selectedRows) {
      if(!isEmpty(selectedRows)){
        Modal.confirm({
          title: '提示',
          iconType: 'exclamation-circle-o',
          content: `你选择了${selectedRows.length}条数据,确认要删除？`,
          onOk () {
            let data=[]
            selectedRows.forEach(function(index){
              console.log('selectedRowTempCde==='+index.tempCde)
              data.push(index.tempCde);
            })
            dispatch({ type: `${nameSpace}/delete`, payload: {data} })
          },
        });

      }else{
        Modal.confirm({
          title: '警告',
          iconType: 'exclamation-circle-o',
          content: '请先选择一条记录!',
          okText: '确定',
        });
      }
    },
  }
  return(
    <Modal {...modalOpts}>
      <EditableTable {...ediTableProps} />
    </Modal>
  )
}


TempletModal.PropTypes={
  templet:PropTypes.object,
  loading:PropTypes.object,
}


export default connect(({templet,loading }) => ({ templet,loading: loading.models.templet }))(Form.create()(TempletModal));
