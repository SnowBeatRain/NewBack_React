/* 设置接口url及method type
*/

export const api = {

    // 获取登录信息
    API_GET_LOGIN_TOKEN: {
    url: '/api/Admin/Login',
    type: {method: 'post'}
    },

    // 获取下属公司
    API_GET_COMPANY_LIST: {
    url: '/company/compnay/list',
    type: {method: 'post'}
    },

    // 获取浏览量
    API_GET_PAGE_VIEW: {
    url: '/company/company/tally',
    type: {method: 'get'}
    },

    // 根据category_path获取列表
    API_GET_LIST: {
        url: '/cms/contents/array',
        type: {method: 'get'}
    },

    //根据category_path提交
    API_PUSH_LIST: {
        url: '/cms/contents/new',
            type: {method: 'post'}
    },

    // 公司管理 获取列表
    API_GET_MANGECOMPANY_LIST: {
        url: '/company/company/array',
        type: {method: 'get'}
    },

    // 公司管理 获取详情
   API_GET_MANGECOMPANY_INFO: {
     url: '/company/company/info',
     type: {method: 'get'}
   },

    // 获取交易中心交易概况数据
    API_GET_TRADEINFO: {
        url: '/company/company/platform/tradeinfo',
        type: {method: 'get'}
    },

    // 交易中心 会员列表
   API_GET_MEMBER_LIST: {
     url: '/company/clubcard/list',
     type: {method: 'get'}
   },

    // 交易中心 会员添加
   API_ADD_MEMBER: {
     url: '/company/clubcard',
     type: {method: 'post'}
   },

    // 交易中心 会员编辑
    API_EDIT_MEMBER: {
        url: '/company/clubcard',
        type: {method: 'put'}
    },

    // 交易中心 会员移除(未提供)
    API_REMOVE_MEMBER: {
        url: '/company/clubcard',
        type: {method: 'put'}
    },

    // 销售人员 列表
    API_GET_SELLER_LIST: {
        url: '/company/seller/list',
        type: {method: 'get'}
    },

    // 销售人员 新增
    API_POST_ADD_SELLER: {
        url: '/company/seller',
        type: {method: 'post'}
    },

    // 上传图片
    API_UPLOAD_PIC: {
        url: '/upload/images',
        type: {method: 'post'}
    },

    // 账号管理 获取列表
    API_GET_PEOPLE_LIST: {
        url: '/company/staff/list',
        type: {method: 'get'}
    },

    // 获取添加工地选项列表
    API_GET_CONSTRUCTION_LIST: {
        url: '/cms/variant/qualifier/array',
        type: {method: 'get'}
    },

    // 获取案列详情下面的数据
    API_GET_CASE_DESIGN: {
        url: '/cms/contents/quality/array',
        type: {method: 'get'}
    },

    // 获取公司信息
    API_COMPANY_LIST: {
        url: '/company/company/info',
        type: {method: 'get'}
    },

    // 公司审核
    API_POST_AUDIT_STATUS: {
        url: '/company/company/audit',
        type: {method: 'post'}
    },

    // 删除接口
    API_DELETE: {
        url: '/cms/contents/delete',
        type: {method: 'get'}
    },

    // 编辑接口
    API_EDIT: {
        url: '/cms/contents/update',
        type: {method: 'post'}
    },

    // 获取案例方案质检接口
    API_GET_CASE_DETAIL: {
        url: '/cms/contents/quality/array',
            type: {method: 'get'}
    },

    // 提交案例方案质检接口
    API_PUSH_CASE_DETAIL: {
        url: '/cms/contents/quality/array',
        type: {method: 'post'}
    }
}
