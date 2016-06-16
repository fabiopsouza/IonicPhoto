angular.module('starter', ['ionic', 'ngCordova'])

.config(function ($ionicConfigProvider){
  $ionicConfigProvider.tabs.position('bottom');
})

.directive('filterBar', function(){
  return {
    restrict: 'E',
    templateUrl: 'components/filter-bar.html'
  };
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    if(window.cordova && window.cordova.plugins.Keyboard) {

      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }

    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

  });
})

.controller('HomeController', function($scope, FileUtil, $ionicModal){

  ionic.Platform.ready(function(){
    FileUtil.load();
    $scope.images = FileUtil.images;
  });

  $ionicModal.fromTemplateUrl("image-modal.html", {
    scope: $scope,
    animation: 'slide-in-up',
  }).then(function(modal){
    $scope.modal = modal;
  });

  $scope.showModal = function(image){
    $scope.imageModal = image;
    $scope.modal.show();
  }

  $scope.closeModal = function(){
    $scope.modal.hide();
  }  

})

.controller('CameraController', function($scope, ImageUtil, FileUtil, $ionicTabsDelegate){

  $scope.onTabSelect = function onTabSelect(){

    $scope.imageCamera = undefined;

    ImageUtil.getImage(ImageUtil.cameraOptions.CAMERA,
      function(imageData){
        $scope.imageCamera = "data:image/jpeg;base64," + imageData;
        ImageUtil.filterImage("imgCamera", 0);
      }, 
      function(err){
        console.log(err);
        $ionicTabsDelegate.select(0);
      });
  }

  $scope.onFilter = function(option){
    ImageUtil.filterImage("imgCamera", option);
  }

  $scope.onSave = function(){
    var canvas = document.getElementById("imgCamera");
    var dataUrl = canvas.toDataURL();
    FileUtil.save(dataUrl);
    $ionicTabsDelegate.select(0);
  }
})

.controller('GaleriaController', function($scope, ImageUtil, FileUtil){

  $scope.onTabSelect = function onTabSelect(){

    $scope.imageGallery = undefined;

    ImageUtil.getImage(ImageUtil.cameraOptions.GALLERY,
      function(imageData){
        $scope.imageGallery = "data:image/jpeg;base64," + imageData;
        ImageUtil.filterImage("imgGallery", 0);
      }, 
      function(err){
        console.log(err);
        $ionicTabsDelegate.select(0);
      });
  }

  $scope.onFilter = function(option){
    ImageUtil.filterImage("imgGallery", option);
  }

  $scope.onSave = function(){
    var canvas = document.getElementById("imgGallery");
    var dataUrl = canvas.toDataURL();
    FileUtil.save(dataUrl);
    $ionicTabsDelegate.select(0);
  }
})