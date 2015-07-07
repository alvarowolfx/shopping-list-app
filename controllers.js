(function(){

    angular.module('curso.controllers', ['curso.services'])
        .controller('MainController',MainController);

    MainController.$inject = ['$scope','$log','ListaCompra', '$filter'];
    function MainController($scope, $log, ListaCompra, $filter){
        var items = [];
        $scope.items = ListaCompra.getAll();
        $scope.filtroAtivo = 'todos';

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
                $scope.filtroAtivo = 'todos';
                iniciaItem();
            }
        }

        $scope.marcarComprado = function(id){
            ListaCompra.marcarComprado(id);
            $scope.items = ListaCompra.getAll();
        }

        $scope.filtrarComprados = function(){
            $scope.items = ListaCompra.getComprados(true);
            $scope.filtroAtivo = 'comprados';
        }

        $scope.filtrarNaoComprados = function(){
            $scope.items = ListaCompra.getComprados(false);
            $scope.filtroAtivo = 'naocomprados';
        }

        $scope.todos = function(){
            $scope.items = ListaCompra.getAll();
            $scope.filtroAtivo = 'todos';
        }

        iniciaItem();
        $log.info('Iniciando controller');
    }

})();
