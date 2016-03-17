var $ = $ || {}


$.ajax = function(options) {

  var xhr = new XMLHttpRequest();

  for(header in options.headers) {
    var value = options.headers[header]
    console.log("Adding header:");
    console.log(header);
    console.log(value);
    xhr.setRequestHeader(header, value)
  }

  xhr.addEventListener( "load", function(){
    switch (this.status) {
      case 200:
        options.success(this.responseText);
        break;
      default:
        options.error(this.responseText);
        break;
    }
  });

  xhr.addEventListener( "error", function(){
    options.error(this.responseText);
  });

  xhr.open( options.method || options.type, options.url, options.async || true);
  xhr.send( options.data );
}


$.ajax({
  method: "GET",
  url: "http://jsonplaceholder.typicode.com/users",
  success: function(response) {
    console.log("Success: " + response);
  },
  error: function(response) {
    console.log("Error: " + response);
  },
  headers: {
    name: "Whee",
    hooray: "Hahahaha"
  }
})


