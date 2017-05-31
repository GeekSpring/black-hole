/**
 * Created by lenovo on 2017/5/3.
 */
/*
核算弹框*/
import { Form, Row, Col, Input, Button, Icon, Select } from 'antd';
const FormItem = Form.Item;
import styles from './checkCpt.less'
const Option = Select.Option;

function handleChange(value) {
  console.log(`selected ${value}`);
}
class AdvancedSearchForm extends React.Component {
  constructor(props){
    super(props)
  }
  /*查看核算明细*/
  lookCheckCptDetl=()=>{
    this.props.lookCheckCptDetl()
  }
  render() {
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };

    return (
      <Form
        className="ant-advanced-search-form"
      >
        <Row gutter={40}>
          <Col span={12} >
            <FormItem {...formItemLayout} label={`贷款品种描述： `}>
                <Input placeholder="placeholder" />
            </FormItem>
          </Col>
          <Col span={12} >
            <FormItem {...formItemLayout} label={`核算类型描述：`}>
              <Select
                showSearch
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={handleChange}
                filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="tom">Tom</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span={12} >
            <FormItem {...formItemLayout} label={`核算规则：`}>
              <Select
                showSearch
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={handleChange}
                filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="tom">Tom</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span={12}  className={styles.aaaBox}>
            <FormItem {...formItemLayout} label={``}>
              <a href="javascript:;"  onClick={this.lookCheckCptDetl}>核算规则明细查看...</a>
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}

const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);

 export  default WrappedAdvancedSearchForm;
