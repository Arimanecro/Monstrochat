export const ChatBlockObserver = (setView:Function):void => {

    const chat = document.querySelector('#chat') as HTMLElement;
    
    const observer:IntersectionObserver = new IntersectionObserver((entries, observer) => { 
    
        entries.forEach( entry => {
        if(entry.intersectionRatio == 1 ){ 
            const {friends} = JSON.parse(localStorage.getItem('profile'));
            setView(friends);
            }
    });
    }, {threshold: 1.0});
    
    observer.observe(chat);
}