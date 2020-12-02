console.log('test')


axios.get('db.json').then(
    function (response) {
        // handle success
        console.log(response);
    }
)