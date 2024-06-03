// Button status
const buttonStatus = document.querySelectorAll("[button-status]")
if(buttonStatus.length > 0){
    let url = new URL(window.location.href)

    buttonStatus.forEach(button =>{
        button.addEventListener("click",() =>{
            const status = button.getAttribute("button-status")
            
            if(status){
                url.searchParams.set("status",status)
            }else{
                url.searchParams.delete("status")
            }

            window.location.href = url.href
        })
    })
}
// End button status
// Form search

const formSearch = document.querySelector("#form-search")
if(formSearch){
    let url = new URL(window.location.href)
    formSearch.addEventListener("submit",(e) =>{
        const keyword = e.target.elements.keyword.value

        if(keyword){
            url.searchParams.set("keyword",keyword)

        }
        else{
            url.searchParams.delete("keyword")
        }
        window.location.href = url.href
    })
}

// End Form Search

// PagiNation

const buttonsPagination = document.querySelectorAll("[button-pagination]")
if(buttonsPagination){
    let url = new URL(window.location.href)
    buttonsPagination.forEach((button) =>{
        button.addEventListener("click",() =>{
            const page = button.getAttribute("button-pagination")

            url.searchParams.set("page",page)
            
            window.location.href = url.href
        })
    })
}

// End PagiNation

// Change Status

const buttonsChangeStatus = document.querySelectorAll('[button-change-status]')
const formChangeStatus = document.querySelectorAll('#form-change-status')
if(buttonsChangeStatus.length > 0){
    const formChangeStatus = document.querySelector('#form-change-status')
    const path = formChangeStatus.getAttribute("data-path")
    buttonsChangeStatus.forEach(button =>{
        button.addEventListener('click', () =>{
            const statusCurrent = button.getAttribute("data-status")
            
            const id = button.getAttribute('data-id')

            let statusChange = statusCurrent === "active"? "inactive" : "active"
            
            const action = path + `/${statusChange}/${id}?_method=PATCH`

            formChangeStatus.action = action

            formChangeStatus.submit()
        })
    })
}
// end Change Status

// Checkbox-Multi

const checkboxMulti = document.querySelector('[checkbox-multi]')
if(checkboxMulti){
    const inputCheckAll = checkboxMulti.querySelector("input[name = 'checkall']")
    const inputIds = checkboxMulti.querySelectorAll("input[name='id']")

    inputCheckAll.addEventListener('click',() =>{
        if(inputCheckAll.checked){
            inputIds.forEach(input =>{
                input.checked = true
            })
        }
        else{
            inputIds.forEach(input =>{
                input.checked = false
            })
        }
    })

    inputIds.forEach(input =>{
        input.addEventListener('click', () =>{
            const countChecked = checkboxMulti.querySelectorAll("input[name = 'id']:checked").length
            if(countChecked == inputIds.length){
                inputCheckAll.checked = true
            }
            else{
                inputCheckAll.checked = false
            }
        })
    })


}
// End Checkbox-Multi

// Form Change Multi
const formChangeMulti = document.querySelector("[form-change-multi]")
if(formChangeMulti){
    formChangeMulti.addEventListener("submit", (e) =>{
        e.preventDefault()
        const checkboxMulti = document.querySelector('[checkbox-multi]')
        const inputsChecked = checkboxMulti.querySelectorAll("input[name = 'id']:checked")

        const typeChange = e.target.elements.type.value

        if(typeChange == "deleted-all"){
            const isConfirm = confirm("Bạn xác nhận muốn xóa sản phẩm này!")

            if(!isConfirm){
                return;
            }
        } 

        if(inputsChecked.length){
            let ids = []
            const inputIds = formChangeMulti.querySelector("input[name='ids']")

            inputsChecked.forEach((input) =>{
                const id = input.value


                if(typeChange == "change-position"){
                    const position = input.closest("tr").querySelector("input[name='position']").value

                    ids.push(`${id}-${position}`)
                }
                else{
                    ids.push(id)
                }
                
            })
            inputIds.value = ids.join(", ")
            formChangeMulti.submit()
        }else{
            alert("Chọn ít nhất 1 bản ghi")
        }
    })
}
// End Change Multi
// Delete Item

const buttonDelete = document.querySelectorAll("[button-delete]")

if(buttonDelete.length){
    const formDeleteItem = document.querySelector("#form-delete-item")
    const path = formDeleteItem.getAttribute("data-path")
    buttonDelete.forEach(button =>{
        button.addEventListener("click", () =>{
            const isConfirm = confirm("Bạn có chắc muốn xóa sản phẩm này!")
            if(isConfirm){
                const id = button.getAttribute("data-id")
                const action =  `${path}/${id}?_method=DELETE`

                formDeleteItem.action = action
                formDeleteItem.submit()
            }
        })
    })
}

// End Delete Item

// // Show alert
const showAlert = document.querySelector("[show-alert]")
if(showAlert){
    const time = parseInt(showAlert.getAttribute("data-time"))
    closeAlert = showAlert.querySelector("[close-alert]")


    setTimeout(() =>{
        showAlert.classList.add("alert-hidden")
    },time)

    closeAlert.addEventListener("click",() =>{
        showAlert.classList.add("alert-hidden")
    })
    
}

// // End Show Alert

// Deleted Item

const buttonDeleted = document.querySelectorAll("[button-deleted]")

if(buttonDeleted.length){
    const formDeleteItem = document.querySelector("#form-deleted-item")
    const path = formDeleteItem.getAttribute("data-path")
    buttonDeleted.forEach(button =>{
        button.addEventListener("click", () =>{
            const isConfirm = confirm("Bạn có chắc muốn xóa vĩnh viễn sản phẩm này!")
            if(isConfirm){
                const id = button.getAttribute("data-id")
                const action =  `${path}/${id}?_method=DELETE`

                formDeleteItem.action = action
                formDeleteItem.submit()
            }
        })
    })
}

// End Deleted Item