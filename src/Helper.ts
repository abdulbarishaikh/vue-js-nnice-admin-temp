const storeLocalStorage = async (key:string,value:any)=>{
    console.log('key',key,'value',value);
    
    localStorage.setItem(key, value);
}
const getLocalStorage = (key:string)=>{
    return localStorage.getItem(key);
}

const closeModel = (element:string)=>{
    if(element != ''){
        const  model:HTMLElement|null = document.getElementById(element);
        const querySelectorAll:NodeListOf<Element> | undefined = model?.querySelectorAll('[data-bs-dismiss="modal"]');
        if(typeof querySelectorAll != 'undefined'){
            if(querySelectorAll .length > 0){
                let queryArray:NodeListOf<Element> | undefined = querySelectorAll;
                queryArray[0]?.click();
            }

        }
    }

}

export default storeLocalStorage;
export  {getLocalStorage,closeModel};
