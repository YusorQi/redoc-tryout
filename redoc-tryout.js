var md = {};
// function sendRequest( method, body, headers) {
//   param = {
//     url: "http://172.18.211.201:5000/api/middleware-try-out",
//     type: method
//   }
//   if(body) {
//     param.body = body;
//   }
//   if(headers) {
//     param.headers = headers;
//   }

//   $target = $('#target')
//   $target.empty()
//   $('<img>').attr('src', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Loading_icon_cropped.gif/40px-Loading_icon_cropped.gif').attr('width', '20').attr('height', '20').appendTo($target)

//   $.ajax(param).done(function(data) {
//     $target.empty()
//     console.log("done:", data)
//     $('<span><b>Done</b></span>').appendTo($target)
//     $('<br>').appendTo($target)
//     $('<textarea>').attr('style', 'width:98%').attr('cols', '55').text(JSON.stringify(data)).appendTo($target)
//   }).fail((data) => {
//     $target.empty()
//     console.log("failed:", data)
//     $('<span><b>Failed</b></span>').appendTo($target)
//     $('<span>').text(data.statusText).appendTo($target)
//   })
// }
var swaggerJson = null;


swaggerUrl = $('redoc').attr('spec-url')
$.ajax({
  url: swaggerUrl
}).done(data => {

  swaggerJson = data;
  if(!swaggerJson.host) {
    swaggerJson.host = defaultHost
  }
})
function printRequestForm(swaggerJson, path, method,body) {

console.log("print",swaggerJson)

  $('#target').empty()
  var form = $('#requestForm')
  form.empty();
  $("<input type='hidden'>")
    .attr("name", "uri")
    .attr("value", path)
    .appendTo(form)
  $("<input type='hidden'>")
    .attr("name", "method")
    .attr("value", method)
    .appendTo(form)
  $("<p>").appendTo(form)
  $('<textarea class="reqBody" placeholder=" ">').attr("name","body").attr("value",{"body":body}).appendTo(form)

  $('#form').show();
}

function collectDataAndSendRequest() {
 
  queryParams = $('input[in=query]').toArray().map(input => [input.name, input.value])
  pathParams = $('input[in=path]').toArray().map(input => [input.name, input.value])
  // headerParams = $('input[in=header]').toArray().map(input => [input.name, input.value])
 
  //TODO: GET BODY 
   body = JSON.parse($('textarea').val());

  uri = $('input[name=uri]').toArray().map(input => input.value).pop()
  method = $('input[name=method]').toArray().map(input => input.value).pop()
  formDataParams = $('input[in=formData]').toArray().map(input => [input.name, input.value])

  pathParams.map(param => {
    uri = uri.replace("{" + param[0] + "}", param[1])
  })
  if(queryParams.length > 0) {
    uri += "?" + queryParams.filter(p => p[1] && p[1] != '')
        .map(p => encodeURI(p[0])+ "=" + encodeURI(p[1]))
        .join("&")
  }


  if(!body && formDataParams.length > 0) {
    body = formDataParams.filter(p => p[1] && p[1] != '')
        .map(p => encodeURI(p[0])+ "=" + encodeURI(p[1]))
      .join("&")
  }

  // var headers = headerParams.reduce((m,xy) => {m[xy[0]]=xy[1] ; return m;}, {})
  var headers= {
        "Content-Type": "application/json",
        "accept": "application/json",
        "Authorization": "Basic UWlfQ1JNOmdbXEc4LG1gYntSRSMpTEY="
    }
  // var https = $('#https').prop('checked') ? true : undefined;
   var md = { "endpoint": `https://mw.prod.qi.iq:443${uri}` ,"method":method ,"body":body ,"headers": Object.keys(headers).length != 0 ? headers : undefined}

  sendRequest(md)

}
async function sendRequest(md) {
  var result = {};
  var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");



var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: JSON.stringify(md),
  redirect: 'follow'
};

    $target = $('#target')
  $target.empty()
  $('<img>').attr('src', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Loading_icon_cropped.gif/40px-Loading_icon_cropped.gif').attr('width', '20').attr('height', '20').appendTo($target)

 await fetch("https://ur-task.com/qi_dev_portal/api/proxy", requestOptions)
   .then(response => { return response.json() }).then((data)=>{
    $target.empty()
 
      console.log(data)
      result = JSON.stringify(data,undefined,2);
     console.log("result",result)
   
   //   console.log("done:", result)
    $('<span><b>Done</b></span>').appendTo($target)
     $('<br>').appendTo($target)
    
     $('<div class="resData" id="resData">').attr('style', 'width:25%').appendTo($target)
     document.getElementById('resData').textContent=JSON.stringify(data,undefined,2)
    }).catch(error => console.log('error', error));

 
  
}

$('#sendButton').click(() => {
  collectDataAndSendRequest();
})



$(document).ready(() => {


  setTimeout(() => {
    $('.http-verb').toArray().map(c => $(c).parent().append($('<p>')).append($("<div style='border-radius: 5px; background: white; padding: 5px; width:50px; color: black;' class='try-out'>try-out</div>")))
    $('.try-out').click((event) => {
      verbNode = $($(event.target).parent().children()[0])
      var method = verbNode.text().trim();
      var path = verbNode.next('span').text().trim();
      var body = verbNode.next('text').text().trim();
      printRequestForm(swaggerJson, path, method,body);

      $('#form').appendTo(verbNode.parent().next());
    });

  }, typeof redocLoadingWaitTime == 'undefined' ? 8000 : redocLoadingWaitTime);

})