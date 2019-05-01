    const load = () => {
        document.getElementById("myButton").value = "Refresh data";
          this.data = [{
            name: "sahil",
            middle_name: 'none',
            last_name: "kansal",
            address: 'home',
            email: 'abc@gmail.com',
            phone_no: '123456789',
            role: 'manager'
        },
        {
            name: "john",
            middle_name: 'none',
            last_name: "terry",
            address: 'home',
            email: 'abc@gmail.com',
            phone_no: '123456789',
            role: 'manager'
        },
        {
            name: "luke",
            middle_name: 'none',
            last_name: "shaw",
            address: 'home',
            email: 'abc@gmail.com',
            phone_no: '123456789',
            role: 'manager'
        }
        ]
        this.col = ['name', 'middle_name', 'last_name', 'address', 'email', 'phone_no', 'role']
        render()
    }
    const render = () => {
        document.getElementById("table").innerHTML = `<tr>
        <td>name</td>
        <td>middle name</td>
        <td>last name</td>
        <td>address</td>
        <td>email</td>
        <td>phone no</td>
        <td>role</td>
        <td>`+ data.map((id, index) => `
        <tr id="${index + 1}">
        <td>${id.name}</td>
        <td>${id.middle_name}</td>
        <td>${id.last_name}</td>
        <td>${id.address}</td>
        <td>${id.email}</td>
        <td>${id.phone_no}</td>
        <td>${id.role}</td>
        <td>
        <button id='${index + 1}' value='edit' id='edit' onClick='edit(${index})'class='btn btn-info'>edit</button>
        </td>
        <td>
        <button id='${index + 1}' onClick='deleteUser(${index})'class="btn btn-danger">delete</button>
        </td>
        </tr>`).join('')
        const table = document.getElementById("table");
        const rowCount = table.rows.length;
        const row = table.insertRow(rowCount);
        // const colCount = table.rows[0].cells.length;
        for (let i = 0; i < 7; i++) {
            const newcell = row.insertCell(i);
            newcell.innerHTML = `<tr><td><input type='text' id='new'class="form-control"></input></td>`;
        }
        const newcell = row.insertCell(7);
        newcell.innerHTML = `<td><button class="btn btn-info" onclick=createNew(${data.length+1})>add</button></td>`;
    }
    const save = (value) => {
        const activeRow = value;
        const tab = document.getElementById('table').rows[activeRow];
        let obj = {};
        for (let i = 0; i < this.col.length; i++) {
            const td = tab.getElementsByTagName("td")[i];
            if (td.childNodes[0].getAttribute('type') == 'text') {
                const txtVal = td.childNodes[0].value;
                console.log(txtVal)
                if (txtVal != '') {
                    obj[this.col[i]] = txtVal.trim();
                }
                else {
                    // obj = '';
                    alert('all fields are compulsory');
                    break;
                }
            }
        }
        this.data[value - 1] = obj;             // PUSH (ADD) DATA TO THE JSON ARRAY.
        render()                            // REFRESH THE TABLE.
    }
    const deleteUser = (value) => {
        data.splice((value), 1);
        render()
    };
    const edit = (value) => {
        const activeRow = value + 1;
        let tab = document.getElementById('table').rows[activeRow];
        for (let i = 0; i < this.col.length; i++) {
            const td = tab.getElementsByTagName("td")[i];
            const ele = document.createElement('input');
            ele.setAttribute('type', 'text');
            ele.setAttribute('value', td.innerText);
            ele.setAttribute('class',"form-control")
            console.log(td.innerText)
            td.innerText = '';
            td.appendChild(ele);
        }
        tab.getElementsByTagName("td")[7].innerHTML = `<button onclick='save(${activeRow})'class="btn btn-success">save</button><button style='margin-left: 3px' onclick='render()'class="btn btn-warning">discard</button>`
    }
    const createNew = (value) => {
        console.log(value)
        let tab = document.getElementById('table').rows[value];
        const obj = {};
        // ADD NEW VALUE TO Data ARRAY.      
        for (let i = 0; i < this.col.length; i++) {
            const td = tab.getElementsByTagName("td")[i];
            if (td.childNodes[0].getAttribute('type') == 'text') {
                const txtVal = td.childNodes[0].value;
                if (txtVal != '') {
                    obj[this.col[i]] = txtVal.trim();
                }
                else {
                    // obj = '';
                    alert('all fields are compulsory');
                    break;
                }
            }
        }
        data.push(obj);
        render()
    }