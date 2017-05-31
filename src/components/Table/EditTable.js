import React,{ PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Table, Button,Modal } from 'antd';

require('./EditTable.css')

const EditableTable=({dispatch,loading,dataSourceMtd,pagination,tableColumns,addFlag,count,newData,nameSpace})=>{


  const onPageChange=(page)=>{
    const location=this.props;
    const {query,pathname}=this.props.location
    this.props.dispatch(routerRedux.push({
      pathname,
      query:{
        ...query,
        page: page.current,
        pageSize:page.pageSize
      }
    }))
  }
  const handleAdd = () => {
    if(!addFlag){
      return
    }
    count++;
    dispatch({
      type:`${nameSpace}/changeKey`,
      payload:{
        count
      }
    });
    dispatch({
      type:`${nameSpace}/changePage`,
    })
    dispatch({
      type:`${nameSpace}/pushNewData`,
      payload:{
        newData,
        count,
      }
    })
  }

  const dataSource2 = dataSourceMtd.map((item) => {
    const obj = {};
    Object.keys(item).forEach((key) => {
      obj[key] = key === 'key' ? item[key] : item[key].value;
    });
    return obj;
  });
  return (
    <div>
      <Button className="editable-add-btn" onClick={handleAdd}>
        +添加
      </Button>
      <br/><br/>
      <Table
        loading={loading}
        bordered
        dataSource={dataSource2}
        columns={tableColumns}
        pagination={pagination}
        onChange={onPageChange}
      />
    </div>
  );

}


export default connect()(EditableTable);
