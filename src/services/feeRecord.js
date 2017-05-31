import  {request}  from '../utils'

export async function query (params) {
  return request({
    url: '/api/feeRecord',
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: '/api/feeRecord',
    method: 'post',
    data: params,
  })
}

 export async function remove (params) {
  return request({
    url: '/api/feeRecord',
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: '/api/feeRecord',
    method: 'put',
    data: params,
  })
}
