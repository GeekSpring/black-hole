import {  query } from '../../../../services/costsSet'
import { parse } from 'qs'

export default {
  namespace: 'costsSets',
  state: {
    list: [],
    total: null,
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null,
    },
    page: null,
    selectedRows:[],
  },
  reducers: {
    save(state, { payload: { data: list, total } }) {
      return { ...state, list, total };
    },
    querySuccess (state, action) {
      const { list, pagination } = action.payload
      return { ...state,
        list,
        pagination: {
          ...state.pagination,
          ...pagination,
        } }
    },
    changeBtnType(state,action){
      ////debugger;
      let flag=action.payload.changeBtn;
      return{
        ...state,
        changeBtn:!flag,
      }
    },
    /*选取并返回*/
    selectReturn(state,action){
      //debugger
      return {
        ...state,
        selectedValue:action.payload.selectedValue,
      }　
    },
    //选择当前的radio
    selectedRow(state,action){
      return {
        ...state,
        selectedRows:action.payload.selectedRows,
      }
    },//清空当前的radio
    selectedRowClear(state,action){
      return {
        ...state,
        selectedRows:[],
      }
    },

  },

  effects: {
    *query ({ payload }, { call, put }) {
      //debugger;
      const data = yield call(query, parse(payload))
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: data.page,
          },
        })
      }
    },
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/sysConfig/serviceParams/loanTypes') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
        }
      })
    },
  },
};
