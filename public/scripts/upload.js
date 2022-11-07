const sleep = ms => new Promise(r => setTimeout(r, ms));

const fileInput = document.getElementById("fileInput");
const filePreview = document.getElementById("filePreview");
const fileUploadBtn = document.getElementById("fileUploadBtn")
var x,y, startX, startY;

window.mobileCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

if(!mobileCheck()){
    //PC

    function updateDisplay(event) {
        x = event.pageX;
        y = event.pageY;
    }
      
    document.addEventListener("mousemove", updateDisplay, false);
    document.addEventListener("mouseenter", updateDisplay, false);
    document.addEventListener("mouseleave", updateDisplay, false);
    
    var holding;
    //PC
    
    filePreview.addEventListener("mousedown", (e) => {
        holding = true;
        startX = x;
        startY = y;
    })
    
    filePreview.addEventListener("mouseup", () => {
        if(parseFloat(filePreview.style.top) <= -150){
            sendFile();
            console.log("submited")
        }
        holding = false;
        var fPvY = parseFloat(filePreview.style.top);
        var fPvX = parseFloat(filePreview.style.left);
        console.log(`X: ${fPvX}\nY: ${fPvY}`);
        const margines = 1;
        if(fPvY < margines && fPvX < margines && fPvX > -margines && fPvY > -margines){
            fileInput.click();
        }
        filePreview.style = `top: 0px; left: 0px; position: relative;`;
    })
    
    filePreview.addEventListener("mousemove", () => {
        var doc = document.body;
        if(holding){
            filePreview.style = `top: ${0+(y-(doc.clientHeight+10)/2)-(startY-((doc.clientHeight+10)/2))}px; left: ${x-((doc.clientWidth+10)/2)-(startX-((doc.clientWidth+10)/2))}px; position: relative; filter: drop-shadow(0 0 5px #ff0f2f);`;
        }
    })
    // y-(doc.clientHeight/2-10)    
}else{
    //MOBILE

    function updateDisplay(event) {
        for (let i = 0; i < event.changedTouches.length; i++) {
            x = event.changedTouches[i].pageX;
            y = event.changedTouches[i].pageY;
        }
    }
      
    document.addEventListener("touchmove", updateDisplay, false);

    filePreview.addEventListener("touchstart", (e) => {
        holding = true;
        startX = x;
        startY = y;
    })
    
    filePreview.addEventListener("touchend", () => {
        if(parseFloat(filePreview.style.top) <= -150){
            sendFile()
            console.log("submited")
        }
        holding = false;
        var fPvY = parseFloat(filePreview.style.top);
        var fPvX = parseFloat(filePreview.style.left);
        console.log(`X: ${fPvX}\nY: ${fPvY}`);
        if(fPvY < 10 && fPvX < 10 && fPvX > -10 && fPvY > -10){
            fileInput.click();
        }
        filePreview.style = `top: 0px; left: 0px; position: relative;`;
    })
    
    filePreview.addEventListener("touchmove", () => {
        var doc = document.body;
        if(holding){
            filePreview.style = `top: ${0+(y-(doc.clientHeight+10)/2)}px; left: ${x-((doc.clientWidth+10)/2)}px; position: relative; filter: drop-shadow(0 0 5px #ff0f2f);`;
        }
    })
}

fileInput.onchange = e => {
    const [file] = fileInput.files;
    const files = document.querySelector('[name=filetoupload]').files
    var point;
    var k = 0;
    for(var i = files[0].name.length-1; i >= 0; i--){
        if(files[0].name[i] == "."){
            point = files[0].name.length-k;
            break;
        }
        k++;
    }
    var fileType = files[0].name.slice(point);
    if(fileType == "pdf"){
        filePreview.src = "/images/pdftemp.png";
        return;
    }else if(fileType == "mp4"){
        filePreview.src = "/images/mp4temp.png";
        return;
    }
    if(file){
        filePreview.src = URL.createObjectURL(file);
    }
}

async function sendFile(){
    const themeColor = document.getElementsByName("theme-color")[0];
    filePreview.classList.remove("uploadAnimateBack")
    filePreview.classList.add("uploadAnimate")
    themeColor.content = "#ff0f2f";
    // collect files
    const files = document.querySelector('[name=filetoupload]').files
    if(files.length <= 0){
        await sleep(2000)
        filePreview.src = "/images/errortemp.png";
        filePreview.classList.remove("uploadAnimate");
        filePreview.classList.add("uploadAnimateBack")
        themeColor.content = "#1b1b1b";
        return;
    }
    var point;
    var k = 0;
    for(var i = files[0].name.length-1; i >= 0; i--){
        if(files[0].name[i] == "."){
            point = files[0].name.length-k;
            break;
        }
        k++;
    }
    const formData = new FormData()
    formData.append('file', files[0])

    // post form data
    const xhr = new XMLHttpRequest()

    // log response
    xhr.onload = () => {
    console.log(xhr.responseText)
    }

    // create and send the reqeust
    xhr.open('POST', "/uploadfile")
    xhr.setRequestHeader("format", files[0].name.slice(point))
    xhr.send(formData)
    await sleep(2000)
    filePreview.src = "/images/goodtemp.png";
    filePreview.classList.remove("uploadAnimate");
    filePreview.classList.add("uploadAnimateBack")
    themeColor.content = "#1b1b1b";
}