// const sleep = ms => new Promise(r => setTimeout(r, ms));

// document.body.onload = async () => {
//     var xhr = new XMLHttpRequest();
//     xhr.responseType = "arraybuffer";
//     xhr.onreadystatechange = function() { 
//     if (xhr.readyState == 4 && xhr.status == 200) { 
//         document.getElementById("qr").setAttribute('src', 'data:image/png;base64,' + btoa(String.fromCharCode.apply(null, new Uint8Array(xhr.response))));
//     }
//     }
//     xhr.open("POST", "/qr", true); // true for asynchronous
//     xhr.send(null);
// }