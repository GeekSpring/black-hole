const qs = require('qs')
const Mock = require('mockjs')
const mockStorge = require('../src/utils/mockStorge')

let dataKey = mockStorge('loanList', Mock.mock({
  'data|100': [
    {
    //{
    //  "code": "string,状态码",
    //  "message": "string,信息描述",
    //  "success": "boolean,状态",
    //  "data": {
    //    "loanTyp": {
    //      "typCde": "string,贷款品种代码",
    //      "typDesc": "string,贷款品种描述",
    //      "typGrp": "string,贷款类型",
    //      "startDt": "string,生效日期",
    //      "typSts": "string,状态"
    //    }
    //  }
    //}
      'id|+1': 1,
      typCde: '@string("number", 7, 9)',
      "typSts|1": [
        "生效",
        "待生效",
        "失效",
      ],
      startDt: '@datetime',
      lastChgDt: '@datetime',
      'typVer|+1': 1,
      typDesc () {
        return Mock.Random.csentence(3, 5)
      },
      "typGrp|1": [
        "耐用消费品贷款",
        "一般消费贷款",
        "汽车消费贷款",
      ],
    },
  ],
  page: {
    total: 100,
    current: 1,
  },
}))

let loanListData = global[dataKey]

module.exports = {

  'GET /api/loanTypes' (req, res) {
    const page = qs.parse(req.query)
    const pageSize = page.pageSize || 10
    const currentPage = page.page || 1
    let data
    let newPage

    let newData = loanListData.data.concat()

    if (page.typCde&&page.typCde !='') {
      const d = newData.filter((item) => {
        return item.typCde==page.typCde
      })
      data = d.slice((currentPage - 1) * pageSize, currentPage * pageSize)

      newPage = {
        current: currentPage * 1,
        total: d.length,
      }
    } else {
      data = loanListData.data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      loanListData.page.current = currentPage * 1
      newPage = loanListData.page
    }
    res.json({ success: true, data, page: {pageSize: Number(pageSize),current:newPage.current,total:newPage.total } })
  },

  'POST /api/loanTypes' (req, res) {
    const newData = JSON.parse(req.body)
    newData.entryTime = Mock.mock('@now')

    newData.id = loanListData.data.length + 1
    loanListData.data.unshift(newData)

    loanListData.page.total = loanListData.data.length
    loanListData.page.current = 1

    global[dataKey] = loanListData

    res.json({ success: true, data: loanListData.data, page: loanListData.page })
  },

  'DELETE /api/loanTypes' (req, res) {
    const deleteItem = JSON.parse(req.body)
    const usersListData=loanListData

    usersListData.data = usersListData.data.filter((item) => {
      if (item.id === deleteItem.id) {
        return false
      }
      return true
    })

    usersListData.page.total = usersListData.data.length

    global[dataKey] = usersListData

    res.json({ success: true, data: usersListData.data, page: usersListData.page })
  },

  'PUT /api/loanTypes' (req, res) {
    const editItem = JSON.parse(req.body)

    const usersListData=loanListData

    editItem.entryTime = Mock.mock('@now')

    usersListData.data = usersListData.data.map((item) => {
      if (item.id === editItem.id) {
        return editItem
      }
      return item
    })

    global[dataKey] = usersListData
    res.json({ success: true, data: usersListData.data, page: usersListData.page })
  },

}
