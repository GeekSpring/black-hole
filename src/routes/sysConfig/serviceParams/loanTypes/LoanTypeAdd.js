import React, { PropTypes } from 'react'
import { Form, Input, InputNumber, DatePicker, Radio, Button, Select, Row, Col, Checkbox,Tabs } from 'antd'
import { connect } from 'dva'
import style from './LoanTypeAdd.less'
import {EditableTable,EditableCell,SearchTableModal} from '../../../../components/Table'
import EditFunc from '../../../../components/Table/EditFunc'
import { browserHistory } from 'dva/router'
import moment from 'moment';
import {LoanTypeCdt} from './components'

const TabPane = Tabs.TabPane;

const FormItem=Form.Item
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const formItemLayout = {
  labelCol:{
    span :8
  },
  wrapperCol:{
    span:14
  }
}
const formItemLayoutArea = {
  labelCol:{
    span :5
  },
  wrapperCol:{
    span:17
  }
}
const formItemLayoutCheck = {
  labelCol:{
    span:3
  },
  wrapperCol:{
    span:18
  }
}
const options = [
  { label: '按天', value: 'D', key:1 },
  { label: '3个月', value: '3' , key:2},
  { label: '6个月', value: '6' , key:3},
  { label: '12个月', value: '12', key:4 },
  { label: '18个月', value: '18' , key:5},
  { label: '24个月', value: '24' , key:6},
  { label: '30个月', value: '30' , key:7},
  { label: '36个月', value: '36' , key:8},
  { label: '42个月', value: '42' , key:9},
  { label: '48个月', value: '48' , key:10},
  { label: '54个月', value: '54' , key:11},
  { label: '60个月', value: '60', key:12 },
  { label: '按其他月',value: '', key:13 },
];

function  LoanTypeAdd({location,loading, loanTypeDetail, pLoanTypMtd, dispatch, form:{
       getFieldDecorator,
       validateFields,
       getFieldsValue,
     }
   }){
  // LoanTypeAdd方法返回
  const { loanTyp }=loanTypeDetail //获取model中的return参数
  const handleBack=()=>{
    browserHistory.goBack()
  }
  // 保存整个页面生效
  const handleSave=()=>{
    validateFields(
      (errors)=>{
        if(errors){
          return
        }
        const data={
          ...getFieldsValue(),
        }
        console.log(data)
      })
    dispatch({
      type:'loanTypesAdd/update',
      payload:{
        modalType:'update',
        currentItem:record,
      }
    })
  }
  /**
   * validateStatus: 校验状态，可选 'success', 'warning', 'error', 'validating'。
   * hasFeedback：用于给输入框添加反馈图标。
   * help：设置校验文案。
   */
  const { dataSourceMtd,count,pagination,addFlag,modalVisible,selectedRows,oldDataSourceMtd,addArr }=pLoanTypMtd
  const nameSpace='pLoanTypMtd';
  const renderColumns = (dataSource, index, key, text)=> {
    const { editable, status, tagType, options  } = dataSource[index][key];
    if (typeof editable === 'undefined') {
      return text;
    }
    //编辑表格搜索按钮
    const searchCellBtn=()=>{
      dispatch({
        type:'pLoanTypMtd/SearchTableModalShow',
        payload:{
          modalType:'checkCptSet',
        }
      })
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
      searchCellBtn,
      nameSpace
    }
    return <EditableCell {...dataProps} />
  }
  const dataSourceModels={
    dataSource:dataSourceMtd,
    oldDataSource:oldDataSourceMtd,
    addArr

  }
  // 表头信息
  const tableColumns =   [
    {
      title: '支持期限 ',
      dataIndex: 'tnrOpt',
      width: '10%',
      render: (text, record, index) => renderColumns(dataSourceMtd, index, 'tnrOpt', text),
    }, {
      title: '还款方式',
      dataIndex: 'mtdTyp',
      render: (text, record, index) => renderColumns(dataSourceMtd, index, 'mtdTyp', text)
    }, {
      title: '阶段差异利率',
      dataIndex: 'specialInd',
      render: (text, record, index) => renderColumns(dataSourceMtd, index, 'specialInd', text)
    }, {
      title: '客户年利率',
      dataIndex: 'intRat',
      render: (text, record, index) => renderColumns(dataSourceMtd, index, 'intRat', text)
    },  {
      title: '固定罚息利率',
      dataIndex: 'fixedOdInd',
      render: (text, record, index) => renderColumns(dataSourceMtd, index, 'fixedOdInd', text)
    },  {
      title: '罚息利率',


      dataIndex: 'odIntRate',
      render: (text, record, index) => renderColumns(dataSourceMtd, index, 'odIntRate', text)
    }, {
      title: '操作',
      dataIndex: 'operation',
      width: '10%',
      render: (text, record, index) => EditFunc(text, record, index, dataSourceModels, dispatch,nameSpace),
    }];
  // editCellOptions
  const editCellOptions={
    tnrOpt : [
      { value: '按天', name: '按天' },
      { value: '3个月', name: '3个月' },
      { value: '6个月', name: '6个月' },
      { value: '12个月', name: '12个月' },
      { value: '18个月', name: '18个月' },
    ],
    mtdTyp : [
      { value: '等额本息', name: '等额本息' },
      { value: '等额本金', name: '等额本金' },
    ],
    specialInd : [
      { value: '是', name: '是' },
      { value: '否', name: '否' },
    ],
    fixedOdInd : [
      { value: '是', name: '是' },
      { value: '否', name: '否' },
    ],
  }
  //可编辑表格新增行
  const newData = {
    key: count,
    tnrOpt:{
      value:'12个月',
      editable: true,
      tagType:'select',
      options: [
        { value: '按天', name: '按天' },
        { value: '3个月', name: '3个月' },
        { value: '6个月', name: '6个月' },
        { value: '12个月', name: '12个月' },
        { value: '18个月', name: '18个月' },
      ],
    } ,
    mtdTyp:{
      value: '等额本息',
      editable: true,
      tagType:'select',
      options: [
        { value: '等额本息', name: '等额本息' },
        { value: '等额本金', name: '等额本金' },
      ],
    } ,
    specialInd:{
      value:'是',
      editable: true,
      tagType:'select',
      options: [
        { value: '是', name: '是' },
        { value: '否', name: '否' },
      ],
    } ,
    intRat:{
      value:'1',
      editable: true,
      tagType:'inputNum',
    } ,
    fixedOdInd:{
      value:'是',
      editable: true,
      tagType:'select',
      options: [
        { value: '是', name: '是' },
        { value: '否', name: '否' },
      ],
    } ,
    odIntRate:{
      value:'1',
      editable: true,
      tagType:'inputNum',
    } ,
  };
  const ediTableProps ={
    tableColumns,
    dataSourceMtd,
    pagination,
    count,
    dispatch,
    addFlag,
    nameSpace,
    newData,
    loading
  }
  const dateFormat = 'YYYY-MM-DD';
  //表格搜索的modal
  const searchTableModalpProps={
    title: 'create',
    visible: modalVisible,
    selectedRows,
    onOk(data){},
    onCancel(){
      dispatch({
        type:'pLoanTypMtd/SearchTableModalHide',
        payload:{}
      })
    },
    loading

  }
  return(
  <Tabs defaultActiveKey="1" >
    <TabPane tab={<span>贷款品种信息</span>} key="1">
      <div>
        <Form layout='horizontal'>
          <h3 className={style.menuCol}>基本信息</h3>
          <Row>
            <Col span={8}>
              <FormItem label='贷款品种代码：' hasFeedback {...formItemLayout}>
                {
                  getFieldDecorator('typCde',{ //定义获取数据的ID
                    initialValue:loanTyp.typCde,//数据中的值获取
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
            <Col span={8}>
              <FormItem label='贷款品种描述：' hasFeedback {...formItemLayout}>
                {
                  getFieldDecorator('typDesc',{
                    initialValue:loanTyp.typDesc,
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
              <FormItem {...formItemLayoutArea} label="贷款品种详述">
                {getFieldDecorator('typDetail',{
                  initialValue:loanTyp.typDetail,
                  rules:[
                    {
                      required:true,
                      message:'贷款品种描述',
                    },
                  ],
                })(
                  <Input type="textarea" placeholder="Autosize height with minimum and maximum number of lines" autosize={{ minRows: 3, maxRows: 3 }} />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem label='贷款类型：' hasFeedback {...formItemLayout}>
                {
                  getFieldDecorator('typGrp',{
                    initialValue:loanTyp.typGrp,
                    rules:[
                      {
                        required:true,
                        message:'贷款类型未填写',
                      },
                    ],
                  })(
                    <Select placeholder="贷款类型" >
                      <Select.Option value="01">耐用消费品贷款</Select.Option>
                      <Select.Option value="02">一般消费贷款</Select.Option>
                      <Select.Option value="03">汽车消费贷款</Select.Option>
                    </Select>
                  )
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label='业务表单：' hasFeedback {...formItemLayout}>
                {
                  getFieldDecorator('typForm',{
                    initialValue:loanTyp.typForm,
                    rules:[
                      {
                        required:true,
                        message:'业务表单未填写',
                      },
                    ],
                  })(
                    <Select placeholder="业务表单类型">
                      <Select.Option value="01">耐用消费品贷款表单</Select.Option>
                      <Select.Option value="02">一般用途贷款表单</Select.Option>
                      <Select.Option value="03">汽车消费贷款表单</Select.Option>
                    </Select>
                  )
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem{...formItemLayout} label="版本号">
                {getFieldDecorator('typVer',{
                  initialValue:loanTyp.typVer,
                  rules:[
                    {
                      required:true,
                      message:'版本号未填写',
                    },
                  ],
                } )(
                  <InputNumber min={0} max={12} style={{width:'100%'}} />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem {...formItemLayout} hasFeedback label="生效时间"
              >
                {getFieldDecorator('startDt', {
                  initialValue:moment(`${loanTyp.startDt}`,dateFormat),
                  rules:[
                    {
                      required:true,
                      message:'生效时间未填写',
                    },
                  ],
                })(
                  <DatePicker style={{width:'100%'}} />
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem {...formItemLayout} hasFeedback label="结束时间"
              >
                {getFieldDecorator('endDt',  {
                  initialValue:moment(`${loanTyp.endDt}`,dateFormat),
                  rules:[
                    {
                      required:true,
                      message:'结束时间未填写',
                    },
                  ],
                })(
                  <DatePicker style={{width:'100%'}} />
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label='状态：' hasFeedback {...formItemLayout}>
                {
                  getFieldDecorator('typSts',{
                    initialValue:loanTyp.typSts,
                    rules:[
                      {
                        required:true,
                        message:'状态未填写',
                      },
                    ],
                  })(
                    <Select placeholder="状态">
                      <Select.Option value="A">生效</Select.Option>
                      <Select.Option value="I">失效</Select.Option>
                      <Select.Option value="W">待生效</Select.Option>
                    </Select>
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem{...formItemLayout} label="是员工贷款">
                {getFieldDecorator('staffInd',{
                  initialValue:loanTyp.staffInd,
                  rules:[
                    {
                      required:true,
                      message:'是员工贷款未填写',
                    },
                  ],
                })(
                  <RadioGroup>
                    <Radio value="N">否</Radio>
                    <Radio value="Y">是</Radio>
                  </RadioGroup>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem{...formItemLayout} label="是否贴息贷款">
                {getFieldDecorator('sbsyInd',{
                  initialValue:loanTyp.sbsyInd,
                  rules:[
                    {
                      required:true,
                      message:'是否贴息贷款未填写',
                    },
                  ],
                })(
                  <RadioGroup>
                    <Radio value="N">否</Radio>
                    <Radio value="Y">是</Radio>
                  </RadioGroup>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem{...formItemLayout} label="允许展期">
                {getFieldDecorator('extInd',{
                  initialValue:loanTyp.extInd,
                  rules:[
                    {
                      required:true,
                      message:'允许展期未填写',
                    },
                  ],
                })(
                  <RadioGroup>
                    <Radio value="N">否</Radio>
                    <Radio value="Y">是</Radio>
                  </RadioGroup>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem{...formItemLayout} label="允许提前还款">
                {getFieldDecorator('settInd',{
                  initialValue:loanTyp.settInd,
                  rules:[
                    {
                      required:true,
                      message:'允许提前还款未填写',
                    },
                  ],
                })(
                  <RadioGroup>
                    <Radio value="N">否</Radio>
                    <Radio value="Y">是</Radio>
                  </RadioGroup>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem{...formItemLayout} label="收取滞纳金">
                {getFieldDecorator('lateFeeInd',{
                  initialValue:loanTyp.lateFeeInd,
                  rules:[
                    {
                      required:true,
                      message:'收取滞纳金未填写',
                    },
                  ],
                })(
                  <RadioGroup>
                    <Radio value="N">否</Radio>
                    <Radio value="Y">是</Radio>
                  </RadioGroup>
                )}
              </FormItem>
            </Col>
          </Row>

          <h3 className={style.menuCol}>控制信息</h3>
          <Row >
            <Col span={24} >
              <FormItem{...formItemLayoutCheck} label="贷款期限" >
                {getFieldDecorator('tnrOpt',{initialValue:loanTyp.tnrOpt})(
                  <CheckboxGroup options={options} />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem label='还款间隔：' hasFeedback {...formItemLayout}>
                {
                  getFieldDecorator('typFreq',{
                    initialValue:loanTyp.typFreq,
                    rules:[
                      {
                        // required:true,
                        message:'还款间隔',
                      },
                    ],
                  })(
                    <Select placeholder="还款间隔类型" >
                      <Select.Option value="2W">2周</Select.Option>
                      <Select.Option value="1M">1个月</Select.Option>
                      <Select.Option value="6M">6个月</Select.Option>
                      <Select.Option value='12M'>12个月</Select.Option>
                      <Select.Option value="1Q">1季度</Select.Option>
                      <Select.Option value="1Y">1年</Select.Option>
                    </Select>
                  )
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label='首付比例下限：' hasFeedback {...formItemLayout}>
                {
                  getFieldDecorator('fstPct',{
                    initialValue:loanTyp.fstPct,
                    rules:[
                      {
                        // required:true,
                        message:'首付比例下限',
                      },
                    ],
                  })(<InputNumber
                    min={0}
                    style={{width:'100%',textAlign:'right'}}
                    formatter={value => `${value}.0000000%`}
                    parser={value => value.replace('%', '')}
                    step={100}
                  />)
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label='担保品成数：' hasFeedback {...formItemLayout}>
                {
                  getFieldDecorator('coltTyp',{
                    initialValue:loanTyp.coltTyp,
                    rules:[
                      {
                        // required:true,
                        message:'担保品成数',
                      },
                    ],
                  })(<InputNumber
                    min={0}
                    style={{width:'100%',textAlign:'right'}}
                    formatter={value => `${value}.0000000%`}
                    parser={value => value.replace('%', '')}
                    step={100}
                  />)
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label='单笔最小金额(>=)：' hasFeedback {...formItemLayout}>
                {
                  getFieldDecorator('minAmt',{
                    initialValue:loanTyp.minAmt,
                    rules:[
                      {
                        // required:true,
                        message:'单笔最小金额(>=)',
                      },
                    ],
                  })(<InputNumber
                    min={0}
                    style={{width:'100%',textAlign:'right'}}
                    formatter={value => `${value}.00`}
                    step={1}
                  />)
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label='进件通路：' hasFeedback {...formItemLayout}>
                {
                  getFieldDecorator('docChannel',{
                    initialValue:loanTyp.docChannel,
                    rules:[
                      {
                        // required:true,
                        message:'进件通路',
                      },
                    ],
                  })(
                    <Select placeholder="贷款类型" >
                      <Select.Option value='DF00001'>基本进件通路</Select.Option>
                      <Select.Option value="SYS001">秒贷通路</Select.Option>
                      <Select.Option value="SYS002">标准资料</Select.Option>
                    </Select>
                  )
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem{...formItemLayout} label="主担保方式">
                {getFieldDecorator('gutrTyp',{
                  initialValue:loanTyp.gutrTyp,
                  rules:[
                    {
                      // required:true,
                      message:'主担保方式',
                    },
                  ],
                })(
                  <RadioGroup>
                    <Radio value="10">信用</Radio>
                    <Radio value="20">抵押</Radio>
                    <Radio value="30">质押</Radio>
                    <Radio value="40">保证</Radio>
                  </RadioGroup>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label='单笔最大金额(<=)：' hasFeedback {...formItemLayout}>
                {
                  getFieldDecorator('maxAmt',{
                    initialValue:loanTyp.maxAmt,
                    rules:[
                      {
                        required:true,
                        message:'单笔最小金额(<=)',
                      },
                    ],
                  })(<InputNumber
                    min={0}
                    style={{width:'100%',textAlign:'right'}}
                    formatter={value => `${value}.00`}
                    step={1}
                  />)
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label='展期次数：' hasFeedback {...formItemLayout}>
                {
                  getFieldDecorator('extNum',{
                    initialValue:loanTyp.extNum,
                    rules:[
                      {
                        //required:true,
                        message:'展期次数',
                      },
                    ],
                  })(<InputNumber
                    min={0}
                    style={{width:'100%',textAlign:'right'}}
                    step={1}
                  />)
                }
              </FormItem>
            </Col>
          </Row>

          <h3 className={style.menuCol}>业务相关</h3>
          <Row>
            <Col span={8}>
              <FormItem label='审批流程：' hasFeedback {...formItemLayout}>
                {
                  getFieldDecorator('typWf',{
                    initialValue:loanTyp.typWf,
                    rules:[
                      {
                        // required:true,
                        message:'审批流程',
                      },
                    ],
                  })(
                    <Select placeholder="审批流程" >
                      <Select.Option value='XFDK_000'>贷款申请审批流程</Select.Option>
                      <Select.Option value="CARE_000">车贷贷款申请流程</Select.Option>
                      <Select.Option value="AUTO_000">长安汽车贷款申请流程</Select.Option>
                    </Select>
                  )
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label='债项评级：' hasFeedback {...formItemLayout}>
                {
                  getFieldDecorator('typCompl',{
                    initialValue:loanTyp.typCompl,
                    rules:[
                      {
                        // required:true,
                        message:'债项评级',
                      },
                    ],
                  })(
                    <Select placeholder="债项评级" >
                      <Select.Option value='ConsumeCreditScoreRulesSet'>长安信用得分等级评分卡</Select.Option>
                    </Select>
                  )
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label='定价利率规则：' hasFeedback {...formItemLayout}>
                {
                  getFieldDecorator('rateRule',{
                    initialValue:'0',
                    rules:[
                      {
                        // required:true,
                        message:'定价利率规则',
                      },
                    ],
                  })(
                    <Select placeholder="定价利率规则" >
                      <Select.Option value='01'>产品定价</Select.Option>
                    </Select>
                  )
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label='审批权限：' hasFeedback {...formItemLayout}>
                {
                  getFieldDecorator('typAuth',{
                    initialValue:loanTyp.typAuth,
                    rules:[
                      {
                        // required:true,
                        message:'审批权限',
                      },
                    ],
                  })(
                    <Select placeholder="审批权限" >
                      <Select.Option value='SQ0001'>通用权限</Select.Option>
                    </Select>
                  )
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label='利率模式：' hasFeedback {...formItemLayout}>
                {
                  getFieldDecorator('rateMode',{
                    initialValue:loanTyp.rateMode,
                    rules:[
                      {
                        // required:true,
                        message:'利率模式',
                      },
                    ],
                  })(
                    <Select placeholder="利率模式" >
                      <Select.Option value='FX'>固定利率</Select.Option>
                      <Select.Option value='VR'>浮动利率</Select.Option>
                    </Select>
                  )
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label='利率调整方式：' hasFeedback {...formItemLayout}>
                {
                  getFieldDecorator('repcOpt',{
                    initialValue:loanTyp.repcOpt,
                    rules:[
                      {
                        // required:true,
                        message:'利率调整方式',
                      },
                    ],
                  })(
                    <Select placeholder="利率调整方式" >
                      <Select.Option value='NYF'>每年1月1日调整</Select.Option>
                    </Select>
                  )
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label='贷款分类：' hasFeedback {...formItemLayout}>
                {
                  getFieldDecorator('grdMtd',{
                    initialValue:loanTyp.grdMtd,
                    rules:[
                      {
                        // required:true,
                        message:'贷款分类',
                      },
                    ],
                  })(
                    <Select placeholder="贷款分类" >
                      <Select.Option value='GRDM001'>五级分类</Select.Option>
                    </Select>
                  )
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label='宽限期类型：' hasFeedback {...formItemLayout}>
                {
                  getFieldDecorator('odGraceTyp',{
                    initialValue:loanTyp.odGraceTyp,
                    rules:[
                      {
                        // required:true,
                        message:'宽限期类型',
                      },
                    ],
                  })(
                    <Select placeholder="宽限期类型" >
                      <Select.Option value='E'>逾期宽限期</Select.Option>
                      <Select.Option value="P">罚息宽限期</Select.Option>
                    </Select>
                  )
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label='宽限期天数：' hasFeedback {...formItemLayout}>
                {
                  getFieldDecorator('odGrace',{
                    initialValue:loanTyp.odGrace,
                    rules:[
                      {
                        required:true,
                        message:'宽限期天数',
                      },
                    ],
                  })(<InputNumber
                    min={1}
                    style={{width:'100%',textAlign:'right'}}
                    step={1}
                  />)
                }
              </FormItem>
            </Col>
          </Row>
          <h3 className={style.menuCol}>还款方式</h3>
        </Form>
        <EditableTable {...ediTableProps}/>
        {/*表格搜索的modal*/}
        <SearchTableModal {...searchTableModalpProps}/>
        <div size='large' className={style.cax_btnGroup}>
          <Button type="primary">
            暂存
          </Button>
          <Button type="primary" onClick={handleSave}>
            保存&生效
          </Button>
          <Button type="primary" onClick={handleBack}>
            关闭
          </Button>
        </div>
      </div>
    </TabPane>
    <TabPane tab={<span>适用范围</span>} key="2">
      <div className="content-inner">
        <LoanTypeCdt location={location}/>
      </div>
    </TabPane>
  </Tabs>

  )
}

LoanTypeAdd.PropTypes={
  form:PropTypes.object.isRequired,
  currentItem:PropTypes.object,
  handleBack:PropTypes.object,
  handleSave:PropTypes.object,
  loanTypeDetail:PropTypes.object,
  pLoanTypMtd:PropTypes.object,
  loanTyp:PropTypes.object,
  loading:PropTypes.object,
  addFlag:PropTypes.bool,
  addArr:PropTypes.array,
  dataSourceMtd:PropTypes.object,
  key:PropTypes.string,
}

//loanTypeDetail model中的namespace对应
//LoanTypeAdd  组件方法名
export default connect(({loanTypeDetail,pLoanTypMtd,loading }) => ({ loanTypeDetail,pLoanTypMtd,loading:loading.models.loanTypeDetail}))(Form.create()(LoanTypeAdd));
