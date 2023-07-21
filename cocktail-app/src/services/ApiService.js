import api from "../api/axios";

export default{

    obtenerCategorias(){
        return api.get('list.php?c=list')
    },

    buscarRecetas({categoria, nombre}){
        return api.get(`filter.php?c=${categoria}&i=${nombre}`)
    },

    recetaCompleta(id){
        return api.get(`lookup.php?i=${id}`)
    }
}