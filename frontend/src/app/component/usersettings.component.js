import 'app/styles/usersettings.styles'
import templateUrl from 'app/html/usersettings.template'

const controller = class FtUserSettingsController {
  constructor ($log, $state, $location, $http, ftGameSettings, $window, $rootScope, appService) {
    'ngInject'
    this.service = appService
    this.settings = ftGameSettings
    this.$location = $location
    this.$window = $window
    this.$state = $state
    this.$http = $http
    // $rootScope.$on(this.$location.$routeChangeStart, this.checkAuth())
    $log.log('ft-usersettings is a go')
  }

updateUser(){
  this.$http({
    method: 'PUT',
    url: 'http://localhost:8080/users/@' + this.username + '',
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
}

checkUser () {
  this.$http({
    method: 'GET',
    url: 'http://localhost:8181/validate/username/available/@' + this.username + ''
  }).then(this.successCallback = (response) => {
    return true
  }, this.errorCallback = (response) => {
    this.error = 'Username or password are incorrect, please try again.'
  })
}
}
export const ftUserSettings = {
  controller,
  templateUrl,
  controllerAs: 'usersettings'
}
