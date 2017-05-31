/**
	 *
	 * @Description(功能描述)    : coopr
	 * @author(作者)             :  李迎春
	 * @date (开发日期)          :  2017/5/25 16:20
	 * @param  request
	 * @param  response
	 * @return  Object
	 */
import {  query} from '../../../../services/sysConfig/serviceParams/loanTypes/coopr'
import { parse } from 'qs'

export default {
  namespace: 'coopr',
  state: {
    dataSource: [],
    targetSource: [],
    operationSource: [],
    rightSelectedRows:[],
    leftSelectedRows:[],
    changeBtn:true,
    total: null,
    count: null,
    visible:false,
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null,
    }

  },
  reducers: {
    // 查询成功
    querySuccess (state, action) {
      const { dataSource,pagination } = action.payload
      return { ...state,
        dataSource,
        rightSelectedRows:[],
        leftSelectedRows:[],
        pagination: {
          ...state.pagination,
          ...pagination,
        }
        }
    },
    //模板设置show
    cooprModalShow(state,action){
      return {
        ...state,
        ...action.payload,
        visible: true
      }
    },
    //模板设置hide
    cooprModalHide(state){
      return{
        ...state,
        visible: false
      }
    },
    //checkBox选中的行
    getRightSelectedRows(state,action){
      state.rightSelectedRows=action.payload.selectedRowsParam;
      return{
        ...state,
        ...action.payload
      }
    },
    //checkBox选中的行
    getLeftSelectedRows(state,action){
      state.leftSelectedRows=action.payload.selectedRowsParam;
      return{
        ...state,
        ...action.payload
      }
    },
    changeBtnType(state,action){
      let flag=action.payload.changeBtn;
      return{
        ...state,
        changeBtn:!flag,
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
