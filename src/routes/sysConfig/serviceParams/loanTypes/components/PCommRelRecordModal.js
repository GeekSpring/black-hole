/*服务费关联设置---*/
import React, { PropTypes } from 'react'
import { Form, Modal } from 'antd'
import { connect } from 'dva'
function PCommRelRecordModal({pCommRelRecord, dispatch, loading, location}){
  let {visible}=pCommRelRecord
  const nameSpace='pCommRelRecord'
  function handleOk() {
  }
  function onCancel(){
    dispatch({
      type:'pCommRelRecord/hideModal'
    })

  }
  const modalOpts={
    title:`服务费关联设置`,
    visible,
    onOk:handleOk,
    onCancel,
    width:1000,
    okText:`保存`,
    cancelText:`关闭`
  }



  return(
    <Modal {...modalOpts}>

      dcfdffdfd
    </Modal>
  )
}

PCommRelRecordModal.PropTypes={
  pCommRelRecord:PropTypes.object,
  loading:PropTypes.object,
}
export default connect(({pCommRelRecord,loading }) => ({ pCommRelRecord,loading: loading.models.pCommRelRecord }))(Form.create()(PCommRelRecordModal));


