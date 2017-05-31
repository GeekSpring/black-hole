/**
	 *
	 * @Description(功能描述)    : 其它设置
	 * @author(作者)             :  李迎春
	 * @date (开发日期)          :  2017/5/17 17:49
	 * @param  request
	 * @param  response
	 * @return  Object
	 */
import React, { PropTypes } from 'react'
import { Form, Row, Col, Input, Button, Icon, Select,InputNumber, Radio, Modal, } from 'antd';
import { connect } from 'dva'
const FormItem=Form.Item
import style from '../LoanTypeAdd.less'
const Option = Select.Option;
const formItemLayout = {
  labelCol:{
    span :6
  },
  wrapperCol:{
    span:14
  }
}

const LoanTypExtModal=({
                         loanTypExt,
                         dispatch,
                         form:{
                           getFieldDecorator,
                           validateFields,
                           getFieldsValue,
                         }
                       })=>{
  const nameSpace='loanTypExt';
  const {loanTypExtData,visible}=loanTypExt
  function handleOk() {

  }
  function onCancel(){
    dispatch({
      type:`${nameSpace}/loanTypExtModalHide`
    })
  }
  const modalOpts={
    title:`其它设置`,
    visible,
    handleOk,
    onCancel,
    width:1000,
    okText:`保存`,
    cancelText:`关闭`
  }



  return(
    <Modal {...modalOpts}>
      <Form className="ant-advanced-search-form">
        <h3 className={style.menuCol}>流程处理管理</h3>
        <Row>
          <Col span={12}>
            <FormItem label='贷款品种代码：' hasFeedback {...formItemLayout}>
              {
                getFieldDecorator('typCde',{ //定义获取数据的ID
                  initialValue:loanTypExtData.typCde,//数据中的值获取
                  rules:[
                    {
                      required:true,
                      message:'贷款品种代码',
                    },
                  ],
                })(<Input placeholder="贷款品种代码"/>)
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='贷款品种描述：' hasFeedback {...formItemLayout}>
              {
                getFieldDecorator('typDesc',{
                  initialValue:loanTypExtData.typDesc,
                  rules:[
                    {
                      required:true,
                      message:'贷款品种描述',
                    },
                  ],
                })(<Input placeholder="贷款品种描述"/>)
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem  label='申请件整体处理时长：' hasFeedback {...formItemLayout}>
              {
                getFieldDecorator('wtDuration',{
                  initialValue:loanTypExtData.wtDuration,
                  rules:[
                    {
                      required:true,
                      message:'申请件整体处理时长',
                    },
                  ],
                })(<Input span={6} placeholder="申请件整体处理时长"/>)
              }
            </FormItem>
            <FormItem   hasFeedback {...formItemLayout}>
              {
                getFieldDecorator('wtUnit',{
                  initialValue:loanTypExtData.wtUnit,
                  rules:[
                    {
                      required:true,
                      message:'贷款类型未填写',
                    },
                  ],
                })(
                  <Select span={12} placeholder="处理时长类型" >
                    <Select.Option value="MIN">分钟</Select.Option>
                    <Select.Option value="HOR">小时</Select.Option>
                    <Select.Option value="DAY">天</Select.Option>
                  </Select>
                )
              }
            </FormItem>
          </Col>
        </Row>
        <h3 className={style.menuCol}>资金渠道</h3>
        <Row>
          <Col span={12}>
            <FormItem label='资金提供方代码：' hasFeedback {...formItemLayout}>
              {
                getFieldDecorator('capInstuCde',{ //定义获取数据的ID
                  initialValue:loanTypExtData.capInstuCde,//数据中的值获取
                  rules:[
                    {
                      required:true,
                      message:'资金提供方代码',
                    },
                  ],
                })(<Input placeholder="资金提供方代码"/>)
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='资金提供方名称：' hasFeedback {...formItemLayout}>
              {
                getFieldDecorator('capInstuName',{
                  initialValue:loanTypExtData.capInstuName,
                  rules:[
                    {
                      required:true,
                      message:'资金提供方名称',
                    },
                  ],
                })(<Input placeholder="资金提供方名称"/>)
              }
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}


LoanTypExtModal.PropTypes={
  loanTypExt:PropTypes.object,
  loading:PropTypes.object,
}



export default connect(({loanTypExt,loading }) => ({ loanTypExt,loading: loading.models.loanTypExt }))(Form.create()(LoanTypExtModal));
