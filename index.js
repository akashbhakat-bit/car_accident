firebase.auth().onAuthStateChanged(function(user) {
    if (user) {


      // User is signed in.
      //location.replace('main.html');

      document.getElementById("Authentication").style.display = "none";
      document.getElementById("Authentication").className = "menuof";
     
      document.getElementById("Citizen_page").className = "menuon";
      document.getElementById("Citizen_page").style.display = "block";

      document.getElementById("Hospital_page").className= "menuof";
      document.getElementById("Hospital_page").style.display = "block";

      var user = firebase.auth().currentUser;
  
      if(user != null){
  
        var name =       document.getElementById("name_field").value;
        ;
        firebase.database().ref('/users/'+name).on('value',function(snapshot){

            var register=snapshot.val().registered_as;
            if(register=="Citizen"){
                document.getElementById("Citizen_page").className = "menuon";
                document.getElementById("Citizen_page").style.display = "block";

                document.getElementById('Citizen_page_name').innerHTML=snapshot.val().name;
                document.getElementById('Citizen_page_mobile').innerHTML=snapshot.val().mobile;
                document.getElementById('Citizen_page_age').innerHTML=snapshot.val().age;
                document.getElementById('Citizen_page_car_name').innerHTML=snapshot.val().car_name;
                document.getElementById('Citizen_page_car_number').innerHTML=snapshot.val().car_number;

            }else{
                document.getElementById("Hospital_page").className= "menuof";
                document.getElementById("Hospital_page").style.display = "block";

            }

        })
        //document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;
       // document.getElementById("name").innerHTML="Welcome "+ name;
      }
      
        firebase.auth().signOut();
      
      
      
  
    } else {
      // No user is signed in.
  
      //document.getElementById("user_div").style.display = "none";
      //document.getElementById("login_div").style.display = "block";
  
    }
  });
  
  function login(){
  
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;
  
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
  
      window.alert("Error : " + errorMessage);
  
      // ...
    });
  
  }
  
  function logout(){
    firebase.auth().signOut();
  }
  
  
function handleSignUp() {
    var email = document.getElementById('sign_email').value;
    var password = document.getElementById('sign_password').value;
    var name= document.getElementById('fullname').value;
    var mobile= document.getElementById('mobileno').value;
    var age = document.getElementById('age').value;
    var car_name=document.getElementById('car_name').value;
    var car_number=document.getElementById('car_number').value;
    var registered_as=document.getElementById('select_user').value;
    if (email.length < 4) {
      alert('Please enter an email address.');
      return;
    }
    if (password.length < 4) {
      alert('Please enter a password.');
      return;
    }
    // Create user with email and pass.
    // [START createwithemail]
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode == 'auth/weak-password') {
      alert('The password is too weak.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
    // [END_EXCLUDE]
  });
  
  
  firebase.database().ref('/users/'+name).set({
    name: name,
    email: email,
    mobile: mobile,
    age: age,
    car_name:car_name,
    car_number:car_number,
    registered_as:registered_as
  });
  
  
  alert("Account Created Successfully.");
  
  
  
  
  
  }

  function showSignUp(){

    document.getElementById("login_part").style.display = "none";
    document.getElementById("login_part").className = "menuof";
    
    document.getElementById("signup_div").style.display = "block";
    document.getElementById('signup_div').className="menuon";
 
    


    
  }

  
  function sendSOS(){


  }

  function myFunction(){

    document.getElementById("signup_div").style.display = "none";

    document.getElementById('signup_div').className="menuof";

    
    document.getElementById("Citizen_page").style.display = "none";

    document.getElementById('Citizen_page').className="menuof";

    
    document.getElementById("Hospital_page").style.display = "none";

    document.getElementById('Hospital_page').className="menuof";
  }