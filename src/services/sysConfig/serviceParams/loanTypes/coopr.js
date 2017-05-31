import  {request}  from '../../../../utils'

export async function query (params) {
  return request({
    url: '/api/coopr',
    method: 'get',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: '/api/coopr',
    method: 'delete',
    data: params,
  })
}


