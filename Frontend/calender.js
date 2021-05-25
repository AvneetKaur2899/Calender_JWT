
const Baseurl="https://localhost:44365";
function LoginUser()
{ 
    //  alert("Hello");
  
  // alert(form1.email.value);
    // alert(form1.password.value);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "EmailId":form1.email.value,
      "Password": form1.psw.value
    });
    // "firstName": form1.fname.value,
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch(Baseurl+"/api/Login", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        if(result.token=='')
        {
            alert("Wrong Username And Password!")
        }  
        else
        {
            localStorage.setItem("calender-application-token",result.token);
            location.replace("./Events.html")

        }
        })
      .catch(error => alert("Some Error Occured!"));
}
function LogOut()
{
    localStorage.removeItem("calender-application-token");
    location.replace("./index.html");
}
function CheckLogin()
{
  //
    if(localStorage.getItem("calender-application-token")==null)
    {
        location.replace("./index.html");

    }
}
function FetchData()
{
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+localStorage.getItem("calender-application-token"));
    var requestOptions = {
        headers: myHeaders,
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch(Baseurl+"/api/Calender", requestOptions)
        .then(response => response.json())
        .then(result => {
          var StrGet="";
          
          result.forEach((user)=>{
            // console.log(user.address)
            StrGet += `<tr>
                 <td>${user.id}</td>
                 <td>${user.eventName} </td>
                 <td>${user.date} </td>
                 <td>${user.country}</td> 
                 
                 <td>
                 <button id="primarybtn" type="button" onclick="SelectUserForEdit('${user.id}')">Edit</button>
                 </td>
                 <td>
                 <button type="button" onclick="DeleteUser('${user.id}')">Delete</button>
                 </td>
                 </tr>`;
            // create list and bind
            // similarly do for rest functions
             document.getElementById("userTable").innerHTML=StrGet;
          });

        })
        .catch(error => console.log('error', error));

}
function HomeInit()
{
    CheckLogin();
    FetchData();
}
function DeleteUser(id)
{
  var IsDelete=confirm("Confirm To Delete!!");
  if(IsDelete==true)
  {
    var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer "+localStorage.getItem("calender-application-token"));

var requestOptions = {
  method: 'DELETE',
  headers: myHeaders,
  redirect: 'follow'
};

fetch(Baseurl+"/api/Calender/"+id, requestOptions)
  .then(response => response.text())
  .then(result => {alert("Successfully Deleted User.")
  FetchData();
}
  )
  .catch(error => console.log('error', error));
  }
  else
  {
    return;
  }


}
function CreateUser()
{

     if(form1.eventName.value=='')
     {
       alert("Please Enter The Event!");
       return;
     }

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+localStorage.getItem("calender-application-token"));
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "id": form1.id.value,
    "eventName": form1.eventName.value,
    "date": form1.date.value,
     "country": form1.country.value,
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch(Baseurl+"/api/Calender", requestOptions)//passing data from form to server side
    .then(response => response.json())
    .then(result => {
      console.log(result);
      if(result.eventName=='')
      {
       alert("Some Error Occured!")
      }
      else
      {
        alert("Created Successfully");
        FetchData();
      }
        

    })
    .catch(error => 
        console.log(error)
        );
}
function SelectUserForEdit(id)
{
  var newHeaders=new Headers();
    newHeaders.append("Authorization", "Bearer "+localStorage.getItem("calender-application-token"));
    newHeaders.append("Content-Type", "application/json");
    fetch("https://localhost:44365/api/Calender/"+id.toString(),{
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: newHeaders,
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer'
    }
    ).then(res=> res.json())
    .then(data =>{
        data.forEach(result =>
            {
                form1.id.value=result.id;
                   form1.eventName.value=result.eventName;
                     form1.date.value=result.date;
                     form1.country.value=result.country;;
                
            });
        });
//code for feting info by using id
// var myHeaders = new Headers();
// myHeaders.append("Authorization", "Bearer "+localStorage.getItem("student-management-token"));

// var requestOptions = {
//   method: 'GET',
//   headers: myHeaders,
//   redirect: 'follow'
// };

// fetch(Baseurl+"/api/Calender/"+id, requestOptions)
//   .then(response => response.json())
//   .then(result => {console.log(result)
//     console.log(id);
//     // form1.id.value=result.id;
//     form1.eventName.value=result.EventName;
//     form1.date.value=result.date;
//     form1.country.value=result.country;
//   })
//   .catch(error => console.log('error', error));

}

function Update()
{

  var id=form1.id.value;
  if(id=='')
  {
      alert("Please The Event To Update!");
     return;
   }
 
   var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+localStorage.getItem("calender-application-token"));
    myHeaders.append("Content-Type", "application/json");
   
  // var raw = "{\r\n        \"firstName\": \"Ishansha\",\r\n        \"lastName\": \"Sharma\",\r\n        \"gender\": 1,\r\n        \"age\": 26,\r\n        \"city\": \"chandigarh\",\r\n        \"skills\": \"DSA , .NET Framework , React\",\r\n        \"email\": \"ishan98.es@gmail.com\",\r\n        \"password\": \"Ishan123\",\r\n        \r\n    }";
  var raw = JSON.stringify({
      "eventName": form1.eventName.value,
      "date": form1.date.value,
      "country": form1.country.value,
 
      // "Date": form1.date.value,
      // "Time": form1.time.value,
      // "skills":form1.skills.value ,
     // "email": form1.email.value,
     // "password": form1.password.value,
     });
   
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
    body: raw,
     redirect: 'follow'
    };
    // Baseurl+"/api/Student/"+email
    fetch(Baseurl+"/api/Calender/"+id, requestOptions)
      .then(response => response.json())
     .then(result => {
        console.log(result);
        if(result.id==null)
        {
          alert("Id Not Found!")
        }
        else
       {
          alert("Edited Successfully!");
          FetchData();
       }
      // console.log(result);
      
    })
      .catch(error => alert("An Error Occured!"));
 }
//   var id=form1.id.value;
//   // alert(eventName);
//   if(id=='')
//   {
//     alert("Please Select An Event To Update!");
//     return;
//   }

//   var myHeaders = new Headers();
//   myHeaders.append("Authorization", "Bearer "+localStorage.getItem("student-management-token"));
//   myHeaders.append("Content-Type", "application/json");
  
//   // var raw = "{\r\n        \"firstName\": \"Ishansha\",\r\n        \"lastName\": \"Sharma\",\r\n        \"gender\": 1,\r\n        \"age\": 26,\r\n        \"city\": \"chandigarh\",\r\n        \"skills\": \"DSA , .NET Framework , React\",\r\n        \"email\": \"ishan98.es@gmail.com\",\r\n        \"password\": \"Ishan123\",\r\n        \r\n    }";
//   var raw = JSON.stringify({
//     // "id": form1.id.value,
//     "eventName": form1.eventName.value,
//     "date": form1.date.value,
//     "country": form1.country.value,
//     // "id":form1.id.value,
    
//     // "email": form1.email.value,
    
//     });
  
//   var requestOptions = {
//     method: 'PUT',
//     headers: myHeaders,
//     body: raw,
//     redirect: 'follow'
//   };
//   // Baseurl+"/api/Calender/"+email
//   fetch(Baseurl+"/api/Calender/"+id, requestOptions)
//     .then(response => response.json())
//     .then(result => {
//       console.log(result);
//       if(result.id==null)
//       {
//         alert("Event Not Found!")
//       }
//       else
//       {
//         alert("Edited Successfully!");
//         FetchData();
//       }
//       // console.log(result);
     
//   })
//     .catch(error => alert("An Error Occured!"));
// }




















































// function myFunction() {
//     var x = document.getElementById("JanDIV");
//     if (x.style.display === "none") {
//       x.style.display = "block";
//     } else {
//       x.style.display = "none";
//     }
//   }


//   function myFunction() {
//     var x = document.getElementById("myDIV");
//     if (x.style.display === "none") {
//       x.style.display = "block";
//     } else {
//       x.style.display = "none";
//     }
//   }


// function myFunction() {
//     var x = document.getElementById("myDIV");
//     if (x.style.display === "none") {
//       x.style.display = "block";
//     } else {
//       x.style.display = "none";
//     }
//   }

//   function myFunction() {
//     var x = document.getElementById("myDIV");
//     if (x.style.display === "none") {
//       x.style.display = "block";
//     } else {
//       x.style.display = "none";
//     }
//   }


//   function myFunction() {
//     var x = document.getElementById("myDIV");
//     if (x.style.display === "none") {
//       x.style.display = "block";
//     } else {
//       x.style.display = "none";
//     }
//   }



//   function myFunction() {
//     var x = document.getElementById("myDIV");
//     if (x.style.display === "none") {
//       x.style.display = "block";
//     } else {
//       x.style.display = "none";
//     }
//   }


//   function myFunction() {
//     var x = document.getElementById("myDIV");
//     if (x.style.display === "none") {
//       x.style.display = "block";
//     } else {
//       x.style.display = "none";
//     }
//   }


//   function myFunction() {
//     var x = document.getElementById("myDIV");
//     if (x.style.display === "none") {
//       x.style.display = "block";
//     } else {
//       x.style.display = "none";
//     }
//   }



//   function myFunction() {
//     var x = document.getElementById("myDIV");
//     if (x.style.display === "none") {
//       x.style.display = "block";
//     } else {
//       x.style.display = "none";
//     }
//   }



//   function myFunction() {
//     var x = document.getElementById("myDIV");
//     if (x.style.display === "none") {
//       x.style.display = "block";
//     } else {
//       x.style.display = "none";
//     }
//   }



//   function myFunction() {
//     var x = document.getElementById("myDIV");
//     if (x.style.display === "none") {
//       x.style.display = "block";
//     } else {
//       x.style.display = "none";
//     }
//   }





//   function myFunction() {
//     var x = document.getElementById("myDIV");
//     if (x.style.display === "none") {
//       x.style.display = "block";
//     } else {
//       x.style.display = "none";
//     }
//   }