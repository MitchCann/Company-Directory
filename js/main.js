var departmentOption;
var locationOption;


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
    

     $(document).on("click","#employee-filter-department-btn",function() {
        $("#filter-by-department-modal").modal("show");
        departmentFilter();
    });

    $(document).on("click","#employee-filter-location-btn",function() {
        $("#employee-filter-by-location-modal").modal("show");
        locationFilter();
    });

    

    $(document).on("click","#confirm-filter-by-department",function() {
        
        filterDepartment();
    });

    $(document).on("click","#confirm-e-filter-by-location",function() {
        
        filterLocation();
    });

    $("#reset").on("click", function() {
        $("#all-body").empty();
        buildTable();
        
    });

    $("#reset1").on("click", function() {
        $("#all-body").empty();
        buildTable();
        
    });

  

//Add Employee


  $(document).on("click", "#employee-add-btn", function(){
    $("#add-employee-modal").modal("show");
    populate();
  });

  $(document).on("click", "#confirm-employee-add-btn", function(){
    addEmployee();
  });




// Add Department

  $(document).on("click", "#department-add-btn", function(){
    $("#add-department-modal").modal("show");
    populate1();
  });

  $(document).on("click", "#confirm-department-add-btn", function(){
    addDepartment();
  });

  // Add Location

  $(document).on("click", "#location-add-btn", function(){
    $("#add-location-modal").modal("show");
  });

  $(document).on("click", "#confirm-location-add-btn", function(){
    addLocation();
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
    $("#input-span").empty();
    $("#filter-span").empty();
    $('#filter-span').append(`<button id="employee-filter-department-btn" class="btn btn-secondary"> <i class="fas fa-filter"></i> Department</button>`);
    $('#filter-span').append(`<button id="employee-filter-location-btn" class="btn btn-secondary"><i class="fas fa-filter"></i> Location</button>`);
    $('#input-span').append(`<input type="text"placeholder="Search Employees"id="searchMain" onkeyup="searchTable()"/>`);
    $('#newSpan').append(`<button id="employee-add-btn" class="btn btn-secondary add-btn"><i class="fas fa-plus"></i> Add Employee</button>`);
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
    $("#newSpan").empty();
    $("#input-span").empty();
    $("#filter-span").empty();
    $('#input-span').append(`<input type="text"placeholder="Search Departments"id="searchMain" onkeyup="searchDepartment()"/>`);
    
    $('#newSpan').append(`<button id="department-add-btn" class="btn btn-secondary add-btn"><i class="fas fa-plus"></i> Add Department`);

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
                    
                    <td>&nbsp&nbsp&nbsp&nbsp${dep.name}</td>
                   
                    <td><button type="button" class="edit" data-bs-toggle="modal" data-bs-target="#edit-department-modal"><i class="fas fa-edit"></i></button>
                <button type="button" class="bin" data-bs-toggle="modal" data-bs-target="#delete-department-modal" "><i class="far fa-trash-alt"></i></button></td>`);

                    
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
    $("#newSpan").empty();
    $("#input-span").empty();
    $("#filter-span").empty();
    $('#input-span').append(`<input type="text"placeholder="Search Locations"id="searchMain" onkeyup="searchLocation()"/>`);
    
    $('#newSpan').append(`<button id="location-add-btn" class="btn btn-secondary add-btn"><i class="fas fa-plus"></i> Add Location`);
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
                  
                    <td>&nbsp&nbsp&nbsp&nbsp${loc.name}</td>
                   
                    <td class="silly-buttons"><button type="button" class="edit" data-bs-toggle="modal" data-bs-target="#edit-location-modal"><i class="fas fa-edit"></i></button>
                <button type="button" class="bin" data-bs-toggle="modal" data-bs-target="#delete-location-modal" "><i class="far fa-trash-alt"></i></button></td>`);
                });
                            
            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log(jqXHR.responseText);
        }
    }); 
}
    
//Search

function searchTable() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchMain");
    filter = input.value.toUpperCase();
    table = document.getElementById("holiday-table");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  function searchDepartment() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchMain");
    filter = input.value.toUpperCase();
    table = document.getElementById("holiday-table");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  function searchLocation() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchMain");
    filter = input.value.toUpperCase();
    table = document.getElementById("holiday-table");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  //Filters 

  function departmentFilter(){

    $("#department-filter-list").empty();
    
    $.ajax({
        url: "./php/getAllDepartments.php",
        type: 'POST',
        dataType: 'json',
        
        success: function(result) {

             console.log("Filter Departments is Working", result);
            
            if (result.status.name == "ok") {
                
                result.data.forEach(dep => {
                    $('#department-filter-list').append(`<div>
                    <input type="radio" name="departmentRadios" value="${dep.name}"checked>
                    <label for=departmentRadios>${dep.name}</label>
                  </div>`)
                       departmentOption =  $("input[name='departmentRadios']:checked").val();

                });
                            
            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log(jqXHR.responseText);
        }
    }); 
}

function locationFilter(){

    $("#location-filter-list").empty();
    
    $.ajax({
        url: "./php/getAlllocations.php",
        type: 'POST',
        dataType: 'json',
        
        success: function(result) {

             console.log("Filter Locations is Working", result);
            
            if (result.status.name == "ok") {
                
                result.data.forEach(loc => {
                    $('#location-filter-list').append(`<div>
                    <input type="radio" name="locationRadios" value="${loc.name}"checked>
                    <label for=locationstRadios>${loc.name}</label>
                  </div>`)
                       locationOption =  $("input[name='locationRadios']:checked").val();

                });
                            
            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log(jqXHR.responseText);
        }
    }); 
}

var departmentOption;

function filterDepartment() {
    console.log($("input[name='departmentRadios']:checked").val())
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = $("input[name='departmentRadios']:checked").val();
    filter = input.toUpperCase();
    table = document.getElementById("holiday-table");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }


  function filterLocation() {
    console.log($("input[name='locationRadios']:checked").val())
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = $("input[name='locationRadios']:checked").val();
    filter = input.toUpperCase();
    table = document.getElementById("holiday-table");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[2];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  
// Populate Dropdowns
  
function populate(){

    $("#addEmployeeDepartment").empty();
    
    $.ajax({
        url: "./php/getAllDepartments.php",
        type: 'POST',
        dataType: 'json',
        
        success: function(result) {

             console.log("Populate Departments is Working", result);
            
            if (result.status.name == "ok") {
                
                result.data.forEach(dep => {
                    $('#addEmployeeDepartment').append(`<option value="${dep.id}">${dep.name}</option>
                    `)
                      

                });
                            
            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log(jqXHR.responseText);
        }
    }); 
}

function populate1(){

  $("#addDepartmentlocation").empty();
  
  $.ajax({
      url: "./php/getAllLocations.php",
      type: 'POST',
      dataType: 'json',
      
      success: function(result) {

           console.log("Populate Locations is Working", result);
          
          if (result.status.name == "ok") {
              
              result.data.forEach(loc => {
                  $('#addDepartmentLocation').append(`<option value="${loc.name}">${loc.name}</option>
                  `)
                    

              });
                          
          }
      
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.responseText);
      }
  }); 
}




//Insert Functions

function addDepartment(){

  const name = $('#addDepartmentName')[0].value;
  const locationID = $('#addDepartmentLocation')[0].value;
  console.log(name, locationID);
    
    $.ajax({
        url: "./php/insertDepartment.php",
        type: 'POST',
        dataType: 'json',
        data: {
          name: name,
          locationID: locationID
        },
        success: function(result) {

             console.log("Add Department is Working", result);
            
            if (result.status.name == "ok") {
                
              departmentBuildTable();
                            
            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log(jqXHR.responseText);
        }
    }); 
}

function addEmployee() {
  $.ajax({
      url: './php/getAllLocations.php',
      type: 'POST',
      dataType: 'json',
      data: {
          lastName: $("#addEmployeeFirstName").val(),
          firstName: $("#addEmployeeLastName").val(),
          email: $("#addEmployeeEmail").val(),
          jobTitle: $("#addEmployeeJobTitle").val(),
          department: $("#addEmployeeDepartment").val(),
      },
      success: function(result) {

          // console.log(result);
          if (result.status.name == "ok") {
              buildTable();
              
          }
      },
      error: function(jqXHR, textStatus, errorThrown) {
      //  console.log(jqXHR.responseText,  textStatus, errorThrown);
      }
  }); 
}

function addLocation() {
  $.ajax({
      url: './php/insertLocation.php',
      type: 'POST',
      dataType: 'json',
      data: {
          name: $("#addLocationName").val(),
       
      },
      success: function(result) {

          console.log(result);
          if (result.status.name == "ok") {
              locationBuildTable();
              
          }
      },
      error: function(jqXHR, textStatus, errorThrown) {
      console.log(jqXHR.responseText,  textStatus, errorThrown);
      }
  }); 
}