var dates = []
var values = []
var dataL = 0;
var created = false;
const config = {
    type: 'line',
    data: [],
    options: {}
};
const myChart = new Chart(
    document.getElementById('myChart'),
    config
);
setInterval(() => {
    fetch('/getUploads',{
        method: 'get'
    }).then((response) => {
        response.json().then((data) => {
            if(Object.keys(data).length == dataL) return;
            for(let i = 0; i < Object.keys(data).length; i++){
                if(dates.indexOf(data[i].date) != -1) continue;
                dates.push(data[i].date)
            }
            for(let i = 0; i < dates.length; i++){
                values[i] = 0;
                for(let k = 0; k < Object.keys(data).length; k++){
                    if(data[k].date == dates[i]){
                        values[i] += 1;
                    }
                }
            }
            const labels = dates;
    
            const Data = {
                labels: labels,
                datasets: [{
                    label: 'Uploads',
                    backgroundColor: '#ff0f2f',
                    borderColor: '#ff0f2f',
                    data: values,
                }]
            };
            myChart.data = Data;
            myChart.update();
            dataL = Object.keys(data).length;
        })
    })
}, 1000);

//chart render