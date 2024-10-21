

async function regSw(){
    if( "sericeWorker" in navigator){
       const url = `${process.env.PUBLIC_URL}/sw.js`
       const reg = await navigator.serviceWorker.register(url,{ scope: "/"})
       return reg
    }
    throw new Error("Service worker not supported")
}