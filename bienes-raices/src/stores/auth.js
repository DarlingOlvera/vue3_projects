import { defineStore } from 'pinia'
import {ref,computed,onMounted}from 'vue'
import {signInWithEmailAndPassword, onAuthStateChanged,signOut} from 'firebase/auth'
import {useFirebaseAuth} from 'vuefire'
import {useRouter} from 'vue-router'

export const useAuthStore = defineStore('auth', () => {

    const auth = useFirebaseAuth()
    const authUser = ref(null)
    const router = useRouter()

    //diccionario de mensajes de error
    const errorCodes = {
        'auth/user-not-found' : 'Usuario no encontrado',
        'auth/wrong-password' : 'Contraseña incorrecta'
    }
    const errorMsg = ref('')

    onMounted(() => {
      onAuthStateChanged(auth,(user)=>{
        if(user){
            authUser.value = user;
        }
      })  
    })

 
    const login = ({email,password})=>{
        signInWithEmailAndPassword(auth,email,password)
        .then((userCredential)=>{
            const user = userCredential.user;
            authUser.value = user
            router.push({name:'admin-propiedades'})
        }).catch(err =>{
            //uso del diccionario, lo que está entre corchetes es la key del diccionario
            errorMsg.value = errorCodes[err.code];
        })
    }

    const logout = ()=>{
        signOut(auth).then(()=>{
            authUser.value = null
            router.push({name:'login'})
        }).catch(err =>{

        })
    }

    const hasError = computed(()=>{
        return errorMsg.value
    })

    const isAuth = computed(()=>{
        return authUser.value
    })
 
    return {
        login,
        logout,
        hasError,
        errorMsg,
        isAuth
    }
})