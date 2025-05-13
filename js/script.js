// script.js
// Array untuk menampung daftar tugas
const tasks = [];

// Ambil elemen DOM
window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const titleInput = document.getElementById("title");
  const dateInput = document.getElementById("date");
  const listContainer = document.getElementById("todo-list");

  if (!form || !listContainer) return;

  // Render ulang daftar tugas ke halaman
  function renderTasks() {
    listContainer.innerHTML = "";

    // Tampilkan tugas yang aktif
    const activeTasks = tasks.filter((t) => !t.deleted);
    activeTasks.forEach((task) => {
      const li = document.createElement("li");
      li.className = "todo-item";

      // Tombol checkbox (icon)
      const checkbox = document.createElement("img");
      checkbox.src = task.completed
        ? "assets/check-solid.svg"
        : "assets/check-outline.svg";
      checkbox.className = "icon icon-check";
      checkbox.addEventListener("click", () => toggleComplete(task.id));

      // Deskripsi tugas
      const text = document.createElement("span");
      text.className = "todo-text" + (task.completed ? " completed" : "");
      text.innerText = `${task.title} (batas: ${task.dueDate})`;

      // Tombol hapus
      const delBtn = document.createElement("img");
      delBtn.src = "assets/trash-outline.svg";
      delBtn.className = "icon icon-trash";
      delBtn.addEventListener("click", () => deleteTask(task.id));

      li.append(checkbox, text, delBtn);
      listContainer.append(li);
    });

    // Tampilkan tugas yang dihapus (opsional undo dan hapus permanen)
    const deletedTasks = tasks.filter((t) => t.deleted);
    deletedTasks.forEach((task) => {
      const li = document.createElement("li");
      li.className = "todo-item deleted";

      const text = document.createElement("span");
      text.className = "todo-text";
      text.innerText = `${task.title} (dihapus)`;

      // Tombol Undo
      const undoBtn = document.createElement("img");
      undoBtn.src = "assets/undo-outline.svg";
      undoBtn.className = "icon icon-undo";
      undoBtn.addEventListener("click", () => undoDelete(task.id));

      // Tombol Hapus Permanen
      const permDelBtn = document.createElement("img");
      permDelBtn.src = "assets/trash-outline.svg";
      permDelBtn.className = "icon icon-trash-perm";
      permDelBtn.addEventListener("click", () => permanentDelete(task.id));

      li.append(text, undoBtn, permDelBtn);
      listContainer.append(li);
    });
  }

  // Tambah tugas baru
  function addTask(event) {
    event.preventDefault();
    const title = titleInput.value.trim();
    const dueDate = dateInput.value;
    if (!title || !dueDate) return;

    const newTask = {
      id: Date.now().toString(),
      title,
      dueDate,
      completed: false,
      deleted: false,
    };
    tasks.push(newTask);

    // Reset form
    titleInput.value = "";
    dateInput.value = "";

    renderTasks();
  }

  // Toggle status selesai
  function toggleComplete(id) {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    task.completed = !task.completed;
    renderTasks();
  }

  // Tandai sebagai dihapus (soft delete)
  function deleteTask(id) {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    task.deleted = true;
    renderTasks();
  }

  // Batalkan hapus
  function undoDelete(id) {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    task.deleted = false;
    renderTasks();
  }

  // Hapus permanen dari array
  function permanentDelete(id) {
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return;
    tasks.splice(index, 1);
    renderTasks();
  }

  // Pasang event listener dan render awal
  form.addEventListener("submit", addTask);
  renderTasks();
});
