import 'app/styles/login.styles'
import templateUrl from 'app/html/login.template'

const controller = class FtLoginController {
  constructor ($log, $state, $location, $http, ftGameSettings, $window, $rootScope, appService) {
    'ngInject'
    this.service = appService
    this.settings = ftGameSettings
    this.$location = $location
    this.$window = $window
    this.$state = $state
    this.$http = $http
    $rootScope.$on(this.$location.$routeChangeStart, this.checkAuth())
    $log.log('ft-login is a go')
  }
  checkAuth () {
    if (this.service.localStorageService.get('isAuthenticated') !== null) {
      this.settings.userInfo.isAuthenticated = true
      this.$state.transitionTo('game')
    }
    let userAuthenticated = this.settings.userInfo.isAuthenticated
    if (userAuthenticated === false) {
      this.$state.transitionTo('login')
    } else {
      this.$state.transitionTo('body')
    }
  }
  loginSubmit () {
    this.$http({
      method: 'POST',
      url: 'http://localhost:8080/user/users/validate/user',
      data: {credentials: { password: this.password, username: this.username }}
    }).then(this.successCallback = (response) => {
      let user = response.data.username
      if (user === this.username)
      this.$state.transitionTo('home')
    }, this.errorCallback = (response) => {
      this.error = 'Username or password are incorrect, please try again.'
    })
  }
  registerSubmit () {

      this.$http({
        method: 'POST',
        url: 'http://localhost:8080/user/users',
         params: { firstName: this.firstname, lastName: this.lastname, phone: this.phone },
        data:
        {
          "credentials": {
            "password": this.regpassword,
            "username": this.regusername
            },
            "profile": {
              "email": this.email
            }
          }
        })
     .then((response) => {
       alert(JSON.stringify(response.data) + '3')
       if (response.status === 201) {
         this.$state.transitionTo('home')
         //alert('User Created!' + ' ' + '201')
       }
     })

  }
  checkUser () {
    this.$http({
      method: 'GET',
      url: 'http://localhost:8080/validate/username/available/@' + this.regusername + ''
    }).then(this.successCallback = (response) => {
      return true
    }, this.errorCallback = (response) => {
      this.error = 'Username or password are incorrect, please try again.'
    })
  }
}
export const ftLogin = {
  controller,
  templateUrl,
  controllerAs: 'login'
}
