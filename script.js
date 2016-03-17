var $ = $ || {}


$.ajax = function(options) {

  var xhr = new XMLHttpRequest();

  var promise = new Promise(function(resolve, reject){
    xhr.addEventListener( "load", function(){
      switch (this.status) {
        case 200:
        case 201:
        case 202:
        options.success(this.responseText);
        resolve(this.responseText);
        break;
        default:
        options.error(this.responseText);
        reject(this.responseText);
        break;
      }
    });

    xhr.addEventListener( "error", function(){
      options.error(this.responseText);
      reject(this.responseText);
    });

  })

  xhr.open( options.method || options.type, options.url, options.async || true);

  for(header in options.headers) {
    var value = options.headers[header]
    console.log("Adding header:");
    console.log(header);
    console.log(value);
    xhr.setRequestHeader(header, value)
  }

  xhr.send( options.data );

  return promise;
}

//Convenience Methods
$.get = function(url, success){
  $.ajax({
    method: "GET",
    url: url,
    success: success
  })
}

$.get("http://jsonplaceholder.typicode.com/users", function(response) {
    console.log("Success: " + response);
  })

$.post = function(url, data, success){
  $.ajax({
    method: 'POST',
    url: url,
    data: data,
    success: success
  })
}

$.post("http://jsonplaceholder.typicode.com/posts",{
   title: 'foo',
   body: 'bar',
   userId: 1
 }, function(data){
  console.log(data);
})

var promise = $.ajax({
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

promise.then(function(val){
  console.log('Promise Returned.' + val);
})


