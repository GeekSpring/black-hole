import  {request}  from '../utils'

export async function query (params) {
  return request({
    url: '/api/loanTypExt',
    method: 'get',
    data: params,
  })
}
