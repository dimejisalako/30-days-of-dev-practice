const users = [
    {id: 1, name: "Kunle", email: "kunle@gmail.com", role: "Admin", department: "Tech"},
    {id: 2, name: "Cheta", email: "cheta@gmail.com", role: "Editor", department: "Marketing" },
    {id: 3, name: "Bukky", email: "bukky@gmail.com", role: "Viewer", department: "Sales" },
    {id: 4, name: "Bello", email: "bello@gmail.com", role: "Admin", department: "Accounting" },
    {id: 5, name: "Edidem", email: "edidem@gmail.com", role: "Editor", department: "Sales" },
    {id: 6, name: "Tumi", email: "tumi@gmail.com", role: "Viewer", department: "Tech"},
];

function renderUsers (userData){
    const container = document.getElementById ('userlist');
    container.innerHTML = '';

    userData.forEach(user =>{
        const div = document.createElement ('div');
        div.className = 'user-card';
        div.innerHTML = `
        <strong>${user.name}</strong>(${user.role})<br>
        ${user.email} - ${user.department}
        `;
        container.appendChild(div);
    });
}
renderUsers(users);

//Add Filtering & Search Logic
const searchInput = document.getElementById('search');
const roleFilter = document.getElementById ('filterRole');

function filterUsers(){
    let filtered =[...users];

    const search = searchInput.value.toLowerCase();
    const role = roleFilter.value;

    if (search){
        filtered = filtered.filter(user => 
            user.name.toLowerCase().includes(search) ||
            user.email.toLowerCase().includes(search) ||
            user.department.toLowerCase().includes(search)
        );
    }
    if (role){
        filtered = filtered.filter(user => user.role === role);
    }

    renderUsers(filtered);
}

searchInput.addEventListener('input', filterUsers);
roleFilter.addEventListener ('change', filterUsers);