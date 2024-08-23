const storeLocalStorage = async (key:string,value:any)=>{
    console.log('key',key,'value',value);
    
    localStorage.setItem(key, value);
}
const getLocalStorage = (key:string)=>{
    return localStorage.getItem(key);
}
export default storeLocalStorage;
export  {getLocalStorage};
