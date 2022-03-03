var departmentOption;
var locationOption;
var selectedDepartment;
var selectedLocation;
var selectedEmployee;
var firstName;
var lastName;
var email;
var jobTitle;
var departmentID;
var locId;
var locName;


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
    $('#addDepartmentName').val('');

    populate1();
  });

  $(document).on("click", "#confirm-department-add-btn", function(){
    addDepartment();
  });

  // Add Location

  $(document).on("click", "#location-add-btn", function(){
    $("#add-location-modal").modal("show");
    $('#addLocationName').val('');
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

  
  //Delete Department 

   $(document).on("click", "#confirm-delete-department-btn", function(){
    console.log("The Department is: ", selectedDepartment);
    checkDependency(selectedDepartment);
  });

  //Delete Location 

  $(document).on("click", "#confirm-delete-location-btn", function(){
    console.log("The Department is: ", selectedLocation);
    checkLocationDependency(selectedLocation);
  });

  //Delete Employee 

  $(document).on("click", "#confirm-delete-employee-btn", function(){
    console.log("The Employee is: ", selectedEmployee);
    onDeleteEmployee(selectedEmployee);
  });

  //Edit Employee 

  $(document).on("click", "#confirm-employee-edit-btn", function(){
    console.log("The Employee is: ", selectedEmployee);
    onEditEmployee(selectedEmployee);
  });

  //Edit Department 

  $(document).on("click", "#confirm-department-edit-btn", function(){
    console.log("The Department is: ", selectedDepartment);
    onEditDepartment(selectedDepartment);
  });

   //Edit Location 

   $(document).on("click", "#confirm-location-edit-btn", function(){
    console.log("The Location is: ", selectedLocation);
    onEditLocation(selectedLocation);
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
                    <td><button type="button" class="edit" data-bs-toggle="modal" data-bs-target="#edit-employee-modal" value="${person.id}"><i class="fas fa-edit"></i></button>
                <button type="button" class="bin" data-bs-toggle="modal" data-bs-target="#delete-employee-modal" value="${person.id}"><i class="far fa-trash-alt"></i></button></td>`);
                });

                $(document).ready(function() {
                  $('.bin').click(function() {
                      
                      selectedEmployee = this.value;
                      console.log("it has worked", this.value, selectedEmployee);
                  });
              })

              $(document).ready(function() {
                $('.edit').click(function() {
                    
                    selectedEmployee = this.value;
                    console.log("edit button has worked", this.value, selectedEmployee);
                    getEdit(selectedEmployee);

                });
            })
                            
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
                   
                    <td><button type="button" class="edit" data-bs-toggle="modal" data-bs-target="#edit-department-modal" " value="${dep.id}"><i class="fas fa-edit"></i></button>
                <button type="button" class="bin" data-bs-toggle="modal" data-bs-target="#delete-department-modal"  value="${dep.id}  "><i class="far fa-trash-alt"></i></button></td>`);

                
                });

                $(document).ready(function() {
                  $('.bin').click(function() {
                      
                      selectedDepartment = this.value;
                      console.log("it has worked", this.value, selectedDepartment);
                  });
              }),

              $(document).ready(function() {
                $('.edit').click(function() {
                    
                    selectedDepartment = this.value;
                    console.log("it has worked", this.value, selectedDepartment);
                    getDepartmentEdit(selectedDepartment);
                });
            })
                
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
                   
                    <td class="silly-buttons"><button type="button" class="edit" data-bs-toggle="modal" data-bs-target="#edit-location-modal" value="${loc.id}"><i class="fas fa-edit"></i></button>
                <button type="button" class="bin" data-bs-toggle="modal" data-bs-target="#delete-location-modal" value="${loc.id}"><i class="far fa-trash-alt"></i></button></td>`);
                });

                $(document).ready(function() {
                  $('.bin').click(function() {
                      
                      selectedLocation = this.value;
                      console.log("Location bin has worked", this.value, selectedLocation);
                  });
              })

              $(document).ready(function() {
                $('.edit').click(function() {
                    
                    selectedLocation = this.value;
                    console.log("edit location button has worked", this.value, selectedLocation);
                    getLocationEdit(selectedLocation);

                });
            })
                            
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
                    $('#editEmployeeDepartment').append(`<option value="${dep.id}">${dep.name}</option>
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
                  $('#addDepartmentLocation').append(`<option value="${loc.id}">${loc.name}</option>
                  `)
                  $('#editDepartmentLocation').append(`<option value="${loc.id}">${loc.name}</option>
                  `)
                    

              });
                          
          }
      
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.responseText);
      }
  }); 
}




//Add Functions

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
      url: './php/insertEmployee.php',
      type: 'POST',
      dataType: 'json',
      data: {
          firstName: $("#addEmployeeFirstName").val(),
          lastName: $("#addEmployeeLastName").val(),
          email: $("#addEmployeeEmail").val(),
          jobTitle: $("#addEmployeeJobTitle").val(),
          departmentID: $("#addEmployeeDepartment").val(),
      },
      success: function(result) {

          console.log(result);
          if (result.status.name == "ok") {
              buildTable();
              
          }
      },
      error: function(jqXHR, textStatus, errorThrown) {
      console.log(jqXHR.responseText,  textStatus, errorThrown);
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

// Delete Functions

//Delete Department
  
const onDeleteDepartment = (selectedDepartment) => {
  console.log("Delete Departments has been called.", selectedDepartment)
  $.ajax({
    url: './php/deleteDepartmentByID.php',
    type: 'POST',
    dataType:'json',
    data: {
      id: selectedDepartment,
    },

    success: (response) => {
      console.log(response);
   
        departmentBuildTable();
        $('#departments').modal('hide');
        showSuccessModal('Department', 'deleted');
      
    },
    
  });
};

const  checkDependency = (selectedDepartment) => {
  console.log("Check Dependency has been called.", selectedDepartment)
  $.ajax({
    url: './php/getEmployeeDepartment.php',
    type: 'POST',
    dataType: 'json',
    data: {
      departmentID: selectedDepartment,
    },

    success: (response) => {
      console.log(response);
      if (response.data.length !== 0) {
       console.log("There's something here")
       $('#dependency-modal').modal('show');
      } else {
        console.log("There's nothing here")
        onDeleteDepartment(selectedDepartment);
      }
    },

    error: function(jqXHR, textStatus, errorThrown) {
      console.log(jqXHR.responseText,  textStatus, errorThrown);
      }
    
  });
};


//Delete Employee

const onDeleteEmployee = (selectedEmployee) => {
  console.log("Delete Employee has been called.", selectedEmployee)
  $.ajax({
    url: './php/deleteEmployeeById.php',
    type: 'POST',
    dataType:'json',
    data: {
      id: selectedEmployee,
    },

    success: (response) => {
      console.log(response);
      buildTable();
      $('#departments').modal('hide');
    }
    
  });
};



//Delete Location
  
const onDeleteLocation = (selectedLocation) => {
  console.log("Delete Departments has been called.", selectedLocation)
  $.ajax({
    url: './php/deleteLocationByID.php',
    type: 'POST',
    dataType:'json',
    data: {
      id: selectedLocation,
    },

    success: (response) => {
      console.log(response);
   
        locationBuildTable();
        $('#locations').modal('hide');
        showSuccessModal('Location', 'deleted');
      
    },
    
  });
};

const  checkLocationDependency = (selectedLocation) => {
  console.log("Check Location Dependency has been called.", selectedLocation)
  $.ajax({
    url: './php/getDepartmentsByLocation.php',
    type: 'POST',
    dataType: 'json',
    data: {
      locationID: selectedLocation,
    },

    success: (response) => {
      console.log("Location Dependency Array: ", response);
      if (response.data.length !== 0) {
       console.log("There's something here")
       $('#dependency-modal').modal('show');
      } else {
        console.log("The Location Dependency Array is Empty")
       onDeleteLocation(selectedLocation);
      }
    },

    error: function(jqXHR, textStatus, errorThrown) {
      console.log(jqXHR.responseText,  textStatus, errorThrown);
      }
    
  });
};

  //Edit Functions

  const  getEdit = (selectedEmployee) => {
    populate();
    console.log("The selected employee is: ", selectedEmployee);
    $("#editEmployeeFirstName").empty();
    $("#editEmployeeLastName").empty();
    $("#editEmployeeEmail").empty();
    $("#editEmployeeJobTitle").empty();
    $("#editEmployeeDepartment").empty();
    $(".edit-name").empty();
    
    $.ajax({
        url: "./php/getPersonnelByID.php",
        type: 'POST',
        dataType: 'json',
        data: {
          id: selectedEmployee,
        },

        
        
        success: function(result) {

             console.log("Get Employee for edit is Working", result);

             if (result.status.name == "ok") {
                
              result.data.forEach(loc => {
                  $('#all-body').append(`<tr>
                
                  <td>&nbsp&nbsp&nbsp&nbsp${loc.name}</td>
                 
                  <td class="silly-buttons"><button type="button" class="edit" data-bs-toggle="modal" data-bs-target="#edit-location-modal" value="${loc.id}"><i class="fas fa-edit"></i></button>
              <button type="button" class="bin" data-bs-toggle="modal" data-bs-target="#delete-location-modal" value="${loc.id}"><i class="far fa-trash-alt"></i></button></td>`);
              });

              $(document).ready(function() {
                $('.bin').click(function() {
                    
                    selectedLocation = this.value;
                    console.log("Location bin has worked", this.value, selectedLocation);
                });
            })
                          
          }
            
            if (result.status.name == "ok") {
                
              result.data.forEach(emp => {
                $('.edit-name').html(
                  `Edit ${emp.firstName} ${emp.lastName}`
                );
                $('#editEmployeeFirstName:text').val(emp.firstName);
                $('#editEmployeeLastName:text').val(emp.lastName);
                $('#editEmployeeEmail').val(emp.email);
                $('#editEmployeeJobTitle:text').val(emp.jobTitle);

              }

              );
            
            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log(jqXHR.responseText, textStatus, errorThrown);
        }
    }); 
}

const onEditEmployee = (selectedEmployee) => {
  
  
   
     firstName = $('#editEmployeeFirstName')[0].value;
     lastName = $('#editEmployeeLastName')[0].value;
     email = $('#editEmployeeEmail')[0].value;
     jobTitle = $('#editEmployeeJobTitle')[0].value;
     departmentID = $('#editEmployeeDepartment')[0].value;

    console.log(firstName, lastName, email, jobTitle, departmentID)
    $.ajax({
      url: `./php/editEmployee.php`,
      type: 'POST',
      dataType: 'json',
      data: {
        id: selectedEmployee,
        firstName: firstName,
        lastName: lastName,
        email: email,
        jobTitle: jobTitle,
        departmentID: departmentID

      },

      success: () => {
        buildTable();
        $('#edit-employee-modal').modal('hide');
        showEditSuccessModal();
      },
      failure: () => {
        $('#edit-employee-modal').modal('hide');
        showErrorModal();
      },

      error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.responseText,  textStatus, errorThrown);
        }
    });
  
};


const  getDepartmentEdit = (selectedDepartment) => {
  populate1();

  console.log("The selected department is: ", selectedDepartment);
  $("#editDepartmentName").empty();
  $("#editDepartmentLocation").empty();
  $(".edit-name").empty();
  $("#demo").empty();
  
  $.ajax({
      url: "./php/getDepartmentByID.php",
      type: 'POST',
      dataType: 'json',
      data: {
        id: selectedDepartment,
      },

      
      
      success: function(result) {

           console.log("Get Department for edit is Working", result);

           
          
          if (result.status.name == "ok") {
              
            result.data.forEach(dep => {
              $('.edit-name').html(
                `Edit ${dep.name}`
              );
              $('#editDepartmentName:text').val(dep.name);
               locId = dep.locationID;
              console.log("Loc ID is:", locId);

            }

            );

            
          
          }

          $.ajax({
            url: "./php/getLocationByID.php",
            type: 'POST',
            dataType: 'json',
            data: {
              id: locId,
            },
      
            
            
            success: function(result) {
      
                 console.log("Get Location for Department edit is Working", result);
      
                 
                
                if (result.status.name == "ok") {
                    
                  result.data.forEach(loc => {
                   
                    locName = loc.name;
                    locId = loc.locationID;
                    console.log("Loc Name is:", locName);
                    document.getElementById("demo").innerHTML = "Location (currently " + loc.name + ")";
                  }
      
                  );
      
                  
                
                }
      
      
                
            
            },
            error: function(jqXHR, textStatus, errorThrown) {
              console.log(jqXHR.responseText, textStatus, errorThrown);
            }
        }); 


          
      
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.responseText, textStatus, errorThrown);
      }
  }); 
}


const onEditDepartment = (selectedDepartment) => {
  
  
   
  departmentName = $('#editDepartmentName')[0].value;
  locationID = $('#editDepartmentLocation')[0].value;

 console.log(departmentName, locationID)
 $.ajax({
   url: `./php/editDepartment.php`,
   type: 'POST',
   dataType: 'json',
   data: {
     id: selectedDepartment,
     name: departmentName,
     locationID: locationID,
     

   },

   success: () => {
     departmentBuildTable();
     $('#edit-department-modal').modal('hide');
     showEditSuccessModal();
   },
   failure: () => {
     $('#edit-department-modal').modal('hide');
     showErrorModal();
   },

   error: function(jqXHR, textStatus, errorThrown) {
     console.log(jqXHR.responseText,  textStatus, errorThrown);
     }
 });

};


const  getLocationEdit = (selectedLocation) => {
 

  console.log("The selected location is: ", selectedLocation);
  $("#editLocationName").empty();
  $(".edit-name").empty();
  
  $.ajax({
    url: "./php/getLocationByID.php",
    type: 'POST',
    dataType: 'json',
    data: {
      id: selectedLocation,
    },

    
    
    success: function(result) {

         console.log("Get Location for Location edit is Working", result);

         
        
        if (result.status.name == "ok") {
            
          result.data.forEach(loc => {
            $('.edit-name').html(
              `Edit ${loc.name}`
            );
            $('#editLocationName:text').val(loc.name);
            locName = loc.name;
            locId = loc.locationID;
            console.log("Loc Name is:", locName);
            
          }

          );

          
        
        }


        
    
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(jqXHR.responseText, textStatus, errorThrown);
    }
}); 
  
}

const onEditLocation = (selectedLocation) => {
  
  
   
  locationName = $('#editLocationName')[0].value;
  

 console.log(locName);
 $.ajax({
   url: `./php/editLocation.php`,
   type: 'POST',
   dataType: 'json',
   data: {
     id: selectedLocation,
     name: locationName,
     
     

   },

   success: () => {
     locationBuildTable();
     $('#edit-location-modal').modal('hide');
     showEditSuccessModal();
   },
   failure: () => {
     $('#edit-location-modal').modal('hide');
     showErrorModal();
   },

   error: function(jqXHR, textStatus, errorThrown) {
     console.log(jqXHR.responseText,  textStatus, errorThrown);
     }
 });

};







//Error and Success Modals

function showSuccessModal () {
  $('#success-message').html(`Entry Deleted`);
  $('#success-modal').modal('show'); }

function showEditSuccessModal () {
    $('#success-message').html(`Entry Edited`);
    $('#success-modal').modal('show'); }

  function showErrorModal () {
      $('#error-message').html(
        'There was a problem with this action. Please try again later'
      );
      $('#error-modal').modal('show');
    };