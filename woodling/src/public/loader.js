let loaderInterval = '';

export function showLoader(el, tmOut){
    if (el){
        const offset = el.offset();
        
        document.getElementById('loading').style.top = offset.top;
        document.getElementById('loading').style.left = offset.left;
        document.getElementById('loading').style.height = el.height();
        document.getElementById('loading').style.width = el.width();
    }
    document.getElementById('loading').style.display = "block";
    document.getElementById('loading').style.width = "100%";
    document.getElementById('loading').style.height = "100%";


    if(!tmOut){
        tmOut = 30000;
    }

    if(loaderInterval){  // To avoid concurrent timeouts if showLoader() is called more than once.
        clearTimeout(loaderInterval);
        loaderInterval = null;
    }

    loaderInterval = setTimeout(function(){
        // Closing the Loader due to no response till 30seconds from the requested service
        hideLoader();
        console.log('HideLoader Called After Timeout!');
    }, tmOut);
}

export function hideLoader(){
    document.getElementById('loading').style.top = '';
    document.getElementById('loading').style.left = '';
    document.getElementById('loading').style.height = '';
    document.getElementById('loading').style.width = '';
    document.getElementById('loading').style.display = "none";

    clearTimeout(loaderInterval); 
    loaderInterval = null;
}