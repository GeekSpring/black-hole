import React, { PropTypes } from 'react'
import { Form, Input, InputNumber, Radio, Modal, Select } from 'antd'

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

const LoanTypeModal=({
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
    title:'新建用户',
    visible,
    onOk:handleOk,
    onCancel,
  }

  /**
   * validateStatus: 校验状态，可选 'success', 'warning', 'error', 'validating'。
   * hasFeedback：用于给输入框添加反馈图标。
   * help：设置校验文案。
   */

  return(
    <Modal {...modalOpts}>
      <Form layout='horizontal'>
        <FormItem label='贷款类型：' hasFeedback {...formItemLayout}>
          {
            getFieldDecorator('locanType',{
              initialValue:item.locanType,
              rules:[
                {
                  required:true,
                  message:'贷款类型未填写',
                },
              ],
            })(
              <Select placeholder="贷款类型">
                <Option value="耐用消费品贷款">耐用消费品贷款</Option>
                <Option value="一般消费贷款">一般消费贷款</Option>
                <Option value="汽车消费贷款">汽车消费贷款</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label='贷款品种描述：' hasFeedback {...formItemLayout}>
          {
            getFieldDecorator('locanDetail',{
              initialValue:item.locanDetail,
              rules:[
                {
                  required:true,
                  message:'贷款品种描述未填写',
                },
              ],
            })(<Input placeholder="贷款品种描述"/>)
          }
        </FormItem>


        <FormItem{...formItemLayout} label="状态">
          {getFieldDecorator('dataType',{
            initialValue:item.dataType,
            rules:[
              {
                required:true,
                message:'贷款状态未填写',
              },
            ]})(
            <RadioGroup>
              <Radio value="生效" >生效</Radio>
              <Radio value="失效">失效</Radio>
              <Radio value="待生效">待生效</Radio>
            </RadioGroup>
          )}
        </FormItem>
      </Form>
    </Modal>
  )
}


LoanTypeModal.PropTypes={
  form:PropTypes.object.isRequired,
  visible:PropTypes.bool,
  type:PropTypes.string,
  item:PropTypes.object,
  onCancel:PropTypes.func,
  onOk:PropTypes.func,
}


export default Form.create()(LoanTypeModal)
