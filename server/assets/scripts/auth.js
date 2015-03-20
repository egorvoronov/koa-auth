document.querySelector('.authForm').onsubmit = function (e) {
  var formData = new FormData(this);

  var xhr = new XMLHttpRequest();

  xhr.open(this.method, this.action, true);

  xhr.send(new FormData(this));

  xhr.onload = function () {

    if (xhr.status === 200) {
      window.location.href = '/'
    } else if(xhr.status === 401) {
      alert('User not found');
    } else {
      alert('Error occured. Try to replay your actions.');
    }

  };

  return false;
};
