function saveData() {
    localStorage.setItem('fullName', document.getElementById('fullName').value);
    localStorage.setItem('nickName', document.getElementById('nickName').value);
    localStorage.setItem('gender', document.getElementById('gender').value);
    localStorage.setItem('country', document.getElementById('country').value);
    localStorage.setItem('language', document.getElementById('language').value);
    localStorage.setItem('phoneNumber', document.getElementById('phoneNumber').value);
}

function loadData() {
    document.getElementById('fullName').value = localStorage.getItem('fullName') || '';
    document.getElementById('nickName').value = localStorage.getItem('nickName') || '';
    document.getElementById('gender').value = localStorage.getItem('gender') || '';
    document.getElementById('country').value = localStorage.getItem('country') || '';
    document.getElementById('language').value = localStorage.getItem('language') || '';
    document.getElementById('phoneNumber').value = localStorage.getItem('phoneNumber') || '';
}

window.addEventListener('DOMContentLoaded', () => {
    loadData();
    document.querySelectorAll('#fullName, #nickName, #gender, #country, #language, #phoneNumber').forEach(el => {
        el.addEventListener('input', saveData);
        el.addEventListener('change', saveData); // for <select>
    });
});
