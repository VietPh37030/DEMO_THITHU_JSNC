let url="http://localhost:3001/product";
let tbody = document.querySelector("tbody");

// call
 fetch(url).then((res)=>res.json()).then((data)=>{
  console.log(data);
  let html = data.map((pro)=>{
    return /*html*/`
    <tr>
                    <td>${pro.id}</td>
                    <td>${pro.name}</td>
                    <td>${pro.price}</td>
                    <td><img src="${pro.image}" alt="" srcset="" style="width: 50px;height: 50px;"></td>
                    <td><button class="btn-edit btn btn-primary  " data-id="${pro.id}">Sua</button>|<button class="btn-del btn btn-danger " data-id="${pro.id}">Xoa</button></td>
                </tr>
    `;
  }).join("");
  tbody.innerHTML =html;

  // xoa
  let BtnDel = document.querySelectorAll(".btn-del");
  BtnDel.forEach((btn)=>{
    let id = btn.dataset.id;
    btn.addEventListener("click",()=>{
      if(confirm("Are you sure")){
        fetch(`${url}/${id}`,{
          method:"DELETE",
        }).then((res)=>res.json()).then(()=>{
          alert("SuccesFull")
        }).catch(err=>console.log(err));
      }
    })
  })



  /// sua
  let BtnEdit = document.querySelectorAll(".btn-edit");
  for(const btn of BtnEdit){
    let id = btn.dataset.id;
    btn.addEventListener("click",()=>{
      fetch(`${url}/${id}`).then((res)=>res.json()).then((data)=>{
        content.innerHTML =  /*html*/`
        <form action="">
        <input type="text" name="" id="pro_name" value="${data.name}" class="form-control mb-2 mx-2 mt-5" placeholder="Name" >
        <input type="text" name="" id="pro_price" value="${data.price}" class="form-control mb-2 mx-2 " placeholder="Price" >
        <input type="text" name="" id="pro_image" value="${data.image}" class="form-control mb-2 mx-2 " placeholder="Image" >
        <input type="submit" name="" id="" value="Sua" class="btn-submit btn btn-primary ">
         </form>
        `;
        let BtnSubmit = document.querySelector(".btn-submit");
        BtnSubmit.addEventListener("click",(e)=>{
          e.preventDefault();
          let pro_name = document.querySelector("#pro_name");
          let pro_price = document.querySelector("#pro_price");
          let pro_image = document.querySelector("#pro_image");
          if (pro_name.value=="") {
            alert("De trong con cak");
            pro_name.focus();
            return false;
          }else if(isNaN(pro_price.value)){
            alert(" Phai la so")
            pro_price.focus();
            return false;
          }
          fetch(`${url}/${id}`,{
            method:"PUT",
            body:JSON.stringify({
              id:id,
              name:pro_name.value,
              price:pro_price.value,
              image:pro_image.value
            })
          }).then((res)=> res.json()).then(()=>{
            alert("Succesfully")
          }).catch(err=>console.log(err));
        }) ; 



      }).catch(err=>console.log(err));
    })
  }
}).catch(err=>console.log(err));

 let BtnAdd = document.querySelector(".btn-add");
 let content = document.querySelector(".content");
  BtnAdd.addEventListener("click",()=>{
    content.innerHTML =  /*html*/`
    <form action="">
    <input type="text" name="" id="pro_name" value="" class="" placeholder="Name" >
    <input type="text" name="" id="pro_price" value="" class="" placeholder="Price" >
    <input type="text" name="" id="pro_image" value="" class="" placeholder="Image" >
    <input type="submit" name="" id="" value="Them" class="btn-submit">
</form>
    `;
    let BtnSubmit = document.querySelector(".btn-submit");
    BtnSubmit.addEventListener("click",(e)=>{
        e.preventDefault();
        let pro_name = document.querySelector("#pro_name");
        let pro_price = document.querySelector("#pro_price");
        let pro_image = document.querySelector("#pro_image");

        // validate
        if (pro_name.value=="") {
          alert("De trong con cak");
          pro_name.focus();
          return false;
        }else if(isNaN(pro_price.value)){
          alert(" Phai la so")
          pro_price.focus();
          return false;
        }

        /// su fetch
        fetch(url,{
          method:"POST",
          body:JSON.stringify({
            name:pro_name.value,
            price:pro_price.value,
            image:pro_image.value
          })
        }).then((res)=>res.json()).then(()=>{
          alert("Succesfull")
        }).catch(err=>console.log(err));
    })
  })