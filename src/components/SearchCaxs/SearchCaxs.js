import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { routerRedux } from 'dva/router'
import { Input, Select, Button, Icon, Col, Row, Checkbox, Radio, Form } from 'antd'
import formFocus from '../../utils/formFocus'

const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};


class SearchCaxs extends React.Component {
  constructor(props){
    super(props)
  }
  //表单搜索
  handleSearch = (e) => {
    e.preventDefault();
    let query={};
    this.props.form.validateFields((err, values) => {
      query=values;
    });
    this.props.onSearch(query)
  }
  //重置表单
  handleReset = () => {
    this.props.form.resetFields();
  }

  onAdd=()=>{
    this.props.onAdd()
  }
  /*核算设置*/
  checkComputationSet=()=>{
    this.props.checkComputationSet()
  }
  /*促销设置*/
  salesPromotionSet=()=>{
    this.props.salesPromotionSet()
  }
  onUpdate=()=>{
    this.props.onUpdate()
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    const searchColums=this.props.searchColums;
    const childInput=formFocus(searchColums,getFieldDecorator);

    return (
      <Form  onSubmit={this.handleSearch}>
        {
          childInput.length!=0?<Row gutter={40}>
            {childInput.slice(0,childInput.length)}
          </Row>:''
        }
        <Row>
          <Col span={40} style={{textAlign:'center'}}>
            <FormItem >
              <Button type="primary" htmlType="submit">查询</Button> &nbsp;&nbsp;&nbsp;
              <Button onClick={this.handleReset}>重置</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    )
  }
}


SearchCaxs.propTypes = {
  size: PropTypes.string,
  select: PropTypes.bool,
  selectProps: PropTypes.object,
  onSearch: PropTypes.func,
  onAdd: PropTypes.func,
  checkComputationSet: PropTypes.func, /*核算设置*/
  salesPromotionSet: PropTypes.func, /*促销设置*/
  selectOptions: PropTypes.array,
  style: PropTypes.object,
  keyword: PropTypes.string,
  selectedRows: PropTypes.array,
}

export default Form.create()(SearchCaxs)
