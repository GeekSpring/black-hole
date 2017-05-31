import { Input, Select, Button, Icon, Col, Row, Checkbox, Radio, Form } from 'antd'
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

/**
 * Created by wangrui on 2017/4/26.
 *
 * 处理表单搜索选项
 * @param type input select checkbox radio
 * @param getFieldDecorator antd获取表单值得工具函数
 * @returns {Array}
 */
export default function formFocus(type,getFieldDecorator) {
  const key=0;
  if(type.length!==0){
    const childInput=[];
    type.forEach(function(item,i){
      if(item.searchType=='input'){
        childInput.push(
          <Col span={8} key={i}>
            <FormItem {...formItemLayout} label={`${item.title}`} style={{ width: 500 }}>
              {getFieldDecorator(`${item.dataIndex}`)(
                <Input placeholder={`${item.title}`} style={{ width: 200 }} />
              )}
            </FormItem>
          </Col>
        )
      }else if(item.searchType=='select'){
        childInput.push(
          <Col span={8} key={i}>
            <FormItem {...formItemLayout} label={`${item.title}`} style={{ width: 500 }}>
              {getFieldDecorator(`${item.dataIndex}`)(
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder={`${item.title}`}
                  optionFilterProp="children"
                  filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {
                    item.selectOptions.map((item, key) => <Select.Option value={item.value} key={key}>{item.name || item.value}</Select.Option>)
                  }
                </Select>
              )}
            </FormItem>
          </Col>
        )
      }else if(item.searchType=='checkbox'){
        childInput.push(
          <Col span={8} key={i}>
            <FormItem {...formItemLayout} label={`${item.title}`} style={{ width: 500 }}>
              {getFieldDecorator(`${item.dataIndex}`)(
                <CheckboxGroup options={item.plainOptions}  />
              )}
            </FormItem>
          </Col>
        )
      }else if(item.searchType=='radio'){
        childInput.push(
          <Col span={8} key={i}>
            <FormItem {...formItemLayout} label={`${item.title}`} style={{ width: 500 }}>
              {getFieldDecorator(`${item.dataIndex}`)(
                <RadioGroup options={item.plainOptions}/>
              )}
            </FormItem>
          </Col>
        )
      }
    })
    return childInput
  }

}
