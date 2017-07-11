import 'app/styles/home.styles'
import templateUrl from 'app/html/home.template'

const controller = class FtRegisterController {
  constructor ($log, $state, $location, $http, ftGameSettings, $window, $rootScope, appService) {
    'ngInject'
    this.service = appService
    this.settings = ftGameSettings
    this.$location = $location
    this.$window = $window
    this.$state = $state
    this.$http = $http
    this.loadTweets()
  //  $rootScope.$on(this.$location.$routeChangeStart, this.loadTweets())
    $log.log('ft-home is a go')
  }
  loadTweets () {
    let username = this.service.localStorageService.get('username')
    this.$http({
    method: 'GET',
    url: 'http://localhost:8080/user/users/@' + 'admin' + '/feed'
  }).then(this.successCallback = (response) => {
     this.tweets = []
     this.tweets = response.data
    // alert(JSON.stringify(this.tweets))
  }, this.errorCallback = (response) => {
    this.error = 'Username or password are incorrect, please try again.'
  })
  }
}
export const ftHome = {
  controller,
  templateUrl,
  controllerAs: 'home'
}
