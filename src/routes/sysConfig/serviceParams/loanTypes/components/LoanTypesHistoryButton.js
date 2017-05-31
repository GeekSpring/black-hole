import React, { PropTypes } from 'react'
import {connect} from 'dva'
import { Select, Button, Col, Form } from 'antd'


const FormItem = Form.Item;
function LoanTypesHistoryButton({dispatch}) {
    const checkComputationSet=()=>{   /*核算设置*/
      dispatch({
        type:'loanTypeHistory/checkShowModal',
        payload:{
          modalType:'checkCptSet',
        }
      })
    }
    const pCommRelRecord=()=>{
      dispatch({
        type:'pCommRelRecord/showModal',
        payload:{
          modalType:'salesPrt',
        }
      })
    }

    const salesPromotionSet=()=>{   /*促销设置*/
      dispatch({
        type:'loanTypeHistory/salesPrtShowModal',
        payload:{
          modalType:'salesPrt',
        }
      })
    }
    const feeRecord=()=>{   /*费用设置*/
      dispatch({
        type:'loanTypeHistory/feeRecordShowModal',
        payload:{
          modalType:'feeRecord',
        }
      })
    }
    const templetSet=()=>{   /*费用设置*/
      dispatch({
        type:'loanTypeHistory/feeRecordShowModal',
        payload:{
          modalType:'feeRecord',
        }
      })
    }
    const itemLayout = {
      size:'small',
      type:'ghost',
      style:{
        marginRight:'10px'
      }
    };
    return (
      <Col span={40} >
        <FormItem style={{margin:'20px 20px'}}>
          <h4 style={{display:'inline-block'}}>贷款品种</h4>
          <div style={{float:'right'}}>
            <Button {...itemLayout} onClick={pCommRelRecord}>服务费关联</Button>
            <Button {...itemLayout} onClick={checkComputationSet}>核算设置</Button>
            <Button {...itemLayout} onClick={salesPromotionSet}>促销设置</Button>
            <Button {...itemLayout} onClick={feeRecord}>费用设置</Button>
            <Button {...itemLayout} onClick={templetSet}>模板设置</Button>
          </div>
        </FormItem>
      </Col>
    )

}


LoanTypesHistoryButton.propTypes = {
  onAdd: PropTypes.func,
  onUpdate: PropTypes.func,
  checkComputationSet: PropTypes.func, /*核算设置*/
  salesPromotionSet: PropTypes.func, /*促销设置*/
  templetSet:PropTypes.func,/*模板设置*/
}

export default connect()(LoanTypesHistoryButton)




