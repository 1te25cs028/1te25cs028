const roleProfiles = {
  admin: { name: 'Alicia Stone', role: 'Hospital Administrator' },
  doctor: { name: 'Dr. Rahul Nair', role: 'Senior Consultant' },
  nurse: { name: 'Priya Menon', role: 'Lead Nurse' },
  receptionist: { name: 'Samir Khan', role: 'Reception Lead' },
  pharmacist: { name: 'Nora James', role: 'Pharmacist in Charge' },
  lab: { name: 'Maya Singh', role: 'Lab Technician' },
  billing: { name: 'Elena Brooks', role: 'Billing Officer' },
  patient: { name: 'Rashid Ali', role: 'Patient Portal User' }
};

const state = {
  userRole: 'admin',
  currentView: 'overview',
  globalSearch: '',
  notificationCount: 7,
  patients: [
    { id: 'MN-2041', name: 'Ava Thompson', age: 36, status: 'Admitted', department: 'Cardiology', doctor: 'Dr. N. Shah', lastVisit: '12 Jun' },
    { id: 'MN-2042', name: 'Daniel Ross', age: 58, status: 'In Review', department: 'Neurology', doctor: 'Dr. M. Rao', lastVisit: '08 Jun' },
    { id: 'MN-2043', name: 'Mila Brown', age: 29, status: 'Discharged', department: 'Orthopedics', doctor: 'Dr. P. Nair', lastVisit: '04 Jun' },
    { id: 'MN-2044', name: 'Ethan Park', age: 47, status: 'Pending', department: 'General Medicine', doctor: 'Dr. A. Singh', lastVisit: '15 Jun' },
    { id: 'MN-2045', name: 'Sara Lopez', age: 41, status: 'Admitted', department: 'Oncology', doctor: 'Dr. K. Iyer', lastVisit: '09 Jun' }
  ],
  appointments: [
    { patient: 'Mila Brown', doctor: 'Dr. N. Shah', time: 'Today · 10:30 AM', status: 'Confirmed', type: 'In-person' },
    { patient: 'Daniel Ross', doctor: 'Dr. M. Rao', time: 'Today · 11:15 AM', status: 'Checked In', type: 'Follow-up' },
    { patient: 'Ava Thompson', doctor: 'Dr. A. Singh', time: 'Today · 1:00 PM', status: 'In Consultation', type: 'Video' },
    { patient: 'Ethan Park', doctor: 'Dr. K. Iyer', time: 'Tomorrow · 9:00 AM', status: 'Scheduled', type: 'In-person' }
  ],
  doctors: [
    { name: 'Dr. N. Shah', specialty: 'Cardiology', dept: 'Cardiology', availability: 'Available', fee: '$220', experience: '14 yrs' },
    { name: 'Dr. M. Rao', specialty: 'Neurology', dept: 'Neurology', availability: 'Busy', fee: '$260', experience: '18 yrs' },
    { name: 'Dr. A. Singh', specialty: 'General Medicine', dept: 'Internal Medicine', availability: 'Available', fee: '$180', experience: '12 yrs' },
    { name: 'Dr. P. Nair', specialty: 'Orthopedics', dept: 'Orthopedics', availability: 'On Leave', fee: '$190', experience: '15 yrs' }
  ],
  inventory: [
    { name: 'Amoxicillin 500mg', stock: 18, threshold: 40, status: 'Low stock' },
    { name: 'Insulin Glargine', stock: 7, threshold: 20, status: 'Critical' },
    { name: 'Paracetamol 650mg', stock: 220, threshold: 80, status: 'Healthy' }
  ],
  alerts: [
    { label: 'Critical lab alert', detail: 'Troponin I flagged for immediate review', type: 'alert' },
    { label: 'Low stock', detail: 'Antibiotic inventory below reorder threshold', type: 'warning' },
    { label: 'Discharge ready', detail: 'Three patients cleared for discharge review', type: 'success' }
  ],
  emergencyQueue: [
    { patient: 'Rina Patel', priority: 'Critical', wait: '4 min', doctor: 'Triage Team 1', status: 'Assessment' },
    { patient: 'James Morris', priority: 'High', wait: '11 min', doctor: 'Dr. L. O’Neil', status: 'Observation' },
    { patient: 'Nina Costa', priority: 'Moderate', wait: '18 min', doctor: 'Dr. S. Khan', status: 'Waiting' }
  ],
  labQueue: [
    { test: 'HbA1C', patient: 'Sara Lopez', status: 'Processing', priority: 'High' },
    { test: 'CBC', patient: 'Ava Thompson', status: 'Completed', priority: 'Routine' },
    { test: 'Troponin I', patient: 'Rina Patel', status: 'Critical', priority: 'Urgent' }
  ],
  billing: [
    { id: 'INV-4821', patient: 'Neha Kapoor', amount: '$2,140', status: 'Pending' },
    { id: 'INV-4827', patient: 'Jacob Lee', amount: '$980', status: 'Partial' },
    { id: 'INV-4830', patient: 'Rina Bose', amount: '$1,430', status: 'Pending' }
  ],
  chatMessages: [
    { sender: 'assistant', text: 'Good morning. 12 patients are due to be reviewed, and 3 low-stock medicines need attention.' },
    { sender: 'user', text: 'Summarize today’s appointments.' },
    { sender: 'assistant', text: 'Today: 24 appointments, 6 follow-ups, and 2 video consultations. 3 cases are waiting on triage review.' }
  ]
};

const viewTitles = {
  overview: 'Overview Dashboard',
  patients: 'Patient Management',
  doctors: 'Doctors & Staff',
  appointments: 'Appointments',
  departments: 'Departments',
  emr: 'Electronic Medical Records',
  lab: 'Laboratory & Diagnostics',
  pharmacy: 'Pharmacy & Inventory',
  admissions: 'Beds & Admissions',
  billing: 'Billing & Payments',
  emergency: 'Emergency & Triage',
  ai: 'AI Health Assistant',
  reports: 'Reports & Analytics',
  settings: 'Settings'
};

const appRoot = document.getElementById('workspace');
const loginScreen = document.getElementById('loginScreen');
const pageContent = document.getElementById('pageContent');
const profileName = document.getElementById('profileName');
const profileRole = document.getElementById('profileRole');

function updateProfile() {
  const profile = roleProfiles[state.userRole] || roleProfiles.admin;
  profileName.textContent = profile.name;
  profileRole.textContent = profile.role;
  document.querySelectorAll('.demo-role').forEach((button) => {
    button.classList.toggle('active', button.dataset.role === state.userRole);
  });
}

function showToast(message) {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 2200);
}

function clearGlobalSearch() {
  state.globalSearch = '';
  document.getElementById('globalSearch').value = '';
}

function setView(viewName) {
  state.currentView = viewName;
  document.querySelectorAll('.nav-item').forEach((button) => {
    button.classList.toggle('active', button.dataset.view === viewName);
  });
  renderView();
}

function renderView() {
  const searchValue = state.globalSearch.trim().toLowerCase();
  const views = {
    overview: renderOverview,
    patients: renderPatients,
    doctors: renderDoctors,
    appointments: renderAppointments,
    departments: renderDepartments,
    emr: renderEmr,
    lab: renderLab,
    pharmacy: renderPharmacy,
    admissions: renderAdmissions,
    billing: renderBilling,
    emergency: renderEmergency,
    ai: renderAi,
    reports: renderReports,
    settings: renderSettings
  };
  const renderer = views[state.currentView] || views.overview;
  pageContent.innerHTML = renderer(searchValue);
  if (!appRoot.classList.contains('hidden')) {
    document.title = `${viewTitles[state.currentView]} • MediNova`;
  }
}

function getLocalDateInputValue(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function renderOverview(searchValue) {
  const filteredPatients = state.patients.filter((patient) => {
    const haystack = `${patient.id} ${patient.name} ${patient.department} ${patient.doctor}`.toLowerCase();
    return haystack.includes(searchValue);
  });
  const patientCount = filteredPatients.length;

  return `
    <div class="page-header">
      <div>
        <h2>${viewTitles.overview}</h2>
        <p class="page-subtitle">Good morning, ${roleProfiles[state.userRole].name.split(' ')[0]}. Here is today’s operational snapshot.</p>
      </div>
      <div class="page-actions">
        <div class="filter-pills">
          <button class="filter-pill active" type="button" data-action="filter-range" data-range="today">Today</button>
          <button class="filter-pill" type="button" data-action="filter-range" data-range="week">This Week</button>
          <button class="filter-pill" type="button" data-action="filter-range" data-range="month">This Month</button>
          <button class="filter-pill" type="button" data-action="filter-range" data-range="custom">Custom Range</button>
        </div>
      </div>
    </div>

    <div class="kpi-grid">
      <div class="card kpi-card">
        <div class="topline"><small>Total Patients</small><span class="trend positive">+12%</span></div>
        <strong>${patientCount}</strong>
        <span>Registered this month</span>
      </div>
      <div class="card kpi-card">
        <div class="topline"><small>Admitted</small><span class="trend positive">+4%</span></div>
        <strong>184</strong>
        <span>Current in-patients</span>
      </div>
      <div class="card kpi-card">
        <div class="topline"><small>Appointments</small><span class="trend warning">+6%</span></div>
        <strong>428</strong>
        <span>Scheduled today</span>
      </div>
      <div class="card kpi-card">
        <div class="topline"><small>Revenue</small><span class="trend positive">+9%</span></div>
        <strong>$92.4K</strong>
        <span>Collected this month</span>
      </div>
    </div>

    <div class="overview-charts">
      <div class="card chart-panel">
        <div class="chart-header">
          <h3>Patient admissions trend</h3>
          <div class="filter-pills"><button class="filter-pill active" type="button" data-action="noop">7D</button><button class="filter-pill" type="button" data-action="noop">30D</button></div>
        </div>
        <div class="line-chart"><svg viewBox="0 0 620 220" preserveAspectRatio="none"><path d="M0 175 C 80 160, 120 130, 190 145 S 295 110, 350 90 S 470 60, 620 38" /><path class="secondary" d="M0 200 C 90 192, 150 160, 230 164 S 360 120, 520 130 S 580 88, 620 62" /></svg></div>
      </div>
      <div class="card chart-panel">
        <div class="chart-header"><h3>Bed occupancy</h3></div>
        <div class="donut-area"><div class="donut"><div class="donut-center"><div><strong>84%</strong><span>Occupied</span></div></div></div></div>
      </div>
    </div>

    <div class="card-grid">
      <div class="section-card">
        <div class="chart-header"><h3>Department distribution</h3></div>
        <div class="bar-chart"><div class="bar" style="height: 62%"></div><div class="bar" style="height: 46%"></div><div class="bar" style="height: 72%"></div><div class="bar" style="height: 52%"></div><div class="bar" style="height: 88%"></div><div class="bar" style="height: 66%"></div></div>
      </div>
      <div class="section-card">
        <div class="chart-header"><h3>Critical inventory</h3></div>
        <div class="list">${state.inventory.map((item) => `
          <div class="list-item"><div><strong>${item.name}</strong><small>${item.stock} units left</small></div><span class="badge ${item.status === 'Critical' ? 'alert' : item.status === 'Low stock' ? 'warning' : 'success'}">${item.status}</span></div>
        `).join('')}</div>
      </div>
      <div class="section-card">
        <div class="chart-header"><h3>Emergency queue</h3></div>
        <div class="list">${state.emergencyQueue.map((item) => `
          <div class="list-item"><div><strong>${item.patient}</strong><small>${item.doctor}</small></div><span class="badge ${item.priority === 'Critical' ? 'alert' : item.priority === 'High' ? 'warning' : 'info'}">${item.priority}</span></div>
        `).join('')}</div>
      </div>
    </div>

    <div class="info-grid">
      <div class="section-card">
        <div class="chart-header"><h3>Today’s appointment list</h3><button class="secondary-btn" type="button" data-action="view" data-view="appointments">Open schedule</button></div>
        <div class="timeline">${state.appointments.map((appointment) => `
          <div class="timeline-item"><div style="display:flex; gap:12px; align-items:flex-start;"><span class="marker ${appointment.status === 'Confirmed' ? 'green' : appointment.status === 'Checked In' ? 'blue' : appointment.status === 'In Consultation' ? 'violet' : 'warning'}"></span><div><strong>${appointment.patient}</strong><small>${appointment.doctor} · ${appointment.type}</small></div></div><div><strong>${appointment.time}</strong><small>${appointment.status}</small></div></div>
        `).join('')}</div>
      </div>
      <div class="section-card">
        <div class="chart-header"><h3>Recent activity</h3><button class="secondary-btn" type="button" data-action="noop">View all</button></div>
        <div class="activity-feed">${state.alerts.map((alert) => `
          <div class="activity-item"><span class="marker ${alert.type === 'alert' ? 'red' : alert.type === 'warning' ? 'warning' : 'green'}"></span><div><strong>${alert.label}</strong><small>${alert.detail}</small></div></div>
        `).join('')}</div>
      </div>
    </div>
  `;
}

function renderPatients(searchValue) {
  const filtered = state.patients.filter((patient) => {
    const haystack = `${patient.id} ${patient.name} ${patient.department} ${patient.doctor} ${patient.status}`.toLowerCase();
    return haystack.includes(searchValue);
  });

  return `
    <div class="page-header">
      <div>
        <h2>${viewTitles.patients}</h2>
        <p class="page-subtitle">Manage admissions, profiles, history, and patient records.</p>
      </div>
      <div class="page-actions"><button class="primary-btn" type="button" data-action="open-modal" data-modal="patient">Register patient</button></div>
    </div>
    <div class="section-card"><div class="toolbar"><div class="row-wrap"><div class="input-group" style="min-width:260px;"><label>Search</label><input type="search" value="${state.globalSearch}" placeholder="Search patient ID, name or department" data-action="search-input" /></div><div class="input-group"><label>Filter</label><select><option>All statuses</option><option>Admitted</option><option>Pending</option><option>Discharged</option></select></div></div><div class="action-strip"><button class="secondary-btn" type="button" data-action="noop">Export</button><button class="ghost-btn" type="button" data-action="noop">Download report</button></div></div></div>
    <div class="section-card"><div class="table-wrap"><table class="data-table"><thead><tr><th>Patient ID</th><th>Name</th><th>Department</th><th>Doctor</th><th>Status</th><th>Last visit</th></tr></thead><tbody>${filtered.map((patient) => `
      <tr><td>${patient.id}</td><td><strong>${patient.name}</strong></td><td>${patient.department}</td><td>${patient.doctor}</td><td><span class="badge ${patient.status === 'Admitted' ? 'info' : patient.status === 'Discharged' ? 'success' : patient.status === 'In Review' ? 'warning' : 'alert'}">${patient.status}</span></td><td>${patient.lastVisit}</td></tr>
    `).join('') || '<tr><td colspan="6" style="padding:20px; color: var(--muted);">No patient records match this search.</td></tr>'}</tbody></table></div></div>
  `;
}

function renderDoctors(searchValue) {
  const filtered = state.doctors.filter((doctor) => {
    const haystack = `${doctor.name} ${doctor.specialty} ${doctor.dept}`.toLowerCase();
    return haystack.includes(searchValue);
  });

  return `
    <div class="page-header">
      <div>
        <h2>${viewTitles.doctors}</h2>
        <p class="page-subtitle">Manage physician rosters, schedule coverage, and specializations.</p>
      </div>
      <div class="page-actions"><button class="primary-btn" type="button" data-action="open-modal" data-modal="doctor">Add staff</button></div>
    </div>
    <div class="doctor-grid">${filtered.map((doctor) => `
      <div class="doctor-card">
        <div class="doctor-head"><div class="row-wrap"><div class="avatar">${doctor.name.split(' ').map((item) => item[0]).slice(-2).join('')}</div><div><strong>${doctor.name}</strong><small class="muted">${doctor.specialty}</small></div></div><span class="badge ${doctor.availability === 'Available' ? 'success' : doctor.availability === 'Busy' ? 'warning' : 'alert'}">${doctor.availability}</span></div>
        <div class="doctor-stats"><span class="stat-pill">${doctor.dept}</span><span class="stat-pill">Fee ${doctor.fee}</span><span class="stat-pill">${doctor.experience}</span></div>
        <div class="schedule-grid">${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => `
          <div class="day-slot"><h4>${day}</h4><span class="time">08:00</span><span class="time">14:00</span></div>
        `).join('')}</div>
      </div>
    `).join('') || '<div class="section-card" style="grid-column:1/-1;">No staff match your search.</div>'}</div>
  `;
}

function renderAppointments(searchValue) {
  const filtered = state.appointments.filter((appointment) => {
    const haystack = `${appointment.patient} ${appointment.doctor} ${appointment.status}`.toLowerCase();
    return haystack.includes(searchValue);
  });

  return `
    <div class="page-header">
      <div>
        <h2>${viewTitles.appointments}</h2>
        <p class="page-subtitle">Manage booking, rescheduling, and patient queue flow.</p>
      </div>
      <div class="page-actions"><button class="primary-btn" type="button" data-action="open-modal" data-modal="appointment">Book appointment</button></div>
    </div>
    <div class="appointment-grid">
      <div class="section-card">
        <div class="chart-header"><h3>Appointment booking</h3></div>
        <div class="appointment-controls"><div class="input-group"><label>Department</label><select><option>Cardiology</option><option>Neurology</option><option>Orthopedics</option><option>General Medicine</option></select></div><div class="input-group"><label>Doctor</label><select><option>Dr. N. Shah</option><option>Dr. M. Rao</option><option>Dr. A. Singh</option></select></div><div class="input-group"><label>Date</label><input type="date" value="${getLocalDateInputValue()}" /></div><div class="input-group"><label>Visit type</label><select><option>In-person</option><option>Video consultation</option><option>Follow-up</option></select></div></div>
        <div class="slot-grid" style="margin-top: 18px;">${['09:00', '10:30', '12:00', '14:00', '15:30', '17:00', '18:00', '19:00'].map((slot, index) => `<button class="slot-btn ${index === 1 ? 'active' : ''}" type="button" data-action="noop">${slot}</button>`).join('')}</div>
      </div>
      <div class="section-card">
        <div class="chart-header"><h3>Schedule queue</h3></div>
        <div class="appointment-list">${filtered.map((appointment) => `
          <div class="appointment-item"><div class="meta-line"><div><strong>${appointment.patient}</strong><small>${appointment.doctor}</small></div><span class="badge ${appointment.status === 'Confirmed' ? 'success' : appointment.status === 'Checked In' ? 'info' : appointment.status === 'In Consultation' ? 'warning' : 'alert'}">${appointment.status}</span></div><div class="meta-line"><small>${appointment.type}</small><small>${appointment.time}</small></div></div>
        `).join('')}</div>
      </div>
    </div>
  `;
}

function renderDepartments() {
  return `
    <div class="page-header"><div><h2>${viewTitles.departments}</h2><p class="page-subtitle">Department capacity, service levels, and workload overview.</p></div></div>
    <div class="card-grid">${[
      ['Cardiology', '24 patients', '92% capacity'],
      ['Neurology', '17 patients', '78% capacity'],
      ['Orthopedics', '18 patients', '82% capacity'],
      ['General Medicine', '31 patients', '95% capacity'],
      ['Oncology', '22 patients', '88% capacity'],
      ['Urology', '12 patients', '61% capacity']
    ].map(([name, count, capacity]) => `
      <div class="section-card"><div class="chart-header"><h3>${name}</h3><span class="badge info">Live</span></div><div class="list"><div class="list-item"><div><strong>Patients</strong><small>Current admissions</small></div><strong>${count}</strong></div><div class="list-item"><div><strong>Capacity</strong><small>Utilization</small></div><strong>${capacity}</strong></div></div></div>
    `).join('')}</div>
  `;
}

function renderEmr() {
  return `
    <div class="page-header"><div><h2>${viewTitles.emr}</h2><p class="page-subtitle">Authorized records, consultations, and clinical timeline.</p></div></div>
    <div class="section-card"><div class="patient-summary"><div class="patient-avatar">AT</div><div class="patient-meta"><div><h3 style="margin:0; font-size:2rem; letter-spacing:-0.05em;">Ava Thompson</h3><p class="page-subtitle">Patient ID: MN-2041 · Cardiology follow-up · Age 36</p></div><div class="tabs"><button class="tab-btn active" type="button" data-action="noop">Overview</button><button class="tab-btn" type="button" data-action="noop">Visits</button><button class="tab-btn" type="button" data-action="noop">Medical History</button><button class="tab-btn" type="button" data-action="noop">Prescriptions</button><button class="tab-btn" type="button" data-action="noop">Lab Results</button></div><div class="meta-list"><div class="meta-item"><small>Allergies</small><strong>Penicillin</strong></div><div class="meta-item"><small>Last admission</small><strong>12 Jun</strong></div><div class="meta-item"><small>Primary doctor</small><strong>Dr. N. Shah</strong></div><div class="meta-item"><small>BP trend</small><strong>118/74</strong></div></div></div></div></div>
    <div class="info-grid"><div class="section-card"><div class="chart-header"><h3>Clinical timeline</h3></div><div class="timeline"><div class="timeline-item"><div style="display:flex; gap:12px;"><span class="marker blue"></span><div><strong>Consultation</strong><small>06 Jun · Review of chest pain</small></div></div><span class="badge success">Completed</span></div><div class="timeline-item"><div style="display:flex; gap:12px;"><span class="marker warning"></span><div><strong>ECG</strong><small>08 Jun · Arrhythmia review</small></div></div><span class="badge warning">Pending</span></div><div class="timeline-item"><div style="display:flex; gap:12px;"><span class="marker green"></span><div><strong>Prescription</strong><small>10 Jun · Beta blockers dosage adjusted</small></div></div><span class="badge success">Active</span></div></div></div><div class="section-card"><div class="chart-header"><h3>Care note</h3></div><div class="list"><div class="list-item"><strong>Assessment</strong><small>Stable post-procedure, continue monitoring.</small></div><div class="list-item"><strong>Plan</strong><small>Repeat cardiology review in 7 days.</small></div><div class="list-item"><strong>Follow-up</strong><small>Lab panel due before next consultation.</small></div></div></div></div>
  `;
}

function renderLab() {
  return `
    <div class="page-header"><div><h2>${viewTitles.lab}</h2><p class="page-subtitle">Review test requests, sample tracking, and critical results.</p></div></div>
    <div class="section-card"><div class="table-wrap"><table class="data-table"><thead><tr><th>Test</th><th>Patient</th><th>Priority</th><th>Status</th></tr></thead><tbody>${state.labQueue.map((item) => `
      <tr><td>${item.test}</td><td>${item.patient}</td><td><span class="badge ${item.priority === 'Urgent' ? 'alert' : item.priority === 'High' ? 'warning' : 'info'}">${item.priority}</span></td><td><span class="badge ${item.status === 'Critical' ? 'alert' : item.status === 'Completed' ? 'success' : 'info'}">${item.status}</span></td></tr>
    `).join('')}</tbody></table></div></div>
  `;
}

function renderPharmacy() {
  return `
    <div class="page-header"><div><h2>${viewTitles.pharmacy}</h2><p class="page-subtitle">Inventory watchlist, near-expiry items, and prescription-linked stock.</p></div></div>
    <div class="card-grid">${state.inventory.map((item) => `
      <div class="section-card"><div class="chart-header"><h3>${item.name}</h3><span class="badge ${item.status === 'Critical' ? 'alert' : item.status === 'Low stock' ? 'warning' : 'success'}">${item.status}</span></div><div class="list"><div class="list-item"><div><strong>Available</strong><small>Units in stock</small></div><strong>${item.stock}</strong></div><div class="list-item"><div><strong>Reorder threshold</strong><small>Minimum required</small></div><strong>${item.threshold}</strong></div></div></div>
    `).join('')}</div>
  `;
}

function renderAdmissions() {
  return `
    <div class="page-header"><div><h2>${viewTitles.admissions}</h2><p class="page-subtitle">Ward allocation, bed occupancy, transfer status, and discharge readiness.</p></div></div>
    <div class="bed-grid">${[['ICU-01', 'Occupied', 'occupied'], ['Ward A-08', 'Available', 'available'], ['Ward B-03', 'Reserved', 'reserved'], ['Ward C-11', 'Cleaning', 'cleaning'], ['Ward A-10', 'Available', 'available'], ['ICU-04', 'Occupied', 'occupied']].map(([bed, status, klass]) => `<div class="bed-box ${klass}"><strong>${bed}</strong><small>${status}</small></div>`).join('')}</div>
  `;
}

function renderBilling() {
  return `
    <div class="page-header"><div><h2>${viewTitles.billing}</h2><p class="page-subtitle">Revenue, claims, and collections status.</p></div></div>
    <div class="billing-grid"><div class="section-card"><div class="chart-header"><h3>Revenue mix</h3></div><div class="donut-area"><div class="donut" style="background: conic-gradient(var(--teal) 0 40%, var(--navy) 40% 68%, #a7d6f7 68% 82%, #d7e9f7 82% 100%);"><div class="donut-center"><div><strong>$92.4K</strong><span>Collected</span></div></div></div></div></div><div class="section-card"><div class="chart-header"><h3>Pending collections</h3></div><div class="invoice-list">${state.billing.map((invoice) => `
      <div class="invoice-item"><div><strong>${invoice.id}</strong><small>${invoice.patient}</small></div><div><strong>${invoice.amount}</strong><small>${invoice.status}</small></div></div>
    `).join('')}</div></div></div>
  `;
}

function renderEmergency() {
  return `
    <div class="page-header"><div><h2>${viewTitles.emergency}</h2><p class="page-subtitle">Priority triage flow and emergency queue management.</p></div></div>
    <div class="emergency-grid">${state.emergencyQueue.map((item) => `
      <div class="section-card"><div class="chart-header"><h3>${item.patient}</h3><span class="badge ${item.priority === 'Critical' ? 'alert' : item.priority === 'High' ? 'warning' : 'info'}">${item.priority}</span></div><div class="list"><div class="list-item"><div><strong>Doctor</strong><small>Assigned clinician</small></div><strong>${item.doctor}</strong></div><div class="list-item"><div><strong>Estimated wait</strong><small>Approximate time</small></div><strong>${item.wait}</strong></div><div class="list-item"><div><strong>Status</strong><small>Current stage</small></div><strong>${item.status}</strong></div></div></div>
    `).join('')}</div>
  `;
}

function renderAi() {
  return `
    <div class="page-header"><div><h2>${viewTitles.ai}</h2><p class="page-subtitle">MediNova Copilot can summarize stories, highlight risk, and propose action steps.</p></div></div>
    <div class="ai-grid"><div class="ai-panel"><div class="prompt-pills"><button class="prompt-pill" type="button" data-action="ai-prompt" data-prompt="Summarize today’s appointments.">Summarize today’s appointments.</button><button class="prompt-pill" type="button" data-action="ai-prompt" data-prompt="Find available doctors.">Find available doctors.</button><button class="prompt-pill" type="button" data-action="ai-prompt" data-prompt="Show overdue lab reports.">Show overdue lab reports.</button><button class="prompt-pill" type="button" data-action="ai-prompt" data-prompt="Identify low-stock medicines.">Identify low-stock medicines.</button></div><div class="chat-list">${state.chatMessages.map((message) => `
      <div class="chat-message ${message.sender === 'user' ? 'user' : 'assistant'}"><strong>${message.sender === 'user' ? 'You' : 'MediNova Copilot'}</strong><small>${message.text}</small></div>
    `).join('')}</div><form id="aiForm" class="message-input-row"><input id="aiPromptInput" type="text" placeholder="Ask MediNova Copilot..." /><button class="primary-btn" type="submit">Send</button></form></div><div class="section-card"><div class="chart-header"><h3>Operational summary</h3></div><div class="list"><div class="list-item"><div><strong>Appointments</strong><small>Expected today</small></div><strong>24</strong></div><div class="list-item"><div><strong>Critical lab</strong><small>Open alerts</small></div><strong>3</strong></div><div class="list-item"><div><strong>Low stock</strong><small>Reorder watch</small></div><strong>7</strong></div></div></div></div>
  `;
}

function renderReports() {
  return `
    <div class="page-header"><div><h2>${viewTitles.reports}</h2><p class="page-subtitle">Performance snapshots across critical hospital systems.</p></div></div>
    <div class="report-grid"><div class="section-card"><div class="chart-header"><h3>Revenue vs expense</h3></div><div class="line-chart"><svg viewBox="0 0 620 220" preserveAspectRatio="none"><path d="M0 170 C 80 150, 120 110, 180 140 S 330 90, 430 120 S 560 70, 620 46" /><path class="secondary" d="M0 190 C 110 180, 170 160, 260 170 S 410 118, 620 130" /></svg></div></div><div class="section-card"><div class="chart-header"><h3>Top departments</h3></div><div class="list"><div class="list-item"><div><strong>Cardiology</strong><small>New patients</small></div><strong>48</strong></div><div class="list-item"><div><strong>General Medicine</strong><small>Visits</small></div><strong>67</strong></div><div class="list-item"><div><strong>Oncology</strong><small>Ongoing treatment</small></div><strong>32</strong></div></div></div></div>
  `;
}

function renderSettings() {
  return `
    <div class="page-header"><div><h2>${viewTitles.settings}</h2><p class="page-subtitle">System preferences, access controls, and operational policies.</p></div></div>
    <div class="settings-grid"><div class="section-card"><div class="chart-header"><h3>Preferences</h3></div><div class="settings-list"><div class="setting-row"><div><strong>Dark mode</strong><small>Comfortable night viewing</small></div><button class="toggle active" type="button" data-action="toggle-dark-mode"></button></div><div class="setting-row"><div><strong>Two-factor authentication</strong><small>Require login verification</small></div><button class="toggle active" type="button" data-action="noop"></button></div><div class="setting-row"><div><strong>Critical alert escalation</strong><small>Send immediate notifications</small></div><button class="toggle active" type="button" data-action="noop"></button></div></div></div><div class="section-card"><div class="chart-header"><h3>Security</h3></div><div class="settings-list"><div class="setting-row"><div><strong>Session timeout</strong><small>15 minutes</small></div><button class="ghost-btn" type="button" data-action="noop">Adjust</button></div><div class="setting-row"><div><strong>Audit logging</strong><small>Enabled for all care records</small></div><button class="ghost-btn" type="button" data-action="noop">Review</button></div><div class="setting-row"><div><strong>Access policy</strong><small>Role-based permissions active</small></div><button class="ghost-btn" type="button" data-action="noop">Manage</button></div></div></div></div>
  `;
}

function handleLogin(event) {
  if (event) event.preventDefault();
  const email = document.getElementById('emailInput').value.trim();
  const password = document.getElementById('passwordInput').value.trim();
  const errorBox = document.getElementById('loginError');

  if (!email || !password) {
    errorBox.hidden = false;
    errorBox.textContent = 'Please enter both email and password to continue.';
    return;
  }

  errorBox.hidden = true;
  loginScreen.classList.add('hidden');
  appRoot.classList.remove('hidden');
  renderView();
  showToast(`Signed in as ${roleProfiles[state.userRole].role}`);
}

function handleLogout() {
  appRoot.classList.add('hidden');
  loginScreen.classList.remove('hidden');
  document.getElementById('loginForm').reset();
  document.getElementById('loginError').hidden = true;
  document.title = 'MediNova | Smart Healthcare, Seamlessly Connected';
  showToast('You have been logged out.');
}

function handleDemoRoleSelection(role) {
  state.userRole = role;
  updateProfile();
  const emailField = document.getElementById('emailInput');
  const map = {
    admin: 'admin@medinova.health',
    doctor: 'doctor@medinova.health',
    nurse: 'nurse@medinova.health',
    receptionist: 'reception@medinova.health',
    pharmacist: 'pharmacist@medinova.health',
    lab: 'lab@medinova.health',
    billing: 'billing@medinova.health',
    patient: 'patient@medinova.health'
  };
  emailField.value = map[role] || map.admin;
  document.getElementById('passwordInput').value = 'demo123';
}

function openModal(modalName) {
  const modalRoot = document.getElementById('modalContainer');
  let html = '';

  if (modalName === 'patient') {
    html = `<div class="modal-wrap"><div class="modal-panel"><div class="chart-header"><h3>Register new patient</h3><button class="icon-button" type="button" data-action="close-modal">✕</button></div><form id="patientForm" class="form-grid" style="margin-top:18px;"><div class="field-row"><div class="input-group"><label>Full name</label><input name="name" required /></div><div class="input-group"><label>Date of birth</label><input type="date" name="dob" /></div></div><div class="field-row"><div class="input-group"><label>Department</label><select name="department"><option>Cardiology</option><option>Neurology</option><option>Orthopedics</option></select></div><div class="input-group"><label>Gender</label><select name="gender"><option>Female</option><option>Male</option><option>Other</option></select></div></div><div class="field-row"><div class="input-group"><label>Phone</label><input name="phone" /></div><div class="input-group"><label>Email</label><input type="email" name="email" /></div></div><div class="row-between" style="margin-top:8px;"><button class="ghost-btn" type="button" data-action="close-modal">Cancel</button><button class="primary-btn" type="submit">Save patient</button></div></form></div></div>`;
  }

  if (modalName === 'appointment') {
    html = `<div class="modal-wrap"><div class="modal-panel"><div class="chart-header"><h3>Book appointment</h3><button class="icon-button" type="button" data-action="close-modal">✕</button></div><form id="appointmentForm" class="form-grid" style="margin-top:18px;"><div class="field-row"><div class="input-group"><label>Patient</label><input name="patient" required /></div><div class="input-group"><label>Doctor</label><select name="doctor"><option>Dr. N. Shah</option><option>Dr. M. Rao</option><option>Dr. A. Singh</option></select></div></div><div class="field-row"><div class="input-group"><label>Date</label><input type="date" name="date" /></div><div class="input-group"><label>Time</label><select name="time"><option>09:00</option><option>10:30</option><option>12:00</option></select></div></div><div class="input-group"><label>Reason</label><textarea name="reason" placeholder="Symptoms or visit reason"></textarea></div><div class="row-between"><button class="ghost-btn" type="button" data-action="close-modal">Close</button><button class="primary-btn" type="submit">Confirm booking</button></div></form></div></div>`;
  }

  if (modalName === 'doctor') {
    html = `<div class="modal-wrap"><div class="modal-panel"><div class="chart-header"><h3>Add staff member</h3><button class="icon-button" type="button" data-action="close-modal">✕</button></div><form id="doctorForm" class="form-grid" style="margin-top:18px;"><div class="field-row"><div class="input-group"><label>Name</label><input name="name" /></div><div class="input-group"><label>Department</label><select name="department"><option>Cardiology</option><option>Neurology</option><option>General Medicine</option></select></div></div><div class="field-row"><div class="input-group"><label>Specialization</label><input name="specialty" /></div><div class="input-group"><label>Availability</label><select name="availability"><option>Available</option><option>Busy</option><option>On Leave</option></select></div></div><div class="row-between"><button class="ghost-btn" type="button" data-action="close-modal">Cancel</button><button class="primary-btn" type="submit">Save staff</button></div></form></div></div>`;
  }

  modalRoot.innerHTML = html;
  document.body.classList.add('modal-open');
}

function closeModal() {
  document.getElementById('modalContainer').innerHTML = '';
  document.body.classList.remove('modal-open');
}

function handlePatientSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const data = new FormData(form);
  const name = (data.get('name') || '').toString().trim();
  if (!name) {
    showToast('Patient name is required.');
    return;
  }
  state.patients.unshift({ id: `MN-${Math.floor(1000 + Math.random() * 9000)}`, name, age: 32, status: 'Pending', department: data.get('department') || 'General Medicine', doctor: 'Dr. A. Singh', lastVisit: 'Today' });
  clearGlobalSearch();
  closeModal();
  setView('patients');
  showToast(`Patient ${name} registered successfully.`);
}

function handleAppointmentSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const data = new FormData(form);
  const patient = (data.get('patient') || '').toString().trim();
  if (!patient) {
    showToast('Patient name is required.');
    return;
  }
  const selectedDate = (data.get('date') || getLocalDateInputValue()).toString();
  const [year, month, day] = selectedDate.split('-').map(Number);
  const appointmentDate = new Date(year, month - 1, day);
  state.appointments.unshift({ patient, doctor: data.get('doctor') || 'Dr. N. Shah', time: `${appointmentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · ${data.get('time') || '10:30 AM'}`, status: 'Scheduled', type: 'In-person' });
  clearGlobalSearch();
  closeModal();
  setView('appointments');
  showToast(`Appointment booked for ${patient}.`);
}

function handleDoctorSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const data = new FormData(form);
  const name = (data.get('name') || '').toString().trim();
  if (!name) {
    showToast('Doctor name is required.');
    return;
  }
  state.doctors.unshift({ name, specialty: data.get('specialty') || 'General Practice', dept: data.get('department') || 'General Medicine', availability: data.get('availability') || 'Available', fee: '$200', experience: '5 yrs' });
  clearGlobalSearch();
  closeModal();
  setView('doctors');
  showToast(`Staff record added for ${name}.`);
}

function handleAiPrompt(promptText) {
  if (!promptText) return;
  state.chatMessages.push({ sender: 'user', text: promptText });
  const responses = {
    'Summarize today’s appointments.': 'Today: 24 appointments, 6 follow-ups, 2 video consultations, and 3 triage escalations. Most urgent workload is in cardiology and general medicine.',
    'Find available doctors.': 'Available doctors: Dr. A. Singh (General Medicine), Dr. N. Shah (Cardiology), and Dr. K. Iyer (Oncology) have open slots this afternoon.',
    'Show overdue lab reports.': 'Two lab reports are overdue: one CBC from Ward B and one lipid profile from the ER intake queue.',
    'Identify low-stock medicines.': 'Low-stock items: Amoxicillin 500mg (18 units), Insulin Glargine (7 units), and oral hydration packs are below reorder threshold.',
    default: 'I have reviewed the current records. There are 3 open critical alerts, 24 appointments, and 7 low-stock items highlighted for review.'
  };
  state.chatMessages.push({ sender: 'assistant', text: responses[promptText] || responses.default });
  renderView();
}

function togglePasswordVisibility() {
  const input = document.getElementById('passwordInput');
  const button = document.querySelector('[data-action="toggle-password"]');
  const isPassword = input.type === 'password';
  input.type = isPassword ? 'text' : 'password';
  button.textContent = isPassword ? 'Hide' : 'Show';
}

function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  const button = document.querySelector('[data-action="toggle-theme"]');
  button.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
}

function toggleSidebar() {
  document.querySelector('.sidebar').classList.toggle('open');
}

function handleFilterRange(button) {
  document.querySelectorAll('.filter-pill').forEach((pill) => {
    pill.classList.toggle('active', pill === button);
  });
  showToast(`Range updated to ${button.dataset.range || 'today'}.`);
}

function attachGlobalEvents() {
  document.addEventListener('click', (event) => {
    const actionTarget = event.target.closest('[data-action]');
    if (!actionTarget) return;

    const action = actionTarget.dataset.action;
    if (action === 'toggle-password') return togglePasswordVisibility();
    if (action === 'toggle-theme') return toggleTheme();
    if (action === 'logout') return handleLogout();
    if (action === 'forgot-password') return showToast('Password reset is not available in this demo.');
    if (action === 'filter-range') return handleFilterRange(actionTarget);
    if (action === 'toggle-sidebar') return toggleSidebar();
    if (action === 'open-notifications') return showToast(`You have ${state.notificationCount} new notifications.`);
    if (action === 'toggle-profile') return showToast(`${roleProfiles[state.userRole].role} profile opened.`);
    if (action === 'close-modal') return closeModal();
    if (action === 'open-modal') return openModal(actionTarget.dataset.modal);
    if (action === 'view') return setView(actionTarget.dataset.view);
    if (action === 'noop') return showToast('This action is not available in the demo yet.');
    if (action === 'ai-prompt') return handleAiPrompt(actionTarget.dataset.prompt);
    if (action === 'toggle-dark-mode') return toggleTheme();
  });

  document.addEventListener('submit', (event) => {
    if (event.target.id === 'loginForm') return handleLogin(event);
    if (event.target.id === 'patientForm') return handlePatientSubmit(event);
    if (event.target.id === 'appointmentForm') return handleAppointmentSubmit(event);
    if (event.target.id === 'doctorForm') return handleDoctorSubmit(event);
    if (event.target.id === 'aiForm') {
      event.preventDefault();
      const value = document.getElementById('aiPromptInput').value.trim();
      if (value) {
        handleAiPrompt(value);
        document.getElementById('aiPromptInput').value = '';
      }
    }
  });

  document.addEventListener('input', (event) => {
    if (event.target.id === 'globalSearch') {
      state.globalSearch = event.target.value;
      renderView();
    }
    if (event.target.matches('[data-action="search-input"]')) {
      state.globalSearch = event.target.value;
      const { selectionStart, selectionEnd } = event.target;
      renderView();
      const searchInput = pageContent.querySelector('[data-action="search-input"]');
      if (searchInput) {
        searchInput.focus();
        if (selectionStart !== null && selectionEnd !== null) {
          searchInput.setSelectionRange(selectionStart, selectionEnd);
        }
      }
    }
  });

  document.addEventListener('click', (event) => {
    const demoButton = event.target.closest('.demo-role');
    if (demoButton) return handleDemoRoleSelection(demoButton.dataset.role);

    const navButton = event.target.closest('.nav-item');
    if (navButton) {
      setView(navButton.dataset.view);
      const sidebar = document.querySelector('.sidebar');
      if (sidebar) sidebar.classList.remove('open');
    }
  });
}

function init() {
  updateProfile();
  attachGlobalEvents();
  renderView();
}

init();
