import {computed} from 'vue'
import {ref as storageRef} from 'firebase/storage'
import {useFirebaseStorage, useStorageFile} from 'vuefire'
import {uid} from 'uid'

export default function useImage(){
    
    const storage = useFirebaseStorage()
    const storageRefPath = storageRef(storage,`/propiedades/${uid()}.jpg`)

    const {
        url,
        upload
    } = useStorageFile(storageRefPath)

    function uploadImage(e) {
        //console.log(e.target.files[0]);
        const data = e.target.files[0]
        if(data){
            upload(data)
        }
        
        console.log(url);
    }

    const image = computed(()=>{
        return url.value ? url.value : null;
    })

    return{
        uploadImage,
        image,
        url
    }
}