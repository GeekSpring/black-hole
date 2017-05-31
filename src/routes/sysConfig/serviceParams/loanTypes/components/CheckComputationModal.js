/*核算设置*/
import React, { PropTypes } from 'react'
import { Form, Input, InputNumber, Radio, Modal, Select } from 'antd'
import  WrappedAdvancedSearchForm from './checkCpt'
const FormItem=Form.Item
const RadioGroup = Radio.Group;
const formItemLayout = {
  labelCol:{
    span :6
  },
  wrapperCol:{
    span:14
  }
}

const CheckComputationModal=({
   visible,
   type,
   item={},
   onOk,
   onCancel,form:{
     getFieldDecorator,
     validateFields,
     getFieldsValue,
   }
})=>{
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
    title:`核算设置`,
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
      <WrappedAdvancedSearchForm />
    </Modal>
  )
}


CheckComputationModal.PropTypes={
  form:PropTypes.object.isRequired,
  visible:PropTypes.bool,
  type:PropTypes.string,
  item:PropTypes.object,
  onCancel:PropTypes.func,
  onOk:PropTypes.func,
}


export default Form.create()(CheckComputationModal)
