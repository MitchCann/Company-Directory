//PRE LOADER
$(window).on('load', function () {
    console.log($('#preloader'));
    if ($('#preloader').length) {
    $('#preloader').delay(100).fadeOut('slow', function () {
    $(this).remove();
            });
        }

       buildTable();

    });

//Big Filters
    $( "#departments-btn" ).click(function() {
        $("#departments").modal("show");
      });

      $( "#locations-btn" ).click(function() {
        $("#locations").modal("show");
      });

//Filters
    $( "#employee-filter-department-btn" ).click(function() {
        $("#filter-by-department-modal").modal("show");
     });

  $( "#employee-filter-location-btn" ).click(function() {
     $("#employee-filter-by-location-modal").modal("show");
    });


//Add Employee
$( "#employee-add-btn" ).click(function() {
    $("#add-employee-modal").modal("show");
  });


//Employee Modals
    $( ".edit" ).click(function() {
         $("#edit-employee-modal").modal("show");
    });

    $( ".bin" ).click(function() {
        $("#delete-employee-modal").modal("show");
   });


//All Employees 

function buildTable(){
    $.ajax({
        url: "./php/getAll.php",
        type: 'POST',
        dataType: 'json',
        
        success: function(result) {

             console.log("Get All is Working", result);
            
            if (result.status.name == "ok") {
                
                result.data.forEach(person => {
                    $('#all-body').append(`<tr><td>${person.firstName + " " + person.lastName}</td>
                    <td>${person.department}</td>
                    <td>${person.location}</td>
                    <td>${person.email}</td>
                    <td><button type="button" class="edit" data-bs-toggle="modal" data-bs-target="#edit-employee-modal"><i class="fas fa-edit"></i></button>
                <button type="button" class="bin" data-bs-toggle="modal" data-bs-target="#delete-employee-modal" "><i class="far fa-trash-alt"></i></button></td>`);
                });
                            
            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log(jqXHR.responseText);
        }
    }); 
}



