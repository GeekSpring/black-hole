import  {request}  from '../../../../utils'

export async function query (params) {
  return request({
    url: '/api/loanTypeCdt',
    method: 'get',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: '/api/loanTypeCdt',
    method: 'delete',
    data: params,
  })
}


