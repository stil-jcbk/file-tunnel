const sleep = ms => new Promise(r => setTimeout(r, ms));

// define URL and for element
const url = '/api/test'
const form = document.querySelector('form')

// add event listener
form.addEventListener('submit', async(e) => {
    filePreview.classList.remove("uploadAnimateBack")
    filePreview.classList.add("uploadAnimate")
    // disable default action
    e.preventDefault()

    // collect files
    const files = document.querySelector('[name=filetoupload]').files
    var point;
    for(i = 0; i < files[0].type.length; i++){
    if(files[0].type[i] == "/"){
        point = i+1;
        break;
    }
    }
    var fileType = files[0].type.slice(point);
    const formData = new FormData()
    formData.append('file', files[0])

    // post form data
    const xhr = new XMLHttpRequest()

    // log response
    xhr.onload = () => {
    console.log(xhr.responseText)
    }

    // create and send the reqeust
    xhr.open('POST', url)
    xhr.setRequestHeader("format", files[0].type.slice(point), fileType)
    xhr.send(formData)
    await sleep(2000)
    filePreview.classList.remove("uploadAnimate");
    filePreview.classList.add("uploadAnimateBack")
})