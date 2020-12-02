console.log('test')


axios.get('http://localhost:3000/db.json').then(
    function (response) {
        // handle success
        console.log(response);
    }
)