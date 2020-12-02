// Four steps to make a AJAX request
// 1. Create a new XMLHttpRequest object
// 2. use open() method to send reqeust
// 3. onload and onerror
// 4. send() the result

function sendRequest(callback){
    const JQrequest = new XMLHttpRequest();
    JQrequest.open('GET', '/jQuery.js')
    JQrequest.onreadystatechange = () => {
        if (JQrequest.readyState === 4) {
            if (JQrequest.status >= 200 && JQrequest.status < 300) {
                const script = document.createElement('script')

                script.innerText = JQrequest.response
                const mainScript = document.querySelector('script')
                const body = document.querySelector('body')
                body.insertBefore(script, mainScript)
                callback();

            } else (
                console.log('load error')
            )
        }
    }
    JQrequest.send()
}


function f1 () {
    console.log('jQueryPromiseTHNNNNNNNNNN')
    const request = new XMLHttpRequest();
    request.open('GET', '/styles.css')
    request.onload = () => {
        $('head').append('<style>' + request.response + '</style>')
    }
    request.onerror = () => {
    }

    request.send()

    const htmlRequest = new XMLHttpRequest();
    htmlRequest.open('GET', '/newHtml.html')
    htmlRequest.onreadystatechange = () => {
        if (htmlRequest.readyState === 4) {
            if (htmlRequest.status >= 200 && htmlRequest.status < 300) {
                $('h1').after(htmlRequest.response)
            } else (
                console.log('load error')
            )
        }
    }
    htmlRequest.send();


    const JsonRequest = new XMLHttpRequest()
    JsonRequest.open('GET','/db.json')
    JsonRequest.onreadystatechange = ()=>{
        if (JsonRequest.readyState === 4) {
            if (JsonRequest.status >= 200 && JsonRequest.status < 300) {
                const obj = JSON.parse(JsonRequest.response)
                console.log(obj)
            } else (
                console.log('load error')
            )
        }
    }
    JsonRequest.send()

}

sendRequest(f1);