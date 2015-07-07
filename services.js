(function(){

angular.module('curso.services',[])
    .factory('ListaCompra', ListaCompra)

ListaCompra.$inject = ['$filter'];
function ListaCompra($filter){
    var service = {
        getAll: getAll,
        add: add,
        marcarComprado: marcarComprado,
        getComprados: getComprados
    }

    var items = [];
    if(window.localStorage.items){
        items = JSON.parse(window.localStorage.items) || [];
    }

    return service;

    function getAll(){
        return items;
    }

    function getComprados(comprado){
        return $filter('filter')(items, { comprado: comprado })
    }

    function add(item){
        item.id = items.length;
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
        window.localStorage.setItem('items', JSON.stringify(items));
    }

}


})();
