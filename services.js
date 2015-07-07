(function(){

    var services = angular.module('curso.services', []);


    services.factory('ListaCompra', ListaCompra);

    ListaCompra.$inject = []
    function ListaCompra(){

        var service = {
            getAll: getAll,
            add: add,
            marcarComprado: marcarComprado
        }

        var items = []
        if(localStorage.items){
            try {
                items = JSON.parse(localStorage.items);
            }catch(e){
                items = [];
            }
        }
        var idAtual = items.length;

        function getAll(){
            return items;
        }

        function add(item){
            item.id = idAtual++;
            item.dataCriacao = new Date();
            items.push(item);
            salvar();
        }

        function marcarComprado(id){
            for (var i = items.length - 1; i >= 0; i--) {
                if(items[i].id == id){
                    items[i].comprado = true;
                }
            };
            salvar();
        }

        function salvar(){
            localStorage.setItem('items', JSON.stringify(items));
        }

        return service;
    }

})();
