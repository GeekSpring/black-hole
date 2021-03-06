import { query, create, update, remove} from '../../../../services/loanTypeHistory'
import { parse } from 'qs'

export default {
  namespace: 'pCommRelRecord',
  state: {
    dataSourceMtd: [],
    oldDataSourceMtd: [],
    count: null,
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null,
    },
    addFlag:true,
    addArr:[],
    doViewType:'doView',/*查看费用明细*/
    feeDescType:'feeDesc',/*费用描述*/
    visible:false,
  },
  reducers: {
    showModal(state,action){  /*费用设置*/
      return {
        ...state,
        ...action.payload,
        visible: true
      }
    },
    hideModal(state){
      return{
        ...state,
        visible:false,
      }
    },
    doViewShowModal(state,action){  /*查看费用明细*/
      return {
        ...state,
        ...action.payload,
        doViewModalVisible: true
      }
    },
    doViewHideModal(state){
      return{
        ...state,
        doViewModalVisible:false,
      }
    },
    feeDescShowModal(state,action){  /*费用描述*/
      return {
        ...state,
        ...action.payload,
        feeDescModalVisible: true
      }
    },
    feeDescHideModal(state){
      return{
        ...state,
        feeDescModalVisible:false,
      }
    },
    // 查询成功
    querySuccess (state, action) {
      const { dataSourceMtd, pagination } = action.payload
      state.count=pagination.total
      return {
        ...state,
        dataSourceMtd,
        pagination: {
          ...state.pagination,
          ...pagination,
        } }
    },
    //显示编辑控件
    showInput(state,action){
      state.dataSourceMtd[action.payload.index][action.payload.item].editable=true;
      state.dataSourceMtd[action.payload.index][action.payload.item].status=action.payload.type;
      return {
        ...state,
        ...action.payload
      }
    },
    //显示编辑控件
    hideInput(state,action){
      state.dataSourceMtd[action.payload.index][action.payload.item].editable=false;
      state.dataSourceMtd[action.payload.index][action.payload.item].status=action.payload.type;
      return {
        ...state,
        ...action.payload
      }
    },
    // push新的数据到state里面
    pushNewData(state,action){
      state.dataSourceMtd.unshift(action.payload.newData);
      state.addArr.push(action.payload.newData);
      state.count=action.payload.count;
      state.addFlag=false;
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
      state.pagination.total=state.dataSourceMtd.length;
      return {
        ...state,
        ...action.payload
      }
    },
    // 取消编辑表格数据
    cancelSave(state,action){
      //debugger;
      state.dataSourceMtd[action.payload.index]=action.payload.oldData;
      return {
        ...state,
      }
    },
    // 修改表格数据
    changeValue(state,action){
      state.dataSourceMtd[action.payload.index][action.payload.keyName].value = action.payload.value;
      return {
        ...state,
        ...action.payload
      }
    },
    // 删除单行数据
    deleteCol(state,action){
      state.dataSourceMtd = action.payload.dataSourceMtd;
      return {
        ...state,
      }
    },
    // 修改表格数据
    saveOldData(state,action){
      //克隆对象
      const str = JSON.stringify(action.payload.oldData); //序列化对象
      const oldData = JSON.parse(str);
      state.oldDataSourceMtd.push(oldData);
      return {
        ...state,
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
            dataSourceMtd: data.data,
            pagination: data.page,
          },
        })
      }
    },
    //删除
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
    /*setup ({ dispatch, history }) {
     history.listen(location => {
     if (location.pathname === '/sysConfig/serviceParams/loanTypes') {
     dispatch({
     type: 'query',
     payload: location.query,
     })
     }
     })
     },*/
  }
};
