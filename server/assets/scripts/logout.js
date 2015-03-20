var logout = document.querySelector('#logout');

if (logout) {
    logout.onclick = function(e) {

        var xhr = new XMLHttpRequest();


        xhr.open('POST', '/logout', true);

        xhr.send();

        xhr.onload = function() {

            if (xhr.status === 200) {
                window.location.href = '/login'
            }

        };

        return false;
    };
}

