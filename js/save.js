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
    $( "#employees-btn" ).click(function() {
        buildTable();
    });

    $( "#departments-btn" ).click(function() {
        departmentBuildTable();
      });

      $( "#locations-btn" ).click(function() {
        locationBuildTable();
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

  $(document).on("click", "#employee-add-btn", function(){
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
    $("#all-body").empty();
    $("#newSpan").empty();
    
    $('#newSpan').append(`<button id="employee-add-btn" class="btn btn-secondary add-btn"><i class="fas fa-plus"></i> Add Employee`);
    document.getElementById("table-title").innerHTML = "Employees";
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

//All Departments

function departmentBuildTable(){

    $("#all-body").empty();
    $("employee-add-btn").empty();
    document.getElementById("employee-add-btn").innerHTML = "<i class=`fas fa-plus`></i> Add Department";

    document.getElementById("table-title").innerHTML = "Departments";
    $.ajax({
        url: "./php/getAllDepartments.php",
        type: 'POST',
        dataType: 'json',
        
        success: function(result) {

             console.log("Get Departments is Working", result);
            
            if (result.status.name == "ok") {
                
                result.data.forEach(dep => {
                    $('#all-body').append(`<tr>
                    <td>${dep.id}</td>
                    <td>${dep.name}</td>
                   
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

//All Locations

function locationBuildTable(){

    $("#all-body").empty();
    $("employee-add-btn").empty();
    document.getElementById("employee-add-btn").innerHTML = "<i class=`fas fa-plus`></i> Add Location";
    document.getElementById("table-title").innerHTML = "Locations";
    $.ajax({
        url: "./php/getAllLocations.php",
        type: 'POST',
        dataType: 'json',
        
        success: function(result) {

             console.log("Get Locations is Working", result);
            
            if (result.status.name == "ok") {
                
                result.data.forEach(loc => {
                    $('#all-body').append(`<tr>
                    <td>${loc.id}</td>
                    <td>${loc.name}</td>
                   
                    <td class="silly-buttons"><button type="button" class="edit" data-bs-toggle="modal" data-bs-target="#edit-employee-modal"><i class="fas fa-edit"></i></button>
                <button type="button" class="bin" data-bs-toggle="modal" data-bs-target="#delete-employee-modal" "><i class="far fa-trash-alt"></i></button></td>`);
                });
                            
            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log(jqXHR.responseText);
        }
    }); 
}



    