import Main from '@/pages/main/index'
// 这是空的路由标签,为嵌套子路由使用
import RouterView from '@/pages/routerView/index'
import Login from '@/pages/login/index'
import Dashbord from '@/pages/dashbord/index'
// import Home from '@/pages/home/index'
// import homeIndex from '@/pages/home/components/rContent'
// import homeFault from '@/pages/home/homeFault'
// import faultTrip from '@/pages/home/faultComp/faultTrip'
// import faultCount from '@/pages/home/faultComp/faultCount'
// import faultDetail from '@/pages/home/faultComp/faultDetail'
// import faultCountInfo from '@/pages/home/faultComp/faultCountInfo'
// import ImageUpload from '@/pages/fileHandle/imageUpload'
// import Editor from '@/pages/fileHandle/editor'

export const basicRouters = [{
  path: '/',
  redirect: {
    name: 'login'
  }
},
// {
//   path: '/home',
//   component: Home,
//   children: [{
//     path: 'index',
//     name: 'home',
//     component: homeIndex,
//     meta: {
//       permissions: ['admin'],
//       name: '系统首页',
//       globalName: '',
//       icon: 'iconhome'
//     }
//   }, {
//     path: 'homeFault',
//     name: 'homeFault',
//     component: homeFault,
//     meta: {
//       permissions: ['admin'],
//       name: '电网事故',
//       icon: 'iconhome'
//     },
//     children: [{
//       path: 'faultTrip',
//       name: 'faultTrip',
//       component: faultTrip,
//       meta: {
//         permissions: ['admin'],
//         name: '事故跳闸',
//         icon: 'iconhome'
//       }
//     }, {
//       path: 'faultCount',
//       name: 'faultCount',
//       component: faultCount,
//       meta: {
//         permissions: ['admin'],
//         name: '故障统计',
//         icon: 'iconhome'
//       }
//     }, {
//       path: 'faultCountInfo',
//       name: 'faultCountInfo',
//       component: faultCountInfo,
//       meta: {
//         permissions: ['admin'],
//         name: '故障统计',
//         icon: 'iconhome'
//       }
//     }, {
//       path: 'faultDetail',
//       name: 'faultDetail',
//       component: faultDetail,
//       meta: {
//         permissions: ['admin'],
//         name: '故障明细',
//         icon: 'iconhome'
//       }
//     }]
//   }]
// },
{
  path: '/404',
  name: '404',
  component: () => import(/* webpackChunkName: "notfound" */'@/pages/errorPages/404')
}, {
  path: '/nopermission',
  name: 'nopermission',
  component: () => import(/* webpackChunkName: "noPermission" */'@/pages/errorPages/noPermission')
},
{
  path: '/register',
  name: 'register',
  component: () => import(/* webpackChunkName: "noPermission" */'@/pages/register/index')
},
{
  path: '/shareSnapshot',
  name: 'shareSnapshot',
  component: () => import(/* webpackChunkName: "noPermission" */'@/view/monitoringStation/shareSnapshot/index')
},
]

export const syncRouters = [{
  path: '/view',
  name: 'main',
  component: Main,
  children: [
    {
      path: 'projectManag',
      name: 'projectManag',
      component: RouterView,
      meta: {
        permissions: ["admin"],
        name: '项目管理',
        icon: 'iconshujuweihu',
        globalName: 'projectManag'
      },
      children: [{
        path: 'eleprijsecMan',
        name: 'eleprijsecMan',
        component: () => import('@/view/projectManag/eleprijsecMan/index'),
        meta: {
          permissions: ["admin"],
          name: '项目管理',
          globalName: 'eleprijsecMan'
        }
      },
      {
        path: 'menuManage',
        name: 'menuManage',
        component: () => import('@/view/projectManag/menuManage/index'),
        meta: {
          permissions: ["admin"],
          name: '项目维护',
          globalName: 'menuManage'
        }
      }
    ]
    },
    {
      path: 'codeCoverage',
      name: 'codeCoverage',
      component: RouterView,
      meta: {
        permissions: ["admin"],
        name: '动态代码覆盖率',
        icon: 'icontongjifenxi',
        globalName: 'codeCoverage'
      },
      children: [
        {
          path: 'codeCoverageint',
          name: 'codeCoverageint',
          component: () => import('@/view/codeCoverage/codeCoverageint/index'),
          meta: {
            permissions: ["admin"],
            name: '接口覆盖率',
            globalName: 'codeCoverageint'
          }
        },
        {
          path: 'allcodeCoverage',
          name: 'allcodeCoverage',
          component: () => import('@/view/codeCoverage/allcodeCoverage/index'),
          meta: {
            permissions: ["admin"],
            name: '总体覆盖率',
            globalName: 'allcodeCoverage'
          }
        },
        {
          path: 'addcodeCoverage',
          name: 'addcodeCoverage',
          component: () => import('@/view/codeCoverage/addcodeCoverage/index'),
          meta: {
            permissions: ["admin"],
            name: '增量覆盖率',
            globalName: 'addcodeCoverage'
          }
        }
      ]
    },
    {
      path: 'monitoringStation',
      name: 'monitoringStation',
      component: RouterView,
      meta: {
        permissions: ["admin"],
        name: '监控台',
        icon: 'icon-supervision-full',
        globalName: 'monitoring'
      },
      children: [
        {
          path: 'monitoringStation',
          name: 'monitoringStation',
          component: () => import('@/view/monitoringStation/realTimeMonitoring/index'),
          meta: {
            permissions: ["admin"],
            name: '实时监控',
            globalName: 'monitoringStation'
          }
        },
        {
          path: 'mySnapshot',
          name: 'mySnapshot',
          component: () => import('@/view/monitoringStation/mySnapshot/index'),
          meta: {
            permissions: ["admin"],
            name: '我的快照',
            globalName: 'mySnapshot'
          }
        }
      ]
    },
    {
      path: 'applicationCenter',
      name: 'applicationCenter',
      component: RouterView,
      meta: {
        permissions: ["admin"],
        name: '应用中心',
        icon: 'icon-yingyong',
        globalName: 'applicationCenter'
      },
      children: [
        {
          path: 'versionCenter',
          name: 'versionCenter',
          component: RouterView,
          meta: {
            permissions: ["admin"],
            name: '版本中心',
            globalName: 'versionCenter'
          },
          children: [
            {
              path: 'versionList',
              name: 'versionList',
              component: () => import('@/view/applicationCenter/versionCenter/versionList/index'),
              meta: {
                permissions: ["admin"],
                name: '版本列表',
                globalName: 'versionList'
              },
            },
            {
              path: 'reportList',
              name: 'reportList',
              component: () => import('@/view/applicationCenter/versionCenter/reportList/index'),
              meta: {
                permissions: ["admin"],
                name: '报告列表',
                globalName: 'reportList'
              },
            },
            {
              path: 'versionComparison',
              name: 'versionComparison',
              component: () => import('@/view/applicationCenter/versionCenter/versionComparison/index'),
              meta: {
                permissions: ["admin"],
                name: '版本对比',
                globalName: 'versionComparison'
              },
            }
          ]
        },
        {
          path: 'sysSnapshot',
          name: 'sysSnapshot',
          component: () => import('@/view/applicationCenter/sysSnapshot/sysSnapshotfil/index'),
          meta: {
            permissions: ["admin"],
            name: '系统快照',
            globalName: 'sysSnapshot'
          }
        },
      ]
    }

  //   {
  //   path: 'datamaintenance',
  //   name: 'datamaintenance',
  //   component: RouterView,
  //   meta: {
  //     permissions: ['admin'],
  //     name: '数据维护',
  //     globalName: 'datamaintenance',
  //     icon: 'iconshujuweihu'
  //   },
  //   children: [
  //     {
  //     path: 'electmaintenance',
  //     name: 'electmaintenance',
  //     component: () => import(/* webpackChunkName: "electmaintenance" */'@/pages/dataMaintenance/electMaintenance/index'),
  //     meta: {
  //       permissions: ['admin'],
  //       name: '电量数据维护',
  //       globalName: 'electmaintenance'
  //     }
  //     // children: [{
  //     //   path: 'dispatchdaymaintence',
  //     //   name: 'dispatchdaymaintence',
  //     //   component: () => import(/* webpackChunkName: "dispatchDayMaintenance" */'@/pages/dataMaintenance/electMaintenance/dispatchDayMaintenance/index'),
  //     //   meta: {
  //     //     permissions: ['admin'],
  //     //     name: '调度日电量维护'
  //     //   }
  //     // }, {
  //     //   path: 'sidesupplement',
  //     //   name: 'sidesupplement',
  //     //   component: () => import(/* webpackChunkName: "sideSupplement" */'@/pages/dataMaintenance/electMaintenance/sideSupplement/index'),
  //     //   meta: {
  //     //     permissions: ['admin'],
  //     //     name: '旁代补电量维护'
  //     //   }
  //     // }]
  //   }, {
  //     path: 'overhaulmaintenance',
  //     name: 'overhaulmaintenance',
  //     component: () => import(/* webpackChunkName: "overhaulmaintenance" */'@/pages/dataMaintenance/overhaulmaintenance/index'),
  //     meta: {
  //       permissions: ['admin'],
  //       name: '电网检修数据维护',
  //       globalName: 'overhaulmaintenance'
  //     }
  //   }, {
  //     path: 'othermaintenance',
  //     name: 'othermaintenance',
  //     component: Dashbord,
  //     meta: {
  //       permissions: ['admin'],
  //       name: '其他数据维护',
  //       globalName: 'othermaintenance'
  //     }
  //   }]
  // },
  // {
  //   path: 'statisticalanalysis',
  //   name: 'statisticalanalysis',
  //   component: RouterView,
  //   meta: {
  //     permissions: ['admin'],
  //     name: '统计分析',
  //     icon: 'icontongjifenxi',
  //     globalName: 'statisticalanalysis'
  //   },
  //   children: [{
  //     path: 'powersupply',
  //     name: 'powersupply',
  //     component: () => import(/* webpackChunkName: "powersupply" */'@/pages/statisticalanalysis/powersupply/index'),
  //     meta: {
  //       permissions: ['admin'],
  //       name: '供用电情况',
  //       globalName: 'powersupply'
  //     }
  //     // children: [{
  //     //   path: 'dailyLoadElectricity',
  //     //   name: 'dailyLoadElectricity',
  //     //   component: () => import(/* webpackChunkName: "dailyLoadElectricity" */'@/pages/statisticalanalysis/powersupply/dailyLoadElectricity/index'),
  //     //   meta: {
  //     //     permissions: ['admin'],
  //     //     name: '每日调度负荷电量'
  //     //   }
  //     // }, {
  //     //   path: 'monthlyreportform',
  //     //   name: 'monthlyreportform',
  //     //   component: () => import(/* webpackChunkName: "monthlyreportform" */'@/pages/statisticalanalysis/powersupply/monthlyReportform/index'),
  //     //   meta: {
  //     //     permissions: ['admin'],
  //     //     name: '调度负荷电量月报表'
  //     //   }
  //     // }, {
  //     //   path: 'quarterreportform',
  //     //   name: 'quarterreportform',
  //     //   component: () => import(/* webpackChunkName: "quarterreportform" */'@/pages/statisticalanalysis/powersupply/quarterReportform/index'),
  //     //   meta: {
  //     //     permissions: ['admin'],
  //     //     name: '负荷电量季报表'
  //     //   }
  //     // }, {
  //     //   path: 'monthlyanalysis',
  //     //   name: 'monthlyanalysis',
  //     //   component: () => import(/* webpackChunkName: "monthlyanalysis" */'@/pages/statisticalanalysis/powersupply/monthlyAnalysis/index'),
  //     //   meta: {
  //     //     permissions: ['admin'],
  //     //     name: '负荷电量月度分析'
  //     //   }
  //     // }, {
  //     //   path: 'yearlysummary',
  //     //   name: 'yearlysummary',
  //     //   component: () => import(/* webpackChunkName: "yearlysummary" */'@/pages/statisticalanalysis/powersupply/yearlySummary/index'),
  //     //   meta: {
  //     //     permissions: ['admin'],
  //     //     name: '年度调度供用电情况汇总'
  //     //   }
  //     // }, {
  //     //   path: 'pangbudaielect',
  //     //   name: 'pangbudaielect',
  //     //   component: () => import(/* webpackChunkName: "pangbudaielect" */'@/pages/statisticalanalysis/powersupply/pangBuDaiElect/index'),
  //     //   meta: {
  //     //     permissions: ['admin'],
  //     //     name: '旁补代电量'
  //     //   }
  //     // }]
  //   }, {
  //     path: 'oiltemperature',
  //     name: 'oiltemperature',
  //     component: () => import(/* webpackChunkName: "oiltemperature" */'@/pages/statisticalanalysis/oilTemperature/index'),
  //     meta: {
  //       permissions: ['admin'],
  //       name: '主变负荷油温',
  //       globalName: 'oiltemperature'
  //     }
  //   }, {
  //     path: 'limitcount',
  //     name: 'limitcount',
  //     component: () => import(/* webpackChunkName: "limitcount" */'@/pages/statisticalanalysis/limitCount/index'),
  //     meta: {
  //       permissions: ['admin'],
  //       name: '越限情况统计',
  //       globalName: 'limitcount'
  //     }
  //   }, {
  //     path: 'overweight',
  //     name: 'overweight',
  //     component: () => import(/* webpackChunkName: "overweight" */'@/pages/statisticalanalysis/overWeight/index'),
  //     meta: {
  //       permissions: ['admin'],
  //       name: '设备超重载情况',
  //       globalName: 'overweight'
  //     }
  //     // children: [{
  //     //   path: 'countanalyse',
  //     //   name: 'countanalyse',
  //     //   component: () => import(/* webpackChunkName: "countanalyse" */'@/pages/statisticalanalysis/overWeight/countAnalyse/index'),
  //     //   meta: {
  //     //     permissions: ['admin'],
  //     //     name: '统计分析'
  //     //   }
  //     // }, {
  //     //   path: 'compquery',
  //     //   name: 'compquery',
  //     //   component: () => import(/* webpackChunkName: "compquery" */'@/pages/statisticalanalysis/overWeight/compQuery/index'),
  //     //   meta: {
  //     //     permissions: ['admin'],
  //     //     name: '综合查询'
  //     //   }
  //     // }]
  //   }, {
  //     path: 'gridtrip',
  //     name: 'gridtrip',
  //     component: () => import(/* webpackChunkName: "gridtrip" */'@/pages/statisticalanalysis/gridTrip/index'),
  //     meta: {
  //       permissions: ['admin'],
  //       name: '电网跳闸情况',
  //       globalName: 'gridtrip'
  //     }
  //     // children: [{
  //     //   path: 'gtcountanalyse',
  //     //   name: 'gtcountanalyse',
  //     //   component: () => import(/* webpackChunkName: "gtcountanalyse" */'@/pages/statisticalanalysis/gridTrip/countAnalyse/index'),
  //     //   meta: {
  //     //     permissions: ['admin'],
  //     //     name: '统计分析'
  //     //   }
  //     // }, {
  //     //   path: 'gtcompquery',
  //     //   name: 'gtcompquery',
  //     //   component: () => import(/* webpackChunkName: "gtcompquery" */'@/pages/statisticalanalysis/gridTrip/compQuery/index'),
  //     //   meta: {
  //     //     permissions: ['admin'],
  //     //     name: '综合查询'
  //     //   }
  //     // }, {
  //     //   path: 'opening',
  //     //   name: 'opening',
  //     //   component: () => import(/* webpackChunkName: "opening" */'@/pages/statisticalanalysis/gridTrip/opening/index'),
  //     //   meta: {
  //     //     permissions: ['admin'],
  //     //     name: '事故分闸'
  //     //   }
  //     // }]
  //   }, {
  //     path: 'powergrid',
  //     name: 'powergrid',
  //     component: () => import(/* webpackChunkName: "powergrid" */'@/pages/statisticalanalysis/powerGrid/index'),
  //     meta: {
  //       permissions: ['admin'],
  //       name: '电网检修情况',
  //       globalName: 'powergrid'
  //     }
  //   }, {
  //     path: 'riskwarning',
  //     name: 'riskwarning',
  //     component: () => import(/* webpackChunkName: "riskwarning" */'@/pages/statisticalanalysis/riskWarning/index'),
  //     meta: {
  //       permissions: ['admin'],
  //       name: '电网风险预警',
  //       globalName: 'riskwarning'
  //     }
  //   }, {
  //     path: 'extra',
  //     name: 'extra',
  //     component: Dashbord,
  //     meta: {
  //       permissions: ['admin'],
  //       name: '其他',
  //       globalName: 'extra'
  //     }
  //   }]
  // }, {
  //   path: 'outputreport',
  //   name: 'outputreport',
  //   component: RouterView,
  //   meta: {
  //     permissions: ['admin'],
  //     name: '输出报表',
  //     globalName: 'outputreport',
  //     icon: 'iconbaobiaoguanli'
  //   },
  //   children: [{
  //     path: 'dailyreport',
  //     name: 'dailyreport',
  //     component: () => import(/* webpackChunkName: "dailyreport" */'@/pages/exportReport/dailyReport/index'),
  //     meta: {
  //       permissions: ['admin'],
  //       globalName: 'dailyreport',
  //       name: '调度日报'
  //     }
  //   }, {
  //     path: 'weeklyreport',
  //     name: 'weeklyreport',
  //     component: () => import(/* webpackChunkName: "weeklyreport" */'@/pages/exportReport/weeklyReport/index'),
  //     meta: {
  //       permissions: ['admin'],
  //       globalName: 'weeklyreport',
  //       name: '调度周报'
  //     }
  //   }, {
  //     path: 'spendsummer',
  //     name: 'spendsummer',
  //     component: () => import(/* webpackChunkName: "spendsummer" */'@/pages/exportReport/spendSummer/index'),
  //     meta: {
  //       permissions: ['admin'],
  //       globalName: 'spendsummer',
  //       name: '迎峰度夏日报'
  //     }
  //   }]
  // },
]
}, {
  path: '/login',
  name: 'login',
  component: Login
}
// {
//   name:'register',
//   path: '/register',
//   component: () => import('@/pages/register/index'),
//   hidden: true
// }
]

export const asyncRouters = []
