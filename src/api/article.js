import request from '@/utils/request'
//分类相关
// 获取文章分类
export const artGetChannelService = () => {
  return request.get('/my/cate/list')
}
//添加文章分类
export const artAddChannelService = ({ cate_name, cate_alias }) => {
  return request.post('/my/cate/add', {
    cate_name,
    cate_alias
  })
}

//更新文章分类
export const artSetChannelService = ({ id, cate_name, cate_alias }) => {
  return request.put('/my/cate/info', {
    // body参数
    id,
    cate_name,
    cate_alias
  })
}

//删除分类
export const artDeleteChannelService = (id) => {
  return request.delete('/my/cate/del', {
    // Query参数
    params: { id }
  })
}

//文章相关
//获取文章列表
export const artGetArticleService = ({ pagenum, pagesize, cate_id, state }) => {
  return request.get('/my/article/list', {
    params: {
      pagenum,
      pagesize,
      cate_id,
      state
    }
  })
}
//添加文章
export const artAddArticleService = (data) => {
  return request.post('/my/article/add', data)
}
//获取文章详情
export const artGetDetailService = (id) => {
  return request.get('/my/article/info', {
    params: {
      id
    }
  })
}
//编辑更新文章
export const artUpdateService = (data) => {
  return request.put('/my/article/info', data)
}
