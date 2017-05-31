const qs = require('qs')
const Mock = require('mockjs')
const mockStorge = require('../src/utils/mockStorge')

let dataKey = mockStorge('pTempLoanTyp', Mock.mock({
  'data|4': [
    {
      //"typCde": "string,贷款品种代码",
      //"tempCde": "string,模板代码",
      //"typDesc": "string,贷款品种描述",
      //"tempNam": "string,模板名称",
      //"tempTyp": "string,模板类型"
      "key|+1": 0,
      'typCde':  {
        value: '@string("number", 7, 9)',
        editable:false,
        tagType:'input'
      },
      'tempCde':  {
        value: '@string("number", 7, 9)',
        editable:false,
        tagType:'input'
      },
      'typDesc':  {
        value(){return Mock.Random.csentence(3, 5)},
        editable:false,
        tagType:'input'
      },
      'tempNam':  {
        value(){return Mock.Random.csentence(3, 5)},
        editable:false,
        tagType:'input'
      },
      'tempTyp':  {
        'value|1':[
          "01",
          "02",
          "03",
          "04",
        ],
        editable:false,
        tagType:'select'
      },
    },
  ],
  page: {
    total: 10,
    current: 1,
  },
}))

let salesPrtData = global[dataKey]

module.exports = {

  'GET /api/templet' (req, res) {

    const page = qs.parse(req.query)
    const pageSize = page.pageSize || 10
    const currentPage = page.page || 1
    let data
    let newPage

    let newData = salesPrtData.data.concat()
    if (page.field) {
      const d = newData.filter((item) => {
        return item[page.field].indexOf(decodeURI(page.keyword)) > -1
      })

      data = d.slice((currentPage - 1) * pageSize, currentPage * pageSize)

      newPage = {
        current: currentPage * 1,
        total: d.length,
      }
    } else {
      data = salesPrtData.data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      salesPrtData.page.current = currentPage * 1
      newPage = salesPrtData.page
    }
    res.json({ success: true, data, page: {pageSize: Number(pageSize),current:newPage.current,total:newPage.total } })
  },
  'DELETE /api/templet' (req, res) {
    const deleteItem = JSON.parse(req.body)
    console.log('deleteItem',deleteItem)
    const usersListData=salesPrtData

    usersListData.data = usersListData.data.filter((item) => {
      if (item.tempCde === deleteItem.tempCde) {
        return false
      }
      return true
    })

    usersListData.page.total = usersListData.data.length

    global[dataKey] = usersListData

    res.json({ success: true, data: usersListData.data, page: usersListData.page })


    /*const delParam=deleteItem.id.selectedRows
    const usersListData=salesPrtData*/

    //usersListData.data = usersListData.data.filter((item) => item.id !== deleteItem)
   /* delParam.forEach(function (value) {
      console.log(value);
    });*/
  /*  usersListData.data = delParam.data.map((index) => {
      usersListData.data.filter((item) => {
        return index.tempCde !=index
      })
    })*/

    usersListData.page.total = usersListData.data.length

    global[dataKey] = usersListData
    res.json({ success: true, data: usersListData.data, page: usersListData.page })
  },

}
