const load = () => {
  (this.role = ["manager", "admin"]),
    (document.getElementById("myButton").value = "Refresh data");
  // this.col = ['first_name', 'middle_name', 'last_name', 'address', 'email', 'phone_no', 'role','id']
  this.col = [
    { colname: "first_name", type: "text", required: "yes" },
    { colname: "middle_name", type: "text", required: "no" },
    { colname: "last_name", type: "text", required: "yes" },
    { colname: "address", type: "text", required: "yes" },
    { colname: "email", type: "email", required: "yes" },
    { colname: "phone_no", type: "number", required: "yes" },
    { colname: "role", type: "select", required: "yes" },
    { colname: "id", type: "id", required: "yes" }
  ];
  render();
};
const render = () => {
  document.getElementById("table").innerHTML = `<thead><tr>
        <th>first name</th>
        <th>middle name</th>
        <th>last name</th>
        <th>address</th>
        <th>email</th>
        <th>phone no</th>
        <th>role</th>
        <th colspan=2>actions</th></thead><tbody>${this.data
          .map((user, index) => {
            return `<tr id=${user.id}>
        <td>${user.first_name}</td>
        <td>${user.middle_name}</td>
        <td>${user.last_name}</td>
        <td>${user.address}</td>
        <td>${user.email}</td>
        <td>${user.phone_no}</td>
        <td>${user.role}</td>
        <td>
        <button value='edit' id='edit' onClick='edit(${
          user.id
        })'class='btn btn-info'>edit</button>
        </td>
        <td>
        <button onClick='deleteUser(${
          user.id
        })'class="btn btn-danger">delete</button>
        </td>
        </tr>`;
          })
          .join("")}</tbody>`;
  const table = document.getElementById("table");
  const rowCount = table.rows.length;
  const row = table.insertRow(rowCount);
  row.id = Date.now();
  for (let i = 0; i < this.col.length - 1; i++) {
    if ("select" === this.col[i].type) {
      const newcell = row.insertCell(i);
      newcell.innerHTML = `<td><select class="form-control">
            <option class="btn btn-primary dropdown-toggle" value="manager">manager</option>
            <option class="btn btn-primary dropdown-toggle" value="admin">admin</option>
          </select></td>`;
    } else {
      const newcell = row.insertCell(i);
      newcell.innerHTML = `<td><input type='text' id='new'class="form-control"></input></td>`;
    }
  }
  const newcell = row.insertCell(this.col.length - 1);
  newcell.innerHTML = `<td><button id=${
    row.id
  } class="btn btn-info" onclick=save(${row.id})>add</button></td><tr>`;
};
const save = id => {
  const tab = document.getElementById(id);
  let obj = {};

  for (let i = 0; i < this.col.length - 1; i++) {
    const td = tab.getElementsByTagName("td")[i];
    const txtVal = td.childNodes[0].value;
    if (this.col[i].type === "email") {
      if (
          
        !/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]{2,5})\.([a-zA-Z]{2,5})$/.test(
          txtVal
        )
      ) {
        obj = "";
        alert("email invalid");
        break;
      } else {
        obj['email'] = txtVal.trim();
      }
    } else if (this.col[i].type === "number") {
      if (!/^\d{10}$/.test(txtVal)) {
        obj = "";
        alert("phone no. error");
      } else {
        obj['phone_no'] = txtVal.trim();
      }
    } else if (txtVal !== "" || this.col[i].required === "no") {
      obj[this.col[i].colname] = txtVal;
      obj.id = id;
    } else {
      obj = "";

      alert("all fields are compulsory");
      break;
    }
  }
  let flag = 0;
  if (Object.keys(obj).length > 0) {
    for (i = 0; i < this.data.length; i++) {
      if (id === this.data[i].id) {
        (flag = "1"), (place = i);
      }
    }
    if (flag === "1") {
      this.data[place] = obj;
    } else this.data.push(obj);
    render();
  }
};
const deleteUser = id => {
  for (i = 0; i < this.data.length; i++) {
    if (id === this.data[i].id) {
      place = i;
    }
  }
  data.splice(place, 1);
  document.getElementById(id).remove();
};
const edit = id => {
  let tab = document.getElementById(id);
  for (let i = 0; i < this.col.length - 1; i++) {
    if ("email" === this.col[i].type) {
      const td = tab.getElementsByTagName("td")[i];
      const ele = document.createElement("input");
      ele.setAttribute("type", "email");
      ele.setAttribute("value", td.innerText);
      ele.setAttribute("class", "form-control");
      td.innerText = "";
      td.appendChild(ele);
    } else if ("select" === this.col[i].type) {
      var td = tab.getElementsByTagName("td")[i];
      var ele = document.createElement("select"); // DROPDOWN LIST.
      ele.setAttribute("class", "form-control");
      for (k = 0; k < this.role.length; k++) {
        ele.innerHTML =
          ele.innerHTML +
          '<option class="btn btn-primary dropdown-toggle" value="' +
          this.role[k] +
          '">' +
          this.role[k] +
          "</option>";
      }
       td.innerText = "";
      td.appendChild(ele);
    } else {
      const td = tab.getElementsByTagName("td")[i];
      const ele = document.createElement("input");
      ele.setAttribute("type", "text");
      ele.setAttribute("value", td.innerText);
      ele.setAttribute("class", "form-control");
      td.innerText = "";
      td.appendChild(ele);
    }
  }
  tab.getElementsByTagName("td")[
    this.col.length - 1
  ].innerHTML = `<button type='sumbit' onclick='save(${id})'class="btn btn-success">save</button><button style='margin-left: 3px' onclick='render()'class="btn btn-warning">discard</button>`;
};
