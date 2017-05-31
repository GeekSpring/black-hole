import { query} from '../../../../services/loanTypExt'
import { parse } from 'qs'

export default {
  namespace: 'loanTypExt', //数据models的名称，在component的connect中用
  state: {
    loanTypExtData: {},
    visible:false,
  },
  reducers: {
    save(state, { payload: { data: list, total } }) {
      return { ...state, list, total };
    },
    querySuccess (state, action) {
      const { loanTypExtData } = action.payload
      return { ...state,
        loanTypExtData  //将state中的数据return给component
      }
    },
    //其它设置show
    loanTypExtModalShow(state,action){
      return {
        ...state,
        visible: true
      }
    },
    //其它设置hide
    loanTypExtModalHide(state){
      return{
        ...state,
        addFlag:true,
        visible: false
      }
    },
  },

  effects: {
    *query ({ payload }, { call, put }) {
      const data = yield call(query, parse(payload))
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            loanTypExtData: data.loanTypExt.data   //获取返回的数据
          },
        })
      }
    },

    *create({ payload }, { call, put }){
      yield put({type: 'hideModal'})
      const data = yield call(create, payload)
      if(data){
        yield put({
          type:'querySuccess',
          payload:{
            list:data.data,
            pagination:{
              total:data.page.total,
              current:data.page.current,
            }
          }
        })
      }
    },
    *update({payload},{select,call,put}){
      yield put({type: 'hideModal'});
      /**
       * select 查询某个命名空间下的     : 'loanTypes' 的某个state状态
       */
      const id = yield select(({loanTypes})=>loanTypes.currentItem.id)
      const newLoanType={...payload,id}
      const data=yield call(update,newLoanType)
      if(data){
        yield put({
          type:'querySuccess',
          payload:{
            list:data.data,
            pagination:{
              total:data.page.total,
              current:data.page.current,
            }
          }
        })
      }
    },
    *'delete'({payload}, {call, put}){
      const data = yield call(remove, {id: payload})
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              total: data.page.total,
              current: data.page.current,
            },
          },
        })
      }
    }
  },
  subscriptions: {

  },
};
