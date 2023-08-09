import {collection, doc, deleteDoc} from 'firebase/firestore'
import {ref as storageRef, deleteObject} from 'firebase/storage'
import {useFirestore, useCollection, useFirebaseStorage} from 'vuefire'
import {computed, ref} from 'vue'

export default function usePropiedades(){

    const storage = useFirebaseStorage()
    const db = useFirestore()
    const propiedadesCollection = useCollection(collection(db,'propiedades'))
    const alberca = ref(false)


    async function deleteItem(id, urlImage){

        if(confirm('¿Deseas eliminar esta propiedad?')){
            const docRef = doc(db, 'propiedades', id)
            const imageRef = storageRef(storage, urlImage)

            //await con funciones que se ejecuten al mismo tiempo
            await Promise.all([
                deleteDoc(docRef),
                deleteObject(imageRef)
            ])

            //awaits que se ejecutan de manera independiente
            /* await deleteDoc(docRef)
            await deleteObject(imageRef) */
        }
    }

    const propiedadesFiltradas = computed(()=>{
        return alberca.value ?
            propiedadesCollection.value.filter(propiedad => propiedad.alberca) :
            propiedadesCollection.value
    })

    return {
        propiedadesCollection,
        propiedadesFiltradas,
        alberca,
        deleteItem
    }
}
