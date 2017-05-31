/*费用设置---费用描述Modal---*/
import React, { PropTypes } from 'react'
import { Form, Input, InputNumber, Radio, Modal, Select } from 'antd'
import  CostsSet  from './FeeRecordFeeDescRadio'

function FeeRecordFeeDescModal({
  visible,
  type,
  item={},
  onOk,
  onCancel,
  location,
  form:{
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    }
  }){
  function handleOk() {
    validateFields(
      (errors)=>{
        if(errors){
          return
        }
        const data={
          ...getFieldsValue(),
          key:item.key,
        }
        console.log(data)
        onOk(data)
      })
  }
  const modalOpts={
    title:`费用选择列表`,
    visible,
    onOk:handleOk,
    onCancel,
    width:1000,
    okText:`保存`,
    cancelText:`关闭`
  }

  /**
   * validateStatus: 校验状态，可选 'success', 'warning', 'error', 'validating'。
   * hasFeedback：用于给输入框添加反馈图标。
   * help：设置校验文案。
   */

  return(
    <Modal {...modalOpts}>
       <p>费用描述</p>
      <CostsSet location={location}/>
    </Modal>
  )
}


FeeRecordFeeDescModal.PropTypes={
  form:PropTypes.object.isRequired,
  visible:PropTypes.bool,
  type:PropTypes.string,
  item:PropTypes.object,
  onCancel:PropTypes.func,
  onOk:PropTypes.func,
}


export default Form.create()(FeeRecordFeeDescModal)
