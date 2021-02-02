let employeeList = [{name:"amit", age:14, dept:"sales"},
                    {name:"rahul", age:18, dept:"hr"},
                    {name:"sangeeta", age:24, dept:"hr" }]

employeeList.push({name:"roy", age:27, dept:"sales"})

console.log(employeeList)

let salesEmployeeList = employeeList.map(func)

function func(arr){
    return arr.name
}

console.log(salesEmployeeList)