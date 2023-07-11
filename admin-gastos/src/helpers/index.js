
export const formatAmount = (amount) =>{
    //formatea la cantidad a tipo moneda, en este caso MX
    //no hace converciones de moneda, solo da formato
    return Number(amount).toLocaleString('es-MX',{
        style:'currency',
        currency: 'MXN'
    })
}

export const createId = ()=>{
    const date = Date.now().toString(36)
    const random = Math.random().toString(36).substring(2)

    return date + random
}

export const formatDate = (date) =>{
    const newDate = new Date(date)
    const options ={
        year:'numeric',
        month:'long',
        day:'2-digit'
    } 

    return newDate.toLocaleDateString('es-ES',options)

}