import request from '@/utils/request'


//管理员表-查询单条数据
export function adminone(params) {
    return request({
      url: 'admin/getone',
      method: 'post',
      params: params
    })
  }

//管理员表-查询列表数据
export function adminlist(params) {
    return request({
      url: 'admin/getlist',
      method: 'post',
      data: params
    })
  }

//管理员表-删除
export function admindel(params) {
    return request({
      url: 'admin/del',
      method: 'post',
      params: params
    })
  }

//管理员表-保存
export function adminsave(params) {
    return request({
      url: 'admin/save',
      method: 'post',
      data: params
    })
  }


//医生表-查询单条数据
export function doctorone(params) {
    return request({
      url: 'doctor/getone',
      method: 'post',
      params: params
    })
  }

//医生表-查询列表数据
export function doctorlist(params) {
    return request({
      url: 'doctor/getlist',
      method: 'post',
      data: params
    })
  }

//医生表-删除
export function doctordel(params) {
    return request({
      url: 'doctor/del',
      method: 'post',
      params: params
    })
  }

//医生表-保存
export function doctorsave(params) {
    return request({
      url: 'doctor/save',
      method: 'post',
      data: params
    })
  }


//科普知识表-查询单条数据
export function newsone(params) {
    return request({
      url: 'news/getone',
      method: 'post',
      params: params
    })
  }

//科普知识表-查询列表数据
export function newslist(params) {
    return request({
      url: 'news/getlist',
      method: 'post',
      data: params
    })
  }

//科普知识表-删除
export function newsdel(params) {
    return request({
      url: 'news/del',
      method: 'post',
      params: params
    })
  }

//科普知识表-保存
export function newssave(params) {
    return request({
      url: 'news/save',
      method: 'post',
      data: params
    })
  }


//对话表-查询单条数据
export function talkone(params) {
    return request({
      url: 'talk/getone',
      method: 'post',
      params: params
    })
  }

//对话表-查询列表数据
export function talklist(params) {
    return request({
      url: 'talk/getlist',
      method: 'post',
      data: params
    })
  }

//对话表-删除
export function talkdel(params) {
    return request({
      url: 'talk/del',
      method: 'post',
      params: params
    })
  }

//对话表-保存
export function talksave(params) {
    return request({
      url: 'talk/save',
      method: 'post',
      data: params
    })
  }


//用户表-查询单条数据
export function userone(params) {
    return request({
      url: 'user/getone',
      method: 'post',
      params: params
    })
  }

//用户表-查询列表数据
export function userlist(params) {
    return request({
      url: 'user/getlist',
      method: 'post',
      data: params
    })
  }

//用户表-删除
export function userdel(params) {
    return request({
      url: 'user/del',
      method: 'post',
      params: params
    })
  }

//用户表-保存
export function usersave(params) {
    return request({
      url: 'user/save',
      method: 'post',
      data: params
    })
  }


//预约表-查询单条数据
export function ordersone(params) {
  return request({
    url: 'orders/getone',
    method: 'post',
    params: params
  })
}

//预约表-查询列表数据
export function orderslist(params) {
  return request({
    url: 'orders/getlist',
    method: 'post',
    data: params
  })
}

//预约表-删除
export function ordersdel(params) {
  return request({
    url: 'orders/del',
    method: 'post',
    params: params
  })
}

//预约表-保存
export function orderssave(params) {
  return request({
    url: 'orders/save',
    method: 'post',
    data: params
  })
}


