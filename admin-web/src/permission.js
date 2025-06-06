import router from './router'


const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  let islogin = sessionStorage.getItem('islogin')
  let id = sessionStorage.getItem('id')

  if (to.path.includes('/admin') || to.path == "/admin/login") {
    // console.log('后台');
    if (islogin == null && to.path == '/admin/login') {
      next()
    } else if (islogin == null && to.path !== '/admin/login') {
      next('/admin/login')
    } else if (islogin != null && to.path == '/admin/login') {
      next('/admin')
    } else {
      next()
    }
  }

})

router.afterEach(() => {
})
