let arr=[1,2,3,3,4,4,5,5,6,6];
function show() {
    let str="";
    for (let i = 0; i < arr.length; i++) {
       str +=`
       <option value="">${arr[i]}</option>
       `
    }
    document.getElementById("di").innerHTML=str;
}
show();

const { value: url } = await Swal.fire({
    input: "url",
    inputLabel: "URL address",
    inputPlaceholder: "Enter the URL"
  });
  if (url) {
    Swal.fire(`Entered URL: ${url}`);
  }