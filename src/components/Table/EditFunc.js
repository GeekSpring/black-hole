import { Popconfirm } from 'antd'

export default function EditFunc(text, record, index, dataSourceModels,dispatch,nameSpace){
  const {dataSource, oldDataSource,addArr} = dataSourceModels
  const keys = [];
  for (var item in record) {
    if (record.hasOwnProperty(item))
      keys.push(item);
  }
  let editFlag = keys[1]
  const {editable} = dataSource[index][editFlag];
  //表格里面的编辑按钮
  const edit = (index) => {
    dispatch({
      type: `${nameSpace}/saveEditIndex`,
      payload: {
        editIndex: index,
      }
    })
    dispatch({
      type: `${nameSpace}/saveOldData`,
      payload: {
        oldData: dataSource[index]
      }
    })
    Object.keys(dataSource[index]).forEach((item) => {
      if (dataSource[index][item] && typeof dataSource[index][item].editable !== 'undefined') {
        dispatch({
          type: `${nameSpace}/showInput`,
          payload: {
            index,
            item,
            currentItem: dataSource[index][item].editable,
          }
        })
      }
    });
  }
  //表格中的刪除按鈕
  const onDelete = (index) => {
    let newDataSource = dataSource.filter(function (item) {
      return item.key != dataSource[index].key;
    })
    console.log(newDataSource)
    dispatch({
      type: `${nameSpace}/deleteCol`,
      payload: {
        dataSource: newDataSource,
      }
    })
  }
  // 表格中编辑按钮 保存/取消
  const editDone = (index, type) => {
    let oldData;
    for (let i = 0; i < oldDataSource.length; i++) {
      if (dataSource[index].key === oldDataSource[i].key) {
        oldData = oldDataSource[i]
        console.log(oldData.feeDesc)
      }
    }
    if (type === 'cancel') {
      dispatch({
        type: `${nameSpace}/cancelSave`,
        payload: {
          oldData,
          index,
        }
      })
    }
    Object.keys(dataSource[index]).forEach((item) => {
      if (dataSource[index][item] && typeof dataSource[index][item].editable !== 'undefined') {
        dispatch({
          type: `${nameSpace}/hideInput`,
          payload: {
            index,
            item,
            type,
          }
        })
      }
    });
    if (addArr.length == '1') {
      //debugger;
      dispatch({
        type: `${nameSpace}/clearAddArr`,
        payload: {
          index
        }
      });
    }
  }
  return (
    <div className="editable-row-operations">
      {
        editable ?
          <span>
            <a onClick={() => editDone(index, 'save')}>保存</a>
            <Popconfirm title="确定取消?" onConfirm={() => editDone(index, 'cancel')}>
              <a> 取消 </a>
            </Popconfirm>
              <Popconfirm title="确定删除?" onConfirm={() => onDelete(index)}>
                <a href="#">删除</a>
              </Popconfirm>
          </span>
          :
          <span>
            <a onClick={() => edit(index)}>编辑</a>
          </span>
      }
    </div>
  );
}
