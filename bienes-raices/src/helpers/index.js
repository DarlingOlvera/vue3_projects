//formato en dolares del precio de las propiedades
export const precioPropiedad = (price)=>{

    //forma de pasarle parametros o propiedades a una computed property
       return Number(price).toLocaleString('en-US',{
            style:'currency',
            currency: 'USD'
        })
    
}
