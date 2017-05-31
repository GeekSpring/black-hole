import React, { PropTypes } from 'react'
import { Form, Col, Row, Checkbox, Modal, Select } from 'antd'

const LoanTypesCopyProModal=({
     visible,
     onOk,
     onCancel,form:{
       getFieldDecorator,
       getFieldsValue,
     }
   })=>{
  function handleOk() {
    const data={
      ...getFieldsValue(),
    }
    onOk(data)
  }
  const modalOpts={
    title:`促销设置`,
    visible,
    onOk:handleOk,
    onCancel,
    okText:`保存`,
    cancelText:`关闭`
  }
  const CheckboxGroup = Checkbox.Group;
  const options = [
    { label: '核算设置', value: '11', key:1},
    { label: '费用设置', value: '12', key:2},
    { label: '模板设置', value: '13', key:3},
    { label: '促销设置', value: '14', key:4},
  ];
  const formItemLayout = {
    labelCol:{
      span :8
    },
    wrapperCol:{
      span:14
    }
  }
  /**
   * validateStatus: 校验状态，可选 'success', 'warning', 'error', 'validating'。
   * hasFeedback：用于给输入框添加反馈图标。
   * help：设置校验文案。
   */

  return(
    <Modal {...modalOpts}>
      <h3>信息提示：PA00000052:该操作将复制贷款品种除基本信息明细、还款方式外所有信息！</h3>
      <h3>以下哪些贷款品种设置需要同时复制：</h3>
      <Row >
        <Col span={24} >
          {getFieldDecorator('radio-group',{initialValue:['11','12']})(
            <CheckboxGroup options={options} {...formItemLayout} />
          )}
        </Col>
      </Row>
    </Modal>
  )
}


LoanTypesCopyProModal.PropTypes={
  form:PropTypes.object.isRequired,
  visible:PropTypes.bool,
  type:PropTypes.string,
  item:PropTypes.object,
  onCancel:PropTypes.func,
  onOk:PropTypes.func,
}


export default Form.create()(LoanTypesCopyProModal)
