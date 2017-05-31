const qs = require('qs')
const Mock = require('mockjs')
const mockStorge = require('../src/utils/mockStorge')

let dataKey = mockStorge('salesPrtEditTable', Mock.mock({
  'data|100': [
    {
      'number|+1': 1,
      'salesDescrip|11-99': 1,
      salesStart: '@datetime',
      salesEnd: '@datetime',
      "rateAdjustType|1": [
        "生效",
        "待生效"
      ],
      "adjustValue|11-99":1,
      //dataType: '@boolean',
      "loanStatus|1": [
        "生效",
        "待生效",
        "失效",
      ],
      "operation|1": [
        "生效",
        "待生效"
      ],

    },
  ],
  page: {
    total: 105,
    current: 10,
  },
}))

let salesPrtData = global[dataKey]

module.exports = {

  'GET /api/salesPrt' (req, res) {
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
/*
  'POST /api/users' (req, res) {
    const newData = JSON.parse(req.body)
    newData.createTime = Mock.mock('@now')
    newData.avatar = Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', newData.nickName.substr(0, 1))

    newData.id = usersListData.data.length + 1
    usersListData.data.unshift(newData)

    usersListData.page.total = usersListData.data.length
    usersListData.page.current = 1

    global[dataKey] = usersListData

    res.json({ success: true, data: usersListData.data, page: usersListData.page })
  },

  'DELETE /api/users' (req, res) {
    const deleteItem = JSON.parse(req.body)

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

  'PUT /api/users' (req, res) {
    const editItem = JSON.parse(req.body)

    editItem.createTime = Mock.mock('@now')
    editItem.avatar = Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', editItem.nickName.substr(0, 1))

    usersListData.data = usersListData.data.map((item) => {
      if (item.id === editItem.id) {
        return editItem
      }
      return item
    })

    global[dataKey] = usersListData
    res.json({ success: true, data: usersListData.data, page: usersListData.page })
  },*/

}
