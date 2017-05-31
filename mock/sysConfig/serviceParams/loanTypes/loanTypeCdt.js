const qs = require('qs')
const Mock = require('mockjs')
const mockStorge = require('../../../../src/utils/mockStorge')

let dataKey = mockStorge('loanTypeCdtData', Mock.mock({
  'data|4': [
    {
      //"cdtSeq": "string,适用范围代码",
      //"cdeOne": "string,合作机构代码",
      //"name": "string,合作机构名称",

      "key|+1": 0,
      'cdtSeq':  {
        value: '@string("number", 7, 9)',
        editable:false,
        tagType:'input'
      },
      'cdeOne':  {
        value: '@string("number", 7, 9)',
        editable:false,
        tagType:'input'
      },
      'name':  {
        value(){return Mock.Random.csentence(3, 5)},
        editable:false,
        tagType:'input'
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

  'GET /api/loanTypeCdt' (req, res) {

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
  'DELETE /api/loanTypeCdt' (req, res) {
    const deleteItem = JSON.parse(req.body)
    console.log('deleteItem',deleteItem)
    const usersListData=salesPrtData

    usersListData.data = usersListData.data.filter((item) => {
      if (item.cdeOne === deleteItem.cdeOne) {
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
  },

}
