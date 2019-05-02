    const load = () => {
        this.category=['manager','admin'],
        document.getElementById("myButton").value = "Refresh data";
          
       
        this.col = ['first_name', 'middle_name', 'last_name', 'address', 'email', 'phone_no', 'role']
        render()

    }
    const render = () => {
        document.getElementById("table").innerHTML = `<thead><tr>
        <th>first name</th>
        <th>middle name</th>
        <th>last name</th>
        <th>address</th>
        <th>email</th>
        <th>phone no</th>
        <th>role</th>
        <th colspan=2>actions</th></thead><tbody>`+ this.data.map((id, index) => `
        <tr id="${index + 1}">
        <td>${id.first_name}</td>
        <td>${id.middle_name}</td>
        <td>${id.last_name}</td>
        <td>${id.address}</td>
        <td pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$">${id.email}</td>
        <td>${id.phone_no}</td>
        <td>${id.role}</td>
        <td>
        <button id='${index + 1}' value='edit' id='edit' onClick='edit(${index})'class='btn btn-info'>edit</button>
        </td>
        <td>
        <button id='${index + 1}' onClick='deleteUser(${index})'class="btn btn-danger">delete</button>
        </td>
        </tr>`).join('') + `</tbody>`

        const table = document.getElementById("table");
        const rowCount = table.rows.length;
        const row = table.insertRow(rowCount);
        for (let i = 0; i < this.col.length; i++) {
             if(i===6){const newcell = row.insertCell(i);
                newcell.innerHTML =`<td><select>
            <option value="manager">manager</option>
            <option value="admin">admin</option>
          </select></td>`}
            else{
                const newcell = row.insertCell(i);
            newcell.innerHTML = `<td><input type='text' id='new'class="form-control"></input></td>`;
            }
        }
        const newcell = row.insertCell(7);
        newcell.innerHTML = `<tr><td><button class="btn btn-info" onclick=save(${data.length+1})>add</button></td><tr>`;
        // const newcelll = row.insertCell(8);
        // newcelll.innerHTML = `<td></td>`
    }
    const save = (value) => {
        const activeRow = value;
        const tab = document.getElementById('table').rows[activeRow];
        let obj = {};
        for (let i = 0; i < this.col.length; i++) {
            const td = tab.getElementsByTagName("td")[i];

                const txtVal = td.childNodes[0].value;
             //   console.log(txtVal)
                if(i===4){
                   // debugger;
                    
                     if(!/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(txtVal)){
                        obj=''  
                        alert('email invalid')
                        break;
                     }
                   else{ obj[this.col[i]] = txtVal.trim(); }  
                 }
                 else if(i===5){
                     if(!/^\d{10}$/.test(txtVal)){
                         obj=''
                         alert('phone no. error')
                     }
                     else{ obj[this.col[i]] = txtVal.trim(); }  
                 }
            else if (txtVal !== ''||i===1) {
                    obj[this.col[i]] = txtVal.trim();            
                }
                
               
                else {
                     obj = '';
                     
                    alert('all fields are compulsory');
                    break;
                }
            
        }
        if (Object.keys(obj).length > 0) { 
        this.data[value - 1] = obj;             // PUSH (ADD) DATA TO THE JSON ARRAY.
        render()                           } // REFRESH THE TABLE.
    }
    const deleteUser = (value) => {
        data.splice((value), 1);
        render()
    };
    const edit = (value) => {
        const activeRow = value + 1;
        let tab = document.getElementById('table').rows[activeRow];
        for (let i = 0; i < this.col.length; i++) {
            if(i===4){
                const td = tab.getElementsByTagName("td")[i];
            const ele = document.createElement('input');
            ele.setAttribute('type', 'email');
            ele.setAttribute('value', td.innerText);
            ele.setAttribute('class',"form-control")
            // console.log(td.innerText)
            td.innerText = '';
            td.appendChild(ele);
            }
           else if(i===6){
            
                var td = tab.getElementsByTagName("td")[i];
                var ele = document.createElement('select');      // DROPDOWN LIST.
             
                for (k = 0; k < this.category.length; k++) {
                    ele.innerHTML = ele.innerHTML +
                        '<option value="' + this.category[k] + '">' + this.category[k] + '</option>';
                }
                td.innerText = '';
                td.appendChild(ele);

           }
        else{
            const td = tab.getElementsByTagName("td")[i];
            const ele = document.createElement('input');
            ele.setAttribute('type', 'text');
            ele.setAttribute('value', td.innerText);
            ele.setAttribute('class',"form-control")
           // console.log(td.innerText)
            td.innerText = '';
            td.appendChild(ele);
    }}
    tab.getElementsByTagName("td")[this.col.length].innerHTML = `<button type='sumbit' onclick='save(${activeRow})'class="btn btn-success">save</button><button style='margin-left: 3px' onclick='render()'class="btn btn-warning">discard</button>`             
        }