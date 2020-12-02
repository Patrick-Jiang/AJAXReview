axios.get('https://raw.githubusercontent.com/Patrick-Jiang/NavPage/master/data.json')
    .then(function (response) {
        // handle success
        const data = response.data
        $(document).ready(() => {
            $('body').prepend('<ol id="sites"></ol>')
            data.forEach(n => {
                $('#sites').append('' +
                    '<li id=' + n.categoryName + '>'
                    + 'Category Name: <b> ' + n.categoryName + '</b>' +
                    '</li>')

                $('#' + n.categoryName).append('<ol id=' + n.categoryName + 'Sits></ol>')

                n.sites.forEach(b => {
                        $('#' + n.categoryName + 'Sits').append('' +
                            '<li id=' + b.name + '>'
                            + 'Sites Name: <b> ' + b.name + '</b>' +
                            '</li>')
                    }
                )
            })
        })
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        // always executed
    });