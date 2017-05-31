/**
	 *
	 * @Description(功能描述)    : loanTypeCdtModels
	 * @author(作者)             :  李迎春
	 * @date (开发日期)          :  2017/5/25 16:14
	 * @param  request
	 * @param  response
	 * @return  Object
	 */
import {  query,remove } from '../../../../services/sysConfig/serviceParams/loanTypes/loanTypeCdt'
import { parse } from 'qs'

export default {
  namespace: 'loanTypeCdt',
  state: {
    list: [],
    total: null,
    addFlag:true,
    addArr:[],
    oldDataSource: [],
    selectedRows:[],
    count: null,
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null,
    },
  },
  reducers: {
    save(state, { payload: { data: list, total } }) {
      return { ...state, list, total };
    },
    querySuccess (state, action) {
      const { list, pagination } = action.payload
      return { ...state,
        list,
        selectedRows:[],
        pagination: {
          ...state.pagination,
          ...pagination,
        } }
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
      state.pagination.total=state.list.length;
      return {
        ...state,
        ...action.payload
      }
    },
    // push新的数据到state里面
    pushNewData(state,action){
      state.list.unshift(action.payload.newData);
      state.addArr.push(action.payload.newData);
      state.count=action.payload.count;
      state.addFlag=false;
      return {
        ...state,
        ...action.payload
      }
    },
    //checkBox选中的行
    getSelectedRows(state,action){
      state.selectedRows=action.payload.selectedRowsParam;
      return{
        ...state,
        ...action.payload
      }
    }
  },

  effects: {
    *query ({ payload }, { call, put }) {
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
    //删除
    *'delete'({payload}, {call, put}){
      console.log('payload',payload);
      debugger;
      const data = yield call(remove, {id: payload})
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
