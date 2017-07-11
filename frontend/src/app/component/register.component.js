import 'app/styles/register.styles'
import templateUrl from 'app/html/register.template'

const controller = class FtRegisterController {
  constructor ($log, $state, $location, $http, ftGameSettings, $window, $rootScope, appService) {
    'ngInject'
    this.service = appService
    this.settings = ftGameSettings
    this.$location = $location
    this.$window = $window
    this.$state = $state
    this.$http = $http
    // $rootScope.$on(this.$location.$routeChangeStart, this.checkAuth())
    $log.log('ft-register is a go')
  }
  registerSubmit () {

      this.$http({
        method: 'POST',
        url: 'http://localhost:8080/user/users',
         params: { firstName: this.firstname, lastName: this.lastname, phone: this.phone },
        data:
        {
          "credentials": {
            "password": this.password,
            "username": this.username
            },
            "profile": {
              "email": this.email,
            }
          }
        })
     .then((response) => {
       alert(JSON.stringify(response.data) + '3')
       if (response.status === 201) {
         alert('User Created!' + ' ' + '201')
       }
     })

  }
  checkUser () {
    this.$http({
      method: 'GET',
      url: 'http://localhost:8080/validate/username/available/@' + this.username + ''
    }).then(this.successCallback = (response) => {
      return true
    }, this.errorCallback = (response) => {
      this.error = 'Username or password are incorrect, please try again.'
    })
  }
}

export const ftRegister = {
  controller,
  templateUrl,
  controllerAs: 'register'
}
