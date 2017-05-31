const Mock = require('mockjs')
const users = require('../../mock/users')
const app = require('../../mock/app')
const LoanType = require('../../mock/loanType')
const costsSet = require('../../mock/costsSet')
const LoanTypeDetail = require('../../mock/loanTypeDetail')
const pLoanTypMtd = require('../../mock/pLoanTypMtd')
const salesPrt = require('../../mock/salesPrt')
const feeRecord = require('../../mock/feeRecord')
const templet = require('../../mock/templet')
const loanTypExt = require('../../mock/loanTypExt')
const loanTypeCdt = require('../../mock/sysConfig/serviceParams/loanTypes/loanTypeCdt')
const coopr = require('../../mock/sysConfig/serviceParams/loanTypes/coopr')
const mockData = [users,app,LoanType,costsSet,LoanTypeDetail,salesPrt,pLoanTypMtd,feeRecord,templet,loanTypExt,loanTypeCdt,coopr]


function serialize (str) {
  let paramArray = str.split('&')
  let query = {}
  for (let i in paramArray) {
    if (Object.prototype.hasOwnProperty.call(paramArray, i)) {
      query[paramArray[i].split('=')[0]] = paramArray[i].split('=')[1]
    }
  }
  return query
}

for (let i in mockData) {
  if (Object.prototype.hasOwnProperty.call(mockData, i)) {
    for (let key in mockData[i]) {
      if (Object.prototype.hasOwnProperty.call(mockData[i], key)) {
        Mock.mock(eval(`/${key.split(' ')[1].replace(/\//g, '\\/')}/`), key.split(' ')[0].toLowerCase(), (options) => {
          if (key.split(' ')[0].toLowerCase() === 'get') {
            if (options.url.split('?')[1]) {
              options.query = serialize(options.url.split('?')[1])
            } else {
              options.query = options.body ? JSON.parse(options.body) : {}
            }
          }
          let res = {}
          let result = {}
          res.json = function (data) {
            result = data
          }
          mockData[i][key](options, res)
          return result
        })
      }
    }
  }
}

Mock.setup({ timeout: '200-600' })
