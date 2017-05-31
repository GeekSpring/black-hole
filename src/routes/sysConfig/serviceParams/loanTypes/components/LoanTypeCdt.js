/**
	 *
	 * @Description(功能描述)    : 产品适用范围
	 * @author(作者)             :  李迎春
	 * @date (开发日期)          :  2017/5/24 19:05
	 * @param  request
	 * @param  response
	 * @return  Object
	 */
import React, { PropTypes } from 'react'
import { Form, Modal, Button } from 'antd'
import {isEmpty} from '../../../../../utils'
import { connect } from 'dva'
import {CheckBoxTable} from '../../../../../components/Table'
import CooprModal from './CooprModal'


const LoanTypeCdt=({loanTypeCdt,
                     location,
                      dispatch,
                      loading,
                    })=>{
debugger;
  let { list,count,addFlag,addArr,oldDataSource,pagination,selectedRows}=loanTypeCdt

  const nameSpace='loanTypeCdt'
  //查看门店明细
  const doView=()=>{
    dispatch({
      type:'loanTypeCdt/doViewShowModal',
      payload:{
        doViewType:'doView',/*查看门店明细*/
      }
    })
  }
  //表头信息
  const tableColumns =   [
    {
      title: '合作机构代码',
      dataIndex: 'cdeOne'
    }, {
      title: '合作机构名称',
      dataIndex: 'name'
    }, {
      title: '操作',
      dataIndex: 'actions',
      render: (text, record, index) => {
        return (
          <div onClick={doView||''}>
            <a href="javascript:;">查看明细</a>
          </div>
        );
      },
    }
  ];

  //新增行数据格式
  const newData = {
    key: count,
    cdeOne:{
      value:'',
      editable: true,
      tagType:'input',
    } ,
    name:{
      value: '',
      editable: true,
      tagType:'input',
    } ,
    actions:{
      value:'查看明细',
    } ,
  };

  function doSelectedRows(selectedRowsParam) {
    dispatch({ type: `${nameSpace}/getSelectedRows`, payload: {selectedRowsParam} })
  }

  //批量删除方法
  function doDel(){
    debugger;
   let selectedRowsParam=selectedRows
    console.log('selectedRowsParam=====',selectedRowsParam)
    if(!isEmpty(selectedRowsParam)){
      Modal.confirm({
        title: '提示',
        iconType: 'exclamation-circle-o',
        content: `你选择了${selectedRowsParam.length}条数据,确认要删除？`,
        onOk () {
          let data=[]
          selectedRowsParam.forEach(function(index){
            console.log('selectedRowCdeOne==='+index.cdeOne)
            data.push(index.cdeOne);
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
  }

  //新增行
  function doAdd() {
    if(!addFlag){
      return
    }
    count++;
    dispatch({
      type:`${nameSpace}/changeKey`,
      payload:{
        count
      }
    })
    dispatch({
      type:`${nameSpace}/changePage`,
    })
    dispatch({
      type:`${nameSpace}/pushNewData`,
      payload:{
        newData,
        count,
      }
    })

    //新增弹出层
    dispatch({
      type:'coopr/query',//model下的reducers方法处理
      payload:{
        typSeq:'coopr',
      }
    })
    dispatch({
      type:'coopr/cooprModalShow',//model下的reducers方法处理
      payload:{
        modalType:'coopr',
      }
    })
  }

  const checkTableProps ={
    selectedRows,
    tableColumns,
    dataSource:list,
    pagination,
    location,
    loading,
    getSelectedRows(selectedRowsParam){
      doSelectedRows(selectedRowsParam);
    }
  }
  const cooprModalProps ={
    location,
    loading,
    dispatch,
  }
  return(
    <div>
      <Button className="editable-add-btn" onClick={doAdd}>
        +添加
      </Button>
      <Button  type="danger" onClick={doDel}>
        -批量删除
      </Button>
      <br/>
      <CheckBoxTable {...checkTableProps} />
      <CooprModal {...cooprModalProps} />
    </div>
  )
}


LoanTypeCdt.PropTypes={
  loanTypeCdt:PropTypes.object,
  loading:PropTypes.object,
}


export default connect(({loanTypeCdt,loading }) => ({ loanTypeCdt,loading: loading.models.loanTypeCdt }))(Form.create()(LoanTypeCdt));
