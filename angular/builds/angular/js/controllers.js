var myControllers = angular
.module('myControllers', []);

myControllers.controller(
  'MainController',
  function MyController($scope, $filter, $http) {
    $http.get('metadata/stores.json').then(function(response) {
      $scope.store = response.data.Stores[0];
    });
    $http.get('metadata/categories.json').then(function(response) {
      $scope.categories = response.data;
      $scope.products = [];
      $scope.itemQuantity = 1;
      $scope.increaseCondimentCount = function(condiment, meal) {
        var condimentPrice = Number(condiment.Price.replace(/[^0-9\.-]+/g, ''));
        var mealPrice = Number(meal.Item.Price.replace(/[^0-9\.-]+/g, ''));
        condiment.Quantity++;
        if(condimentPrice !== 0) {
          meal.Item.Price = $filter('currency')(mealPrice + condimentPrice);
        }
      };
      $scope.decreaseCondimentCount = function(condiment, meal) {
        var condimentPrice = Number(condiment.Price.replace(/[^0-9\.-]+/g, ''));
        var mealPrice = Number(meal.Item.Price.replace(/[^0-9\.-]+/g, ''));
        if (condiment.Quantity > 0) {
          condiment.Quantity--;
          if(condimentPrice !== 0) {
            meal.Item.Price = $filter('currency')(mealPrice - condimentPrice);
          }
        }
      };
      $scope.addProduct = function(id, meal, cat) {
        if(($scope.products === undefined || $scope.products.length == 0)) {
          meal.Item.Quantity = meal.Item.Quantity + 1;
          $scope.products.push({ id: id, meal: meal.Item, category: cat });
        } else {
          if($scope.products.filter(function(item) { return item.id === id }).length > 0) {
            return false;
          } else {
            meal.Item.Quantity = meal.Item.Quantity + 1;
            $scope.products.push({ id: id, meal: meal.Item, category: cat });
          }
        }
      };
      $scope.removeProduct = function(product) {
        var cartItemIndex = $scope.products.findIndex(function(item) { return item.id === product.id; });
        if (cartItemIndex !== -1) {
          $scope.products.filter(function(item) { return item.id === product.id; }).map(function(item) {
            item.meal.Quantity = 0;
            return item;
          });
          $scope.products.splice(cartItemIndex, 1);
        }
      };
      $scope.increaseProductCount = function(product) {
        product.meal.Quantity = product.meal.Quantity + 1;
      };
      $scope.decreaseProductCount = function(product) {
        if (product.meal.Quantity > 1) {
          product.meal.Quantity = product.meal.Quantity - 1;
        }
      };
      $scope.mealPrice = function(product) {
        return Number(product.meal.Price.replace(/[^0-9\.-]+/g, '') * product.meal.Quantity);
      };
      $scope.total = function() {
        return $scope.products.reduce(function(acc, product) {
          var sum = acc + ($scope.mealPrice(product));
          return sum;
        }, 0);
      }
    });
  }
);
