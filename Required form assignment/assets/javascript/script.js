$(window).ready(function()  {
  $('#required-form').validate({
    rules:{
      file: {
        required: true,
        accept: "image/*",
      },
      name: {
        required: true,
      },
      gender:{
        required: true,
      },
      age: {
        min: 10,
        required: true,
        number: true,
      },
      dob: {
        required: true,
        depends: function(element) {
          return $("#age").is(":filled");
        },
      },
      color: {
        required: true,
      },
      country: {
        required: true,
      },
      email: {
        required: true,
        email: false,
      },
      mobile: {
        required: true,
        number: true,
        minlength: 10,
      },
      address: {
        required: true,
        minlength: 5,
      },
      mcontact: {
        required: true,
      }
    },
    errorPlacement: function(error, element) {
      if (element.hasClass('customError')) {
      }
      else {
        element.after(error);
      }
    }
  });
  function readURL(input) {
        if (input.files) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#preview').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

  $("#inputFile").change(function () {
    readURL(this);
  });
  $('#required-form').on('submit', function(e)  {
    if(!email.validity.valid) {
      showError();
      e.preventDefault();
      nameValidation();
    }
  });
  var nameId = document.getElementById('name');
  nameId.addEventListener('input', function (){
    nameValidation();
  });
  function nameValidation() {
    var space = ' ';
    if ( $('#name').val().search(/\s/g)  == -1){
      $('#name-error').text('Please provide full name');
      console.log("No Match!");
      console.log($('#name').val());
    }
    else{
      $('#name-error').addClass('name-class');
      console.log("Match!");
      console.log($('#name').val());
    }
  }

  var email = document.getElementById('Email');
  var emailError = document.getElementById('email-error');

  email.addEventListener('input', function (event) {

    if (email.validity.valid) {
      emailError.innerHTML = '';
      emailError.className = 'error';
    } else {
      showError();
    }
  });

  function showError() {
    if(email.validity.typeMismatch) {
      emailError.innerHTML = 'Entered value needs to be an e-mail address.';
    }
    emailError.className = 'error active';
  }
});

function updateTextInput1(val){
  document.getElementById('hight-val').value=val;
}
function updateTextInput2(val){
  document.getElementById('salary-val').value=val;
}
