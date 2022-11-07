const sleep = ms => new Promise(r => setTimeout(r, ms));
const notification = document.getElementById("notification");

var shown = "";

document.getElementById("close").addEventListener('click', () => {
    notification.classList.remove("notiShow");
    notification.classList.add("notiHide");
})

setInterval(function () {
    fetch('/getUpLog', {
        method: 'get'
    }).then(function(response) 
    {   
        response.json().then((data) => {
            if(data.name.length == 0) return;
            if(shown == data.name){
                return;
            };
            shown = data.name;
            notificationShow(data.name, data.format);
        });
    }).catch(function(err) {
        console.error(err);
    });
}, 1000)

async function notificationShow(name, format){
    notification.classList.remove("notiShow");
    notification.classList.remove("notiHide");
    notification.querySelector("img").src = `/getFile?name=${name}&format=${format}`
    notification.classList.add("notiShow");
}