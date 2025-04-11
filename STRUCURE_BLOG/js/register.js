let users = JSON.parse(localStorage.getItem("users")) || [];
function register() {
   let firstName = document.getElementById("inputFirstname").value.trim();
   let lastName = document.getElementById("inputLastname").value.trim();
   let email = document.getElementById("emailRegister").value.trim();
   let password = document.getElementById("passwordRegister").value.trim();
   let confirmPassword = document.getElementById("confirmPassword").value.trim();
   let id=0;
   if(users.length==0){
     id=1;
   }else{
    id=users[users.length-1].id+1;
   }
   if(firstName.length==0||lastName.length==0||email.length==0||password.length==0||confirmPassword.length==0){
      Swal.fire({
         icon: "error",
         title: "Không được để trống",
         text: "Vui lòng nhập đầy đủ thông tin!",
       });
       return;
   }
   for (let i = 0; i < users.length; i++) {
      if(email===users[i].email){
         Swal.fire({
            icon: "error",
            title: "Email đã tồn tại ",
            text: "Vui lòng đăng nhập",
          });
          document.getElementById("emailRegister").value="";
        return;
      }
  }
   if(email.includes("@")&&(email.endsWith(".com") || email.endsWith(".vn"))){
      if(password.length>=6){
         if(password===confirmPassword){
             let user={
               img:"../assets/images/Avatar.png",
               id:id,
               firstName:firstName,
               lastName:lastName,
               email:email,
               password:password
             }
             users.push(user);
             localStorage.setItem("users",JSON.stringify(users));
             Swal.fire({
               title: "Đăng ký thành công",
               icon: "success",
               draggable: true
            }).then(() => {
               setTimeout(() => {
                  window.location.href = "../pages/login.html";
               }, 1000); 
            });
         }else{
            Swal.fire({
               icon: "error",
               title: "Mật khẩu không trùng khớp ",
               text: "Vui lòng nhập lại!",
             });
             document.getElementById("confirmPassword").value="";
         }
         }else{
         Swal.fire({
            icon: "error",
            title: "Mật khẩu không hợp lệ",
            text: "Vui lòng nhập tối thiểu 6 ký tự !",
          });
          document.getElementById("passwordRegister").value="";
      }
   }else{
      Swal.fire({
         icon: "error",
         title: "Email không hợp lệ",
         text: "Vui lòng nhập đúng email!",
       });
       document.getElementById("emailRegister").value="";
   }
}
register();

// window.location.href = "../pages/login.html"; 