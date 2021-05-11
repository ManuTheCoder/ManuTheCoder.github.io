AOS.init();
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var articles = JSON.parse(this.responseText);
    for (var i in articles) {
      document.getElementById("articles").innerHTML += `
<div class="col s4" style="padding: 15px">
<a href="${articles[i].url}" target="_blank" class="card content">${articles[i].title}</a>
</div>
`;
    }
  }
};
xhttp.open("GET", "https://dev.to/api/articles?username=manuthecoder&per_page=3", true);
xhttp.send();
var modal = {
  open: function(selector) {
    document.getElementById(selector).style.display = 'block';
    var x = document.getElementById('modal-overlay');
    x.style.opacity = 0;
    x.onclick = function() {
      modal.close(selector)
    };
    setTimeout(function() {
      x.style.opacity = 1;
    }, 200)
    x.style.display = "block";
    var s = document.getElementById(selector);
    s.style.opacity = 0;
    document.body.style.overflow = "hidden";
    setTimeout(function() {
      s.style.transform = 'scale(1) translate(-50%, -50%)';
      s.style.opacity = 1;
    }, 200)
  },
  close: function(selector) {
    var s = document.getElementById(selector);
    s.style.opacity = 0;
    var x = document.getElementById('modal-overlay');
    x.style.opacity = 0;
    document.body.style.overflow = "";
    setTimeout(function() {
      x.style.display = "none";
      s.style.display = "none";
      s.style.transform = "scale(.9) translate(-50%, -50%)";
    }, 200)
  },
}
var sidenav_overlay = document.createElement('div');
sidenav_overlay.className = "sidenav-overlay";
sidenav_overlay.id = "sidenav-overlay";
document.body.appendChild(sidenav_overlay);
var modal_overlay = document.createElement('div');
modal_overlay.className = "modal-overlay";
modal_overlay.id = "modal-overlay";
document.body.insertAdjacentElement('beforeend', modal_overlay);
var form = document.getElementById("my-form");

async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("my-form-status");
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    status.innerHTML = "Thanks for your submission!";
    form.reset()
  }).catch(error => {
    status.innerHTML = "Oops! There was a problem submitting your form"
  });
}
form.addEventListener("submit", handleSubmit)
var inputs = document.querySelectorAll('.input');
for (i = 0; i < inputs.length; i++) {
  if(inputs[i].getElementsByTagName('input')[0])  {
    inputs[i].getElementsByTagName('input')[0].addEventListener('focus', function() {
      this.parentElement.classList.add('input-active');
      this.parentElement.classList.remove('input-filled-in-not-focus');
    });
  }
  if(inputs[i].getElementsByTagName('textarea')[0])  {
    inputs[i].getElementsByTagName('textarea')[0].addEventListener('focus', function() {
      this.parentElement.classList.add('input-active');
      this.parentElement.classList.remove('input-filled-in-not-focus');
    });
  }
  if(inputs[i].getElementsByTagName('input')[0]) {
    inputs[i].getElementsByTagName('input')[0].addEventListener('blur', function() {
      if(this.value == "") {
        this.parentElement.classList.remove('input-active');
      }
      else {
        this.parentElement.classList.add('input-filled-in-not-focus');
      }
    });
  }
  if(inputs[i].getElementsByTagName('textarea')[0]) {
    inputs[i].getElementsByTagName('textarea')[0].addEventListener('blur', function() {
      if(this.value == "") {
        this.parentElement.classList.remove('input-active');
      }
      else {
        this.parentElement.classList.add('input-filled-in-not-focus');
      }
    });
  }
}
