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
    url: 'http://localhost:8080/users/@' + this.username + ''
    })

    
  }
}


export const ftUserSettings = {
  controller,
  templateUrl,
  controllerAs: 'usersettings'
}
