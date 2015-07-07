(function(){

    angular.module('curso.controllers', ['curso.services'])
        .controller('MainController',MainController);

    MainController.$inject = ['$scope','$log','ListaCompra', '$filter'];
    function MainController($scope, $log, ListaCompra, $filter){
        var items = [];
        $scope.items = ListaCompra.getAll();
        $scope.filtro = 'todos';

        function iniciaItem(){
            $scope.item = {
                descricao: "",
                qtde: 0,
                comprado: false
            };
        }

        $scope.adicionar = function(valido){
            if(valido){
                var item = angular.copy($scope.item);
                ListaCompra.add(item);
                $scope.items = ListaCompra.getAll();
                $scope.filtro = 'todos';
                iniciaItem();
            }
        }

        $scope.marcarComprado = function(id){
            ListaCompra.marcarComprado(id);
            $scope.items = ListaCompra.getAll();
        }

        $scope.filtrarComprados = function(){
            var items = ListaCompra.getAll();
            $scope.items = $filter('filter')(items, { comprado: true });
            $scope.filtro = 'comprados';
        }

        $scope.filtrarNaoComprados = function(){
            var items = ListaCompra.getAll();
            $scope.items = $filter('filter')(items, { comprado: false });
            $scope.filtro = 'naocomprados';
        }

        $scope.todos = function(){
            $scope.items = ListaCompra.getAll();
            $scope.filtro = 'todos';
        }

        iniciaItem();
        $log.info('Iniciando controller');
    }

})();
