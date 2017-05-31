/*费用设置----查看--*/
import React, { PropTypes } from 'react'
import { Row,Col,Radio,Icon } from 'antd'
const RadioGroup = Radio.Group;
import style from './FeeRecordDoView.less'
import  FeeRecordToolBarComp  from './FeeRecordToolBarComp'
import  FeeRecordFeeCalComp  from './FeeRecordFeeCalComp'
class FeeRecordDoView extends React.Component {
  state = {
    value: 1,
  }
  onChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  }
  render() {
  return(
    <div>
      <Row className={style.rowHeight40}>
          <Col span={24}><h3 className={style.rowHeight40}>查看费用</h3></Col>
      </Row>
      <Row  className={style.rowHeight40}>
          <Col span={24}   className={style.rowHeight40}><h4><Icon type="down-square" />费用基本信息</h4></Col>
      </Row>
      <Row className={style.rowHeight60}>
          <Col span={7} offset={1}>费用代码： F0003</Col>
          <Col span={8}>费用类型： 其他</Col>
          <Col span={8}>金额类型： 待摊手续费收入</Col>
          <Col span={7} offset={1}>费用描述： 上门面签费</Col>
      </Row>
      <Row className={style.rowHeight40}>
          <Col span={24}><h4><Icon type="down-square" />费用计算</h4></Col>
      </Row>
      <Row className={style.rowHeight40}>
          <Col span={3}  offset={1}>收费条件</Col>
          <Col span={18}>
            <RadioGroup onChange={this.onChange} value={this.state.value}>
              <Radio value={1}>A</Radio>
              <Radio value={2}>B</Radio>
              <Radio value={3}>C</Radio>
              <Radio value={4}>D</Radio>
            </RadioGroup>
          </Col>
      </Row>
      {/*费用计算--table*/}
      <FeeRecordFeeCalComp location={location}/>
      <Row className={style.rowHeight40}>
        <Col span={24}><h4><Icon type="down-square" />适用功能</h4></Col>
      </Row>
      {/*适用功能--table*/}
      <FeeRecordToolBarComp location={location}/>
    </div>
  )}
}

FeeRecordDoView.PropTypes={

}
export default FeeRecordDoView
