/*促销设置弹框--table--新增*/
import React, { PropTypes } from 'react'
import {editCell} from '../../utils'
require('./EditTable.css')

class EditableCell extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { value, editable, index, keyName,dispatch ,nameSpace } = this.props;
    // 点击编辑按钮修改当前行数据
    const handleChangeValue=(keyName, index, value)=> {
      dispatch({
        type:`${nameSpace}/changeValue`,
        payload:{
          index,
          value,
          keyName
        }
      })
    }


    const handleChange = (e) => {
      handleChangeValue(keyName,index,e.target.value)
    }
    const handleChangeSelect = (e) => {
      handleChangeValue(keyName,index,e)
    }
    const onChange=(date,dateString)=> {
      handleChangeValue(keyName,index,dateString)
    }
    let childInput='';
    const editFun={
      handleChange,
      handleChangeSelect,
      onChange,

    }
    if(editable){
      childInput=editCell(this.props,editFun)
      //debugger;
    }
    return (

      <div className="editable-cell">
        {
          editable ?
            <div>
              {childInput}
            </div> :
            <div className="editable-row-text">
              {value || ' '}
            </div>
        }
      </div>
    );
  }
}
export default EditableCell
