var crownShop = angular.module("crownShop", ["ngRoute", "ngCart"]);


//CONFIG
crownShop.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/', {
        title: 'Welcome To Crownshop',
        templateUrl: 'views/home.html',
        controller: 'homeController'
    })
    .when('/shop-departments', {
        title: 'Shop Departments',
        templateUrl: 'views/shopDept.html',
        controller: 'shopDeptController'
    })
    .when('/shop-category/:id/:cat', {
        title: 'Shop Category',
        templateUrl: 'views/shopCategory.html',
        controller: 'shopCategoryController'
    })
    .when('/products/:id/:catname', {
        title: 'Shop Products',
        templateUrl: 'views/products.html',
        controller: 'productsController'
    })
    .when('/product/:id', {
        title: 'Products Details',
        templateUrl: 'views/productDetail.html',
        controller: 'productDetailController'
    })
    .when('/cart', {
        title: 'Cart Summary',
        templateUrl: 'views/viewCart.html',
        controller: 'viewCartController'
    })
    .when('/contact', {
        title: 'Contact Us',
        templateUrl: 'views/contact.html',
        controller: 'contactController'
    })
    .otherwise({
        redirectTo: "/"
    })
}]);


//RUN
crownShop.run(['$rootScope', '$route', function($rootScope, $route) {
    $rootScope.$on('$routeChangeSuccess', function() {
        document.title = $route.current.title;
    });
}]);



//DIRECTIVES
crownShop.directive('navBar', function() {
    return {
        restrict: 'E',
        link: function(scope, elem, attr) {
            var pull = $(elem).find("#pul");
            var menu = $(elem).find("ul");
            var searchPul = $(elem).find("#search-pillDown");
            var serchTextBox = $(elem).find("#searchSites");
            var navLinks = $(elem).find(".site-navigation ul li a");
            
            $(pull).on("click", function(e) {
                menu.slideToggle();
            });
            
            $(window).resize(function() {
                var w = $(window).width();
                if(w > 320 && menu.is(':hidden')) {
                    menu.removeAttr('style');
                }
            });
            
            navLinks.on("click", function(e) {
               if ($(window).width() <= 800) {
                   menu.slideUp(200); 
               } 
            });
            
            searchPul.on("click", function() {
                serchTextBox.toggleClass("showSearchBox");
            });
            
        },
        templateUrl: 'templates/nav.html'
    }
});


crownShop.directive('thumbnail', function() {
   return {
       restrict: 'E',
       templateUrl: 'templates/thumbnail.html'
   } 
});



//CONTROLLERS


crownShop.controller('contactController', ['$scope', function($scope) {
    
}]);


crownShop.controller('homeController', ['$scope', 'appFactory', function($scope, appFactory) {
    
    appFactory.getFeaturedProducts(function(reslut) {
        $scope.featuredProducts = reslut;
    });
    
}]);

crownShop.controller('shopDeptController', ['$scope', 'appFactory', function($scope, appFactory) {
    
    appFactory.getShopDepartments(function(result) {
        $scope.shopDepartments = result;
    });
    
}]);

crownShop.controller('shopCategoryController', ['$scope', '$routeParams', 'appFactory', function($scope, $routeParams, appFactory) {
    
    var catId = $routeParams.id;
    
    appFactory.getShopCategories(catId, function(result) {
        $scope.categories = result;
    });
    
}]);


crownShop.controller('productsController', ['$scope', '$routeParams', 'appFactory', function($scope, $routeParams, appFactory) {
    
    var proCatId = $routeParams.id;
    
    appFactory.getProducts(proCatId, function(result) {
       $scope.products = result;
    });
    
}]);

crownShop.controller('productDetailController', ['$scope', '$routeParams', 'appFactory', function($scope, $routeParams, appFactory) {
    
    var productId = $routeParams.id;
    
    appFactory.getAllProducts(function(result) {
       angular.forEach(result, function(item) {
           if (item.id == productId) {
               $scope.productDetail = item;
           }
       });
    });
    
    appFactory.getProductImages(productId, function(result) {
       $scope.productImages = result;
    });
    
    
}]);


crownShop.controller('viewCartController', ['$scope', function($scope) {
    
}]);


//SERVICES
crownShop.factory('appFactory',['$http', function($http) {
    var crownServices = {};
    
    crownServices.getShopDepartments = function(cb) {
        $http({
            url: 'assets/api/getDepts.php',
            method: 'GET'
        }).then(function(response){
            cb(response.data);
        }, function(response){
            alert("Error Ocuured");
        });
    };
    
    
    crownServices.getShopCategories = function(a, cb) {
        $http({
            url: 'assets/api/getShopCategories.php?catId='+a,
            method: 'GET'
        }).then(function(response){
            cb(response.data);
        }, function(response){
            alert("Error Ocuured");
        });
    };
    
    crownServices.getProducts = function(a, cb) {
        $http({
            url: 'assets/api/getProducts.php?proCatId='+a,
            method: 'GET'
        }).then(function(response){
            cb(response.data);
        }, function(response){
            alert("Error Ocuured");
        });
    };
    
    
    crownServices.getAllProducts = function(cb) {
        $http({
            url: 'assets/api/getAllProducts.php',
            method: 'GET'
        }).then(function(response){
            cb(response.data);
        }, function(response){
            alert("Error Ocuured");
        });
    };
    
    
    crownServices.getProductImages = function(a, cb) {
        $http({
            url: 'assets/api/getProductImage.php?productId='+a,
            method: 'GET'
        }).then(function(response){
            cb(response.data);
        }, function(response){
            alert("Error Ocuured");
        });
    };
    
    
    crownServices.getFeaturedProducts = function(cb) {
         $http({
            url: 'assets/api/getFeaturedProducts.php',
            method: 'GET'
        }).then(function(response){
            cb(response.data);
        }, function(response){
            alert("Error Ocuured");
        });
    };
    
    return crownServices;
    
}]);




























