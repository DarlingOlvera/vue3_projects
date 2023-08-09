import {ref} from 'vue'

export default function useMap(){

    const zoom = ref(17)
    const center = ref([21.0020094,-89.6323813])

    function pin(e){
        const marker = e.target.getLatLng()
        center.value = [marker.lat,marker.lng]

        console.log(center.value);
    }

    return{
        zoom,
        center,
        pin

    }
}