import {  query,remove } from '../../../../services/templet'
import { parse } from 'qs'

export default {
  namespace: 'templet',
  state: {
    dataSource: [],
    oldDataSource: [],
    selectedRows:[],
    count: null,
    visible:false,
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null,
    },
    addFlag:true,
    addArr:[]
  },
  reducers: {
    // 查询成功
    querySuccess (state, action) {
      const { dataSource, pagination } = action.payload
      state.count=pagination.total
      return { ...state,
        selectedRows:[],
        dataSource,
        pagination: {
          ...state.pagination,
          ...pagination,
        } }
    },
    //模板设置show
    templetModalShow(state,action){
      return {
        ...state,
        ...action.payload,
        visible: true
      }
    },
    //模板设置hide
    templetModalHide(state){
      return{
        ...state,
        addFlag:true,
        visible: false
      }
    },
    //显示编辑控件
    showInput(state,action){
      state.dataSource[action.payload.index][action.payload.item].editable=true;
      state.dataSource[action.payload.index][action.payload.item].status=action.payload.type;
      return {
        ...state,
        ...action.payload
      }
    },
    //隐藏编辑控件
    hideInput(state,action){
      state.dataSource[action.payload.index][action.payload.item].editable=false;
      state.dataSource[action.payload.index][action.payload.item].status=action.payload.type;
      return {
        ...state,
        ...action.payload
      }
    },
    // push新的数据到state里面
    pushNewData(state,action){
      state.dataSource.unshift(action.payload.newData);
      state.addArr.push(action.payload.newData);
      state.count=action.payload.count;
      state.addFlag=false;
      return {
        ...state,
        ...action.payload
      }
    },

    // 清空addArr数组
    selectedRowKeys(state,action){
      state.selectedRowKeys=[];
      state.selectedRows=[];
      return {
        ...state,
        ...action.payload
      }
    },
    // 清空addArr数组
    clearAddArr(state,action){
      state.addArr=[];
      state.addFlag=true;
      //debugger;
      return {
        ...state,
        ...action.payload
      }
    },
    // changeKey
    changeKey(state,action){
      state.count=action.payload.count;
      return {
        ...state,
        ...action.payload
      }
    },
    // changePage
    changePage(state,action){
      state.pagination.total=state.dataSource.length;
      return {
        ...state,
        ...action.payload
      }
    },
    // 取消编辑表格数据
    cancelSave(state,action){
      //debugger;
      state.dataSource[action.payload.index].editable=false;
      state.dataSource[action.payload.index]=action.payload.oldData;
      return {
        ...state,
        ...action.payload
      }
    },
    // 修改表格数据
    changeValue(state,action){
      state.dataSource[action.payload.index][action.payload.keyName].value = action.payload.value;
      return {
        ...state,
        ...action.payload
      }
    },
    // 删除单行数据
    deleteCol(state,action){
      state.dataSource = action.payload.dataSource;
      return {
        ...state,
      }
    },
    // 修改表格数据
    saveOldData(state,action){
      //克隆对象
      const str = JSON.stringify(action.payload.oldData); //序列化对象
      const oldData = JSON.parse(str);
      state.oldDataSource.push(oldData);//将克隆对象放到数组
      return {
        ...state,
      }
    },
   //清空当前的radio
    selectedRowClear(state,action){
      return {
        ...state,
        selectedRows:[],
      }
    },
  },

  effects: {
    //查询数据
    *query ({ payload }, { call, put }) {
      const data = yield call(query, parse(payload))
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            dataSource: data.data,
            pagination: data.page,
          },
        })
      }
    },
    //删除
    *'delete'({payload}, {call, put}){
      console.log('payload',payload);
      const data = yield call(remove, {id: payload})
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            dataSource: data.data,
            pagination: data.page,
          },
        })
      }
    }
  },
  subscriptions: {


  },
};
