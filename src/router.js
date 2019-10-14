/*
 * @Description: 
 * @Author: xwl
 * @Date: 2019-05-29 13:06:44
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-10-04 15:11:21
 */
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: "/",
			redirect: {
				name: "index"
			}
		},
		//首页
		{
			path: "/index",
			name: "index",
			component: () =>
				import(/* webpackChunkName: "index" */ "./views/index/Index.vue")
		},
		//聊天页面
		{
			path: "/chat",
			name: "chat",
			component: () =>
				import(/* webpackChunkName: "index" */ "./views/index/Chat.vue")
		},
		//红包领取记录页面
		{
			path: "/red/list",
			name: "redList",
			component: () =>
				import(/* webpackChunkName: "index" */ "./views/index/component/RedList.vue")
		},
		//视频播放页面
		{
			path: "/video/play",
			name: "videoPlay",
			component: () =>
				import(/* webpackChunkName: "index" */ "./views/index/component/VideoPlay.vue")
		},

		//游戏大厅
		{
			path: "/games",
			name: "games",
			component: () =>
				import(/* webpackChunkName: "games" */ "./views/games/Games.vue")
		},
		//额度转换
		{
			path: "/transfer",
			name: "transfer",
			meta: {
				auth: true
			},
			component: () =>
				import(/* webpackChunkName: "transfer" */ "./views/transfer/Transfer.vue")
		},
		//我的
		{
			path: "/my",
			name: "my",
			component: () =>
				import(/* webpackChunkName: "my" */ "./views/my/My.vue")
		},
		//个人资料
		{
			path: "/about",
			name: "about",
			component: () =>
				import(/* webpackChunkName: "my" */ "./views/my/about/About.vue")
		},
		{
			path: "/set",
			name: "set",
			component: () =>
				import(/* webpackChunkName: "my" */ "./views/my/setting/Set.vue")
		},
		//登录
		{
			path: "/login",
			name: "login",
			component: () =>
				import(/* webpackChunkName: "auth" */ "./views/auth/Login.vue")
        },
        //注册
		{
			path: "/register",
			name: "register",
			component: () =>
				import(/* webpackChunkName: "auth" */ "./views/auth/Register.vue")
        },
        //忘记密码
        {
			path: "/contactus",
			name: "contactus",
			component: () =>
				import(/* webpackChunkName: "auth" */ "./views/auth/ContactUs.vue")
        },
		//存款
		{
			path: "/deposit",
			name: "deposit",
			meta: {
				auth: true
			},
			component: () =>
				import(/* webpackChunkName: "deposits" */ "./views/deposit/Deposit.vue")
		},
		//存款-线上入款-网银/支付宝/微信
		{
			path: "/deposit/online",
			name: "online",
			meta: {
				auth: true
			},
			component: () =>
				import(/* webpackChunkName: "onlineAlipay" */ "./views/deposit/DepositOnline.vue")
		},
		//存款-公司存款-有无二维码
		{
			path: "/deposit/company",
			name: "company",
			meta: {
				auth: true
			},
			component: () =>
				import(/* webpackChunkName: "companyAlipay" */ "./views/deposit/DepositCompany.vue")
		},

		//存款-线上入款/公司存款-支付返回结果页
		{
			path: "/deposit/payResult",
			name: "payResult",
			meta: {
				auth: true
			},
			component: () =>
				import(/* webpackChunkName: "payResult" */ "./views/deposit/DepositPayResult.vue")
		},
		//存款-线上入款/公司存款-支付成功页
		{
			path: "/deposit/paySuccess",
			name: "paySuccess",
			meta: {
				auth: true
			},
			component: () =>
				import(/* webpackChunkName: "paySuccess" */ "./views/deposit/DepositPaySuccess.vue")
		},
		//取款
		{
			path: "/withdraw",
			name: "withdraw",
			meta: {
				auth: true
			},
			component: () =>
				import(/* webpackChunkName: "withdraw" */ "./views/withdraw/Withdraw.vue")
		},
		//取款-稽核
		{
			path: "/withdraw/audit",
			name: "withdrawAudit",
			meta: {
				auth: true
			},
			component: () =>
				import(/* webpackChunkName: "withdrawAudit" */ "./views/withdraw/WithdrawAudit.vue")
		},
		//取款-成功
		{
			path: "/withdraw/success",
			name: "withdrawSuccess",
			meta: {
				auth: true
			},
			component: () =>
				import(/* webpackChunkName: "withdrawSuccess" */ "./views/withdraw/WithdrawSuccess.vue")
		},

		//存款记录
		{
			path: "/record/deposit",
			name: "depositRecord",
			meta: {
				auth: true
			},
			component: () =>
				import(/* webpackChunkName: "record" */ "./views/my/Record/DepositRecord.vue")
		},
		//取款记录
		{
			path: "/record/withdraw",
			name: "withdrawRecord",
			meta: {
				auth: true
			},
			component: () =>
				import(/* webpackChunkName: "record" */ "./views/my/Record/WithdrawRecord.vue")
		},

		//额度转换记录
		{
			path: "/record/transfer",
			name: "transferRecord",
			meta: {
				auth: true
			},
			component: () =>
				import(/* webpackChunkName: "record" */ "./views/my/Record/TransferRecord.vue")
		},
		
		//现金流水
		{
			path: "/record/capital",
			name: "capitalRecord",
			meta: {
				auth: true
			},
			component: () =>
				import(/* webpackChunkName: "record" */ "./views/my/Record/CapitalRecord.vue")
		},
		
		//投注记录
		{
			path: "/record/bet",
			name: "betRecord",
			meta: {
				auth: true
			},
			component: () =>
				import(/* webpackChunkName: "record" */ "./views/my/Record/BetRecord.vue")
		},
		//投注记录--我的报表
		{
			path: "/record/betDeatil",
			name: "detailRecord",
			meta: {
				auth: true
			},
			component: () =>
				import(/* webpackChunkName: "record" */ "./views/my/Record/DetailRecord.vue")
		},
		

		//发现
		{
			path: "/discover",
			name: "discover",
			component: () =>
				import(/* webpackChunkName: "discover" */ "./views/discover/Discover.vue")
		},
		//活动
		{
			path: "/activity",
			name: "activity",
			component: () =>
				import(/* webpackChunkName: "activity" */ "./views/discover/activity/Activity.vue")
		},
		//活动详情
		{
			path: "/actDetail",
			name: "actDetail",
			component: () =>
				import(/* webpackChunkName: "activity" */ "./views/discover/activity/ActDetail.vue")
		},
		//活动领取记录
		{
			path: "/activityRecord",
			name: "activityRecord",
			component: () =>
				import(/* webpackChunkName: "activity" */ "./views/discover/activity/ActivityRecord.vue")
		},
		//幸运大转盘
		{
			path: "/luckdraw",
			name: "luckdraw",
			meta: { auth: true },
			component: () =>
				import(/* webpackChunkName: "activity" */ "./views/discover/activity/Luckdraw.vue")
		},

		/*自助优惠申请*/
		{
			path: "/selfhelp",
			name: "selfHelp",
			component: () =>
				import(/* webpackChunkName: "selfhelp" */ "./views/discover/selfHelp/SelfHelp.vue")
		},
		{
			path: "/selfDetail",
			name: "selfDetail",
			component: () =>
				import(/* webpackChunkName: "selfhelp" */ "./views/discover/selfHelp/SelfDetail.vue")
		},
		{
			path: "/selfmore",
			name: "selfmore",
			component: () =>
				import(/* webpackChunkName: "selfhelp" */ "./views/discover/selfHelp/Selfmore.vue")
		},

		{
			path: '/bankCard',
			name: 'bankCard',
			meta: { auth: true },
			component: () => import( /* webpackChunkName: "my" */ './views/my/bankCard/BankCard.vue'),
			children: []
		},//银行卡管理
		{
			path: '/bankAdd',
			name: 'bankAdd',
			meta: { auth: true },
			component: () => import( /* webpackChunkName: "my" */ './views/my/bankCard/BankAdd.vue'),
		},//添加银行卡

		
		{
			path: "/betInformation",
			name: "betInformation",
			component: () =>
				import(/* webpackChunkName: "intergral" */ "./views/my/betInformation/BetInformation.vue")
		},// 投注资讯

		
		{
			path: "/auditQuery",
			name: "auditQuery",
			component: () =>
				import(/* webpackChunkName: "my" */ "./views/my/auditQuery/AuditQuery.vue")
		},//及时稽核查询

		
		{
			path: "/backwater",
			name: "backwater",
			// meta: { auth: true },
			component: () =>
				import(/* webpackChunkName: "selfhelp" */ "./views/my/backwater/Backwater.vue")
		},/** 自主返水*/

		{
			path: '/ranking',
			name: 'ranking',
			meta: { auth: true },
			component: () => import( /* webpackChunkName: "my" */ './views/discover/ranking/Ranking.vue'),
		},//排行榜

		{
			path: '/myFocus',
			name: 'myFocus',
			meta: { auth: true },
			component: () => import( /* webpackChunkName: "my" */ './views/discover/myFocus/MyFocus.vue'),
		},
		{
			path: '/focusInfo',
			name: 'focusInfo',
			meta: { auth: true },
			component: () => import( /* webpackChunkName: "my" */ './views/discover/myFocus/FocusInfo.vue'),
		},
        
        /* 安全中心 */
        {
            path: "/securityCenter",
            name: "securityCenter",
            component: () =>
                import(/* webpackChunkName: "securityCenter" */ "./views/my/securityCenter/SecurityCenter.vue")
        },
        {
            path: "/securityCenter/EditLoginpwd",
            name: "editLoginpwd",
            component: () =>
                import(/* webpackChunkName: "securityCenter" */ "./views/my/securityCenter/EditLoginpwd.vue")
        },
        {
            path: "/securityCenter/securitypwd",
            name: "securitypwd",
            component: () =>
                import(/* webpackChunkName: "securityCenter" */ "./views/my/securityCenter/Securitypwd.vue")
        },
        {
            path: "/securityCenter/videopwd",
            name: "videopwd",
            component: () =>
                import(/* webpackChunkName: "securityCenter" */ "./views/my/securityCenter/Videopwd.vue")
        },
        // {
        //     path: "/securityCenter/bankcardAdd",
        //     name: "bankcardList",
        //     component: () =>
        //         import(/* webpackChunkName: "bank" */ "./views/my/securityCenter/AddBankcard.vue")
        // },
        // {
        //     path: "/securityCenter/bankcard",
        //     name: "bankcard",
        //     component: () =>
        //         import(/* webpackChunkName: "bank" */ "./views/my/securityCenter/Bankcard.vue")
        // },
        // 会员积分
        {
            path: "/intergral",
            name: "intergral",
            component: () =>
                import(/* webpackChunkName: "intergral" */ "./views/my/intergral/intergral.vue")
        },
        //积分等级制度
        {
            path: "/intergral/intergRule",
            name: "intergRule",
            component: () =>
                import(/* webpackChunkName: "intergral" */ "./views/my/intergral/intergRule.vue")
        },
        //积分明细
        {
            path: "/intergral/intergDeta",
            name: "intergDeta",
            component: () =>
                import(/* webpackChunkName: "intergral" */ "./views/my/intergral/intergDetailed.vue")
        },
        /* 我要推广 */
        {
            path: "/spread",
            name: "spread",
            component: () =>
                import(/* webpackChunkName: "spread" */ "./views/my/spread/Spread.vue")
        },
        //下级报表
        {
            path: "/spread/subordinate",
            name: "subordinate",
            component: () =>
                import(/* webpackChunkName: "spread" */ "./views/my/spread/Subordinate.vue")
        },
        //推广说明
        {
            path: "/spread/promote",
            name: "promote",
            component: () =>
                import(/* webpackChunkName: "spread" */ "./views/my/spread/Promote.vue")
        },
        //推广链接
        {
            path: "/spread/generalizeLink",
            name: "generalizeLink",
            component: () =>
                import(/* webpackChunkName: "spread" */ "./views/my/spread/GeneralizeLink.vue")
        },
        //推广统计
        {
            path: "/spread/statisics",
            name: "statisics",
            component: () =>
                import(/* webpackChunkName: "spread" */ "./views/my/spread/Statisics.vue")
        },
        //下级会员管理
        {
            path: "/spread/memberManagement",
            name: "memberManagement",
            component: () =>
                import(/* webpackChunkName: "spread" */ "./views/my/spread/MemberManagement.vue")
        },
        //我要推广页
        {
            path: "/spread/toprompt",
            name: "toprompt",
            component: () =>
                import(/* webpackChunkName: "spread" */ "./views/my/spread/Toprompt.vue")
        },
         //----------添加群聊
        {
            path: "/addChat",
            name: "addChat",
            component: () =>
                import(/* webpackChunkName: "spread" */ "./views/index/AddChat.vue")
        },
        //------群详情
        {
            path: "/chatInfo",
            name: "chatInfo",
            component: () =>
                import(/* webpackChunkName: "spread" */ "./views/index/ChatInfo.vue")
        },
         //------游戏进入聊天室列表
         {
            path: "/chatList",
            name: "chatList",
            component: () =>
                import(/* webpackChunkName: "spread" */ "./views/index/ChatList.vue")
        },
        //------搜索聊天室列表
        {
            path: "/searchChat",
            name: "searchChat",
            component: () =>
                import(/* webpackChunkName: "spread" */ "./views/index/SearchChat.vue")
        },
        
        //消息页
        {
            path: "/message/moremsg",
            name: "moremsg",
            component: () =>
                import(/* webpackChunkName: "messages" */ "./views/my/messages/MoreMsg.vue")
        },
        {
            path: "/message/detailMsg",
            name: "detailMsg",
            component: () =>
                import(/* webpackChunkName: "messages" */ "./views/my/messages/DetailMsg.vue")
        },
        {
            path: "/questionnaire",
            name: "questionnaire",
            component: () =>
                import(/* webpackChunkName: "inbox" */ "./views/my/messages/questionnaire/Questionnaire.vue")
        },
	]
});
