// Multi-route Flight Counter App Logic

const STORAGE_KEY = 'ord_pr_flight_tracker_v1';
const PR_AIRPORTS = new Set(['SJU', 'BQN', 'PSE']);

const SAMPLE_FLIGHTS = [
  {
    id: 'fl-' + Date.now() + '-1',
    direction: 'ORD-SJU',
    origin: 'ORD',
    destination: 'SJU',
    airline: 'United Airlines',
    flightNo: 'UA 1700',
    time: new Date(Date.now() - 2 * 3600000).toISOString().slice(0, 16),
    status: 'In Flight',
    notes: 'Boeing 737 MAX 9 (Non-stop)'
  },
  {
    id: 'fl-' + Date.now() + '-2',
    direction: 'ORD-SJU',
    origin: 'ORD',
    destination: 'SJU',
    airline: 'American Airlines',
    flightNo: 'AA 2468',
    time: new Date(Date.now() - 5 * 3600000).toISOString().slice(0, 16),
    status: 'Landed',
    notes: 'Boeing 737-800'
  },
  {
    id: 'fl-' + Date.now() + '-3',
    direction: 'SJU-ORD',
    origin: 'SJU',
    destination: 'ORD',
    airline: 'United Airlines',
    flightNo: 'UA 1701',
    time: new Date(Date.now() - 1 * 3600000).toISOString().slice(0, 16),
    status: 'In Flight',
    notes: 'Boeing 737 MAX 9'
  },
  {
    id: 'fl-' + Date.now() + '-4',
    direction: 'SJU-ORD',
    origin: 'SJU',
    destination: 'ORD',
    airline: 'American Airlines',
    flightNo: 'AA 2469',
    time: new Date(Date.now() + 2 * 3600000).toISOString().slice(0, 16),
    status: 'Scheduled',
    notes: 'Boeing 737-800'
  },
  {
    id: 'fl-' + Date.now() + '-5',
    direction: 'ORD-BQN',
    origin: 'ORD',
    destination: 'BQN',
    airline: 'Frontier Airlines',
    flightNo: 'F9 2024',
    time: new Date(Date.now() + 4 * 3600000).toISOString().slice(0, 16),
    status: 'Scheduled',
    notes: 'Airbus A321neo to Aguadilla'
  },
  {
    id: 'fl-' + Date.now() + '-6',
    direction: 'BQN-ORD',
    origin: 'BQN',
    destination: 'ORD',
    airline: 'Spirit Airlines',
    flightNo: 'NK 1212',
    time: new Date(Date.now() - 7 * 3600000).toISOString().slice(0, 16),
    status: 'Landed',
    notes: 'Airbus A320'
  },
  {
    id: 'fl-' + Date.now() + '-7',
    direction: 'SJU-JFK',
    origin: 'SJU',
    destination: 'JFK',
    airline: 'JetBlue Airways',
    flightNo: 'B6 1001',
    time: new Date(Date.now() + 6 * 3600000).toISOString().slice(0, 16),
    status: 'Scheduled',
    notes: 'Puerto Rico to New York sample route'
  },
  {
    id: 'fl-' + Date.now() + '-8',
    direction: 'JFK-DXB',
    origin: 'JFK',
    destination: 'DXB',
    airline: 'Emirates',
    flightNo: 'EK 202',
    time: new Date(Date.now() + 10 * 3600000).toISOString().slice(0, 16),
    status: 'Scheduled',
    notes: 'New York to Dubai sample route'
  }
];

let flights = [];
let currentFilter = 'all';
let searchQuery = '';

function loadFlights() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      flights = JSON.parse(saved);
    } else {
      flights = [...SAMPLE_FLIGHTS];
      saveFlights();
    }
  } catch (err) {
    console.error('Error loading flights:', err);
    flights = [...SAMPLE_FLIGHTS];
  }
}

function saveFlights() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(flights));
  } catch (err) {
    console.error('Error saving flights:', err);
  }
}

function formatDateTime(isoString) {
  if (!isoString) return 'N/A';
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return isoString;
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

function isOrdToPr(flight) {
  return flight.origin === 'ORD' && PR_AIRPORTS.has(flight.destination);
}

function isPrToOrd(flight) {
  return PR_AIRPORTS.has(flight.origin) && flight.destination === 'ORD';
}

function matchesRouteFilter(flight) {
  if (currentFilter === 'all') return true;
  if (currentFilter === 'ORD-PR') return isOrdToPr(flight) || isPrToOrd(flight);
  if (currentFilter === 'PR-NYC') return PR_AIRPORTS.has(flight.origin) && flight.destination === 'JFK';
  if (currentFilter === 'NYC-DXB') return flight.origin === 'JFK' && flight.destination === 'DXB';
  return true;
}

function updateStats() {
  const total = flights.length;
  const ordToPr = flights.filter(isOrdToPr).length;
  const prToOrd = flights.filter(isPrToOrd).length;
  const active = flights.filter(f => f.status === 'In Flight').length;
  const ordPrTotal = ordToPr + prToOrd;

  const ordPct = ordPrTotal > 0 ? Math.round((ordToPr / ordPrTotal) * 100) : 0;
  const prPct = ordPrTotal > 0 ? Math.round((prToOrd / ordPrTotal) * 100) : 0;

  document.getElementById('stat-total-flights').textContent = total;
  document.getElementById('stat-ord-to-pr').textContent = ordToPr;
  document.getElementById('stat-pr-to-ord').textContent = prToOrd;
  document.getElementById('stat-active-flights').textContent = active;
  document.getElementById('stat-ord-pr-pct').textContent = `${ordPct}%`;
  document.getElementById('stat-pr-ord-pct').textContent = `${prPct}%`;
  document.getElementById('visual-ord-count').textContent = `${ordToPr} outbound`;
  document.getElementById('visual-pr-count').textContent = `${prToOrd} inbound`;
}

function renderFlights() {
  const tbody = document.getElementById('flights-table-body');
  const emptyState = document.getElementById('empty-state');
  const countDisplay = document.getElementById('flight-list-count');

  let filtered = flights.filter(flight => {
    if (!matchesRouteFilter(flight)) return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchNo = flight.flightNo?.toLowerCase().includes(q);
      const matchAir = flight.airline?.toLowerCase().includes(q);
      const matchNotes = flight.notes?.toLowerCase().includes(q);
      const matchRoute = flight.direction?.toLowerCase().includes(q);
      if (!matchNo && !matchAir && !matchNotes && !matchRoute) return false;
    }

    return true;
  });

  filtered.sort((a, b) => new Date(b.time || 0) - new Date(a.time || 0));
  countDisplay.textContent = `Showing ${filtered.length} of ${flights.length} flights`;

  if (filtered.length === 0) {
    tbody.innerHTML = '';
    emptyState.classList.remove('hidden');
    emptyState.classList.add('flex');
    return;
  }

  emptyState.classList.add('hidden');
  emptyState.classList.remove('flex');

  tbody.innerHTML = filtered.map(flight => {
    const isReturnToOrd = flight.destination === 'ORD';
    const routeColor = isReturnToOrd ? 'text-emerald-400' : 'text-cyan-400';
    const routeIcon = isReturnToOrd ? 'arrow-left' : 'arrow-right';
    const planeIcon = isReturnToOrd ? 'plane-landing' : 'plane-takeoff';
    const badgeColorClass = getStatusBadgeClass(flight.status);

    return `
      <tr class="hover:bg-slate-800/40 transition-colors group">
        <td class="px-4 py-3 font-mono font-bold text-white whitespace-nowrap">
          <div class="flex items-center gap-2">
            <i data-lucide="${planeIcon}" class="w-3.5 h-3.5 ${routeColor}"></i>
            <span>${escapeHtml(flight.flightNo)}</span>
          </div>
        </td>
        <td class="px-4 py-3 text-slate-300 whitespace-nowrap">${escapeHtml(flight.airline)}</td>
        <td class="px-4 py-3 whitespace-nowrap">
          <span class="inline-flex items-center gap-1 ${routeColor} font-semibold">
            <i data-lucide="${routeIcon}" class="w-3 h-3"></i> ${escapeHtml(flight.origin)} ➔ ${escapeHtml(flight.destination)}
          </span>
        </td>
        <td class="px-4 py-3 text-slate-300 font-mono text-[11px] whitespace-nowrap">${formatDateTime(flight.time)}</td>
        <td class="px-4 py-3 whitespace-nowrap">
          <span class="px-2.5 py-0.5 rounded-full text-[11px] font-medium ${badgeColorClass}">
            ${escapeHtml(flight.status || 'Scheduled')}
          </span>
        </td>
        <td class="px-4 py-3 text-slate-400 max-w-xs truncate">${escapeHtml(flight.notes || '-')}</td>
        <td class="px-4 py-3 text-right whitespace-nowrap">
          <button onclick="deleteFlight('${flight.id}')" class="p-1 rounded text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors" title="Delete flight">
            <i data-lucide="trash" class="w-3.5 h-3.5"></i>
          </button>
        </td>
      </tr>
    `;
  }).join('');

  if (window.lucide) window.lucide.createIcons();
}

function getStatusBadgeClass(status) {
  switch (status) {
    case 'In Flight': return 'badge-inflight';
    case 'Landed': return 'badge-landed';
    case 'Delayed': return 'badge-delayed';
    case 'Scheduled':
    default: return 'badge-scheduled';
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, function(m) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[m];
  });
}

window.deleteFlight = function(id) {
  flights = flights.filter(f => f.id !== id);
  saveFlights();
  updateStats();
  renderFlights();
};

function quickAddOrdPr() {
  const flightNums = ['UA 1700', 'AA 2468', 'F9 2024', 'NK 880', 'B6 910'];
  const airlines = ['United Airlines', 'American Airlines', 'Frontier Airlines', 'Spirit Airlines', 'JetBlue Airways'];
  const randIndex = Math.floor(Math.random() * flightNums.length);

  flights.unshift({
    id: 'fl-' + Date.now(),
    direction: 'ORD-SJU',
    origin: 'ORD',
    destination: 'SJU',
    airline: airlines[randIndex],
    flightNo: flightNums[randIndex],
    time: new Date().toISOString().slice(0, 16),
    status: 'In Flight',
    notes: 'Quick logged ORD ➔ SJU'
  });

  saveFlights();
  updateStats();
  renderFlights();
}

function quickAddPrOrd() {
  const flightNums = ['UA 1701', 'AA 2469', 'F9 2025', 'NK 881', 'B6 911'];
  const airlines = ['United Airlines', 'American Airlines', 'Frontier Airlines', 'Spirit Airlines', 'JetBlue Airways'];
  const randIndex = Math.floor(Math.random() * flightNums.length);

  flights.unshift({
    id: 'fl-' + Date.now(),
    direction: 'SJU-ORD',
    origin: 'SJU',
    destination: 'ORD',
    airline: airlines[randIndex],
    flightNo: flightNums[randIndex],
    time: new Date().toISOString().slice(0, 16),
    status: 'In Flight',
    notes: 'Quick logged SJU ➔ ORD'
  });

  saveFlights();
  updateStats();
  renderFlights();
}

document.addEventListener('DOMContentLoaded', () => {
  loadFlights();
  updateStats();
  renderFlights();

  if (window.lucide) window.lucide.createIcons();

  document.getElementById('quick-add-ord-pr')?.addEventListener('click', quickAddOrdPr);
  document.getElementById('quick-add-pr-ord')?.addEventListener('click', quickAddPrOrd);

  document.getElementById('seed-data-btn')?.addEventListener('click', () => {
    flights = [...SAMPLE_FLIGHTS];
    saveFlights();
    updateStats();
    renderFlights();
  });

  document.getElementById('clear-all-btn')?.addEventListener('click', () => {
    if (confirm('Clear all logged flights?')) {
      flights = [];
      saveFlights();
      updateStats();
      renderFlights();
    }
  });

  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active', 'text-white', 'bg-slate-800');
        b.classList.add('text-slate-400');
      });
      btn.classList.add('active', 'text-white', 'bg-slate-800');
      btn.classList.remove('text-slate-400');
      currentFilter = btn.getAttribute('data-filter');
      renderFlights();
    });
  });

  document.getElementById('search-input')?.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim();
    renderFlights();
  });

  const modal = document.getElementById('flight-modal');
  const openModalBtn = document.getElementById('open-add-modal-btn');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const cancelModalBtn = document.getElementById('cancel-modal-btn');
  const flightForm = document.getElementById('add-flight-form');

  const openModal = () => {
    document.getElementById('modal-time').value = new Date().toISOString().slice(0, 16);
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    if (window.lucide) window.lucide.createIcons();
  };

  const closeModal = () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    flightForm.reset();
  };

  openModalBtn?.addEventListener('click', openModal);
  closeModalBtn?.addEventListener('click', closeModal);
  cancelModalBtn?.addEventListener('click', closeModal);

  flightForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const dirVal = document.getElementById('modal-direction').value;
    const [origin, destination] = dirVal.split('-');

    flights.unshift({
      id: 'fl-' + Date.now(),
      direction: dirVal,
      origin,
      destination,
      airline: document.getElementById('modal-airline').value,
      flightNo: document.getElementById('modal-flight-no').value.trim(),
      time: document.getElementById('modal-time').value,
      status: document.getElementById('modal-status').value,
      notes: document.getElementById('modal-notes').value.trim()
    });

    saveFlights();
    updateStats();
    renderFlights();
    closeModal();
  });
});
