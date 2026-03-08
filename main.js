const labelStyle = {
    "bug": {
        icon : 'fa-bug',
        bg: 'bg-red-200',
        text: 'text-red-700',
        label: 'BUG'
    },
    "help wanted": {
        icon : 'fa-life-ring',
        bg: 'bg-yellow-200',
        text: 'text-yellow-700',
        label: 'HELP WANTED'
    },
    "enhancement": {
        icon : 'fa-wand-magic-sparkles',
        bg: 'bg-green-200',
        text: 'text-green-700',
        label: 'ENHANCEMENT'
    },
    "good first issue": {
        icon : 'fa-star',
        bg: 'bg-blue-200',
        text: 'text-blue-700',
        label: 'GOOD FIRST ISSUE'
    },
    "documentation": {
        icon : 'fa-dochum',
        bg: 'bg-pink-200',
        text: 'text-pink-700',
        label: 'DOCUMENTATION'
    }
};

// Status Icon-----------
const statusIcon = {
    open: "./assets/Open-Status.png",
    closed: "./assets/Closed-Status.png"
};

// Label Generate Function
const generateLabels = (labels) =>{
    return labels.map(label=>{
        const style = labelStyle[label];
        return `
            <button class="${style.bg} ${style.text} rounded-3xl px-2 py-1">
                <i class="fa-solid ${style.icon}"></i>
                ${style.label}
            </button>
        `;
    }).join("");
}


// Top Border Color by Status
function getStatus (status){
    if(status === 'open'){
        return "border-green-500"
    }
    return 'border-violet-500'
}

// Priority Color---------------
function getPriorityColor(priority){
    if(priority=== 'high'){
        return "bg-red-200 text-red-600";
    }
    if(priority === 'medium'){
        return "bg-yellow-200 text-yellow-600"
    }
    return 'bg-gray-200 text-gray-600'
}


function updateIssueCount(issues){
    const count = issues.length;
    document.getElementById('total-issue').innerText = count;
}

// Load Issues--------------------------------------------
let allIssue = [];
const loadIssues = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(response => response.json())
        .then(data => {
            allIssue =data.data;
            displayIssue(allIssue);
            updateIssueCount(allIssue);
        });
}
loadIssues();

// Filter Function----------------------------------------
function filterIssues(status, button){
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(btn=>{
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-soft');    
    });

    if(button){
        button.classList.remove('btn-soft');
        button.classList.add('btn-primary');
    }

    if(status==='all'){
        displayIssue(allIssue);
        updateIssueCount(allIssue);
        return;
    }
    const filtered = allIssue.filter(issue => issue.status === status);
    displayIssue(filtered);
    updateIssueCount(filtered);
};

// Date Formating------------------------------------------
const formatDate = (dateString) =>{
    return new Date(dateString).toLocaleDateString('en-US');
};


// Search Function------------------------------------------



// Display Issue Card---------------------------------------
const displayIssue = (issues) => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = "";

    issues.forEach(issue => {
        const createElements = document.createElement('div');
        createElements.innerHTML = `
        <div class="bg-white p-7 space-y-3 rounded-xl shadow border-t-4 ${getStatus(issue.status)} ">
                <div class="flex items-center justify-between">
                    <img class="w-8 h-8" src="${statusIcon[issue.status]}" alt="">
                    <button class="${getPriorityColor(issue.priority)} px-4 py-1 rounded-3xl">${issue.priority.toUpperCase()}</button>
                </div>
                <div>
                    <h3 class="text-[18px] font-bold text-[#1F2937]">${issue.title}</h3>
                    <p class="text-[#64748B] text-sm">${issue.description}</p>
                </div>
                <div class="flex flex-wrap gap-1 text-sm">${generateLabels(issue.labels)}</div>
                <div class="divider"></div>
                <div>
                    <p class="text-[#64748B]"># ${issue.id} by ${issue.author}</p>
                    <p class="text-[#64748B]">${formatDate(issue.createdAt)}</p>
                </div>
            </div>
        `
    cardContainer.appendChild(createElements);
    })
}