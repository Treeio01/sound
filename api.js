const backendDomain = "https://api.HearUp.ai"

const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

// Функция для получения данных из localStorage
const getFromLocalStorage = (key) => {
  return localStorage.getItem(key);
};

async function checkFriendsPageAuth() {
  // Проверяем находимся ли на странице /friends
  if (
    window.location.pathname === "/friends" ||
    window.location.pathname === "/captures" ||
    window.location.pathname === "/home" ||
    window.location.pathname === "/analytics" ||
    window.location.pathname === "/meetings"
  ) {
    // Получаем токен доступа из localStorage
    const accessToken = getFromLocalStorage("accessToken");

    // Если токена нет - перенаправляем на страницу логина
    if (!accessToken) {
      window.location.href = "/login";
      return false;
    }

    return true;
  }

  return true;
}
checkFriendsPageAuth();
// Функция для регистрации пользователя
async function registerUser(username, password) {
  const response = await fetch(`${backendDomain}/HearUp/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const result = await response.json();
  console.log(response);
  console.log(result);
  if (response.ok) {
    return { success: true };
  } else {
    return { success: false, error: result.error };
  }
}

// Функция для логина пользователя
async function loginUser(username, password) {
  const response = await fetch(
    `${backendDomain}/0dda4737-066a-43bb-95b8-73c032b64f70/`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    }
  );

  const result = await response.json();
  if (response.ok) {
    saveToLocalStorage("accessToken", result.access);
    saveToLocalStorage("refreshToken", result.refresh);
    console.log(response);
    return { success: true };
  } else {
    console.log("=====");
    return { success: false, error: result.non_field_errors };
  }
}

// Функция для получения данных профиля
async function getProfile() {
  const accessToken = getFromLocalStorage("accessToken");
  const response = await fetch(`${backendDomain}/HearUp/profile/`, {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const result = await response.json();
  if (response.ok) {
    return result;
  } else if (response.status === 403 || response.status === 401) {
    // Делаем лог-аут пользователя
    if (window.location.pathname !== "/login") {
      logout();
    }
    return null;
  } else {
    return null;
  }
}

// Функция для изменения данных профиля
async function updateProfile(data) {
  const accessToken = getFromLocalStorage("accessToken");
  const response = await fetch(`${backendDomain}/HearUp/profile/`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  if (response.ok) {
    return { success: true };
  } else if (response.status === 403) {
    logout();
    return { success: false, error: "Forbidden" };
  } else {
    return { success: false, error: result.error };
  }
}

// Функция для удаления профиля
async function deleteProfile() {
  const accessToken = getFromLocalStorage("accessToken");
  const response = await fetch(`${backendDomain}/HearUp/profile/`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const result = await response.json();
  if (response.ok) {
    logout();
    return { success: true };
  } else if (response.status === 403) {
    logout();
    return { success: false, error: "Forbidden" };
  } else {
    return { success: false, error: result.error };
  }
}

// Функция для получения ссылки на загрузку
async function getDownloadLink(conferenceCode) {
  const accessToken = getFromLocalStorage("accessToken");
  const response = await fetch(
    `${backendDomain}/HearUp/retreive/${conferenceCode}/`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  const result = await response.json();
  if (response.ok) {
    return {
      success: true,
      link: result.link,
      room_name: result.room_name,
      members_count: result.members_count,
    };
  } else if (response.status === 403) {
    logout();
    return { success: false, error: "Forbidden" };
  } else {
    return { success: false, error: result.error };
  }
}

// Функция для получения списка друзей
async function getFriends() {
  const accessToken = getFromLocalStorage("accessToken");
  const response = await fetch(`${backendDomain}/HearUp/friends/`, {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const result = await response.json();
  if (response.ok) {
    return result;
  } else if (response.status === 403) {
    logout();
    return null;
  } else {
    return null;
  }
}

// Функция для добавления друга
async function addFriend(email) {
  const accessToken = getFromLocalStorage("accessToken");
  const response = await fetch(`${backendDomain}/HearUp/friends/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ search: email }),
  });

  const result = await response.json();
  if (response.ok) {
    return { success: true };
  } else if (response.status === 403) {
    logout();
    return { success: false, error: "Forbidden" };
  } else {
    return { success: false, error: result.error };
  }
}

// Функция для принятия/отклонения предложения дружбы
async function respondToFriendRequest(id, action) {
  const accessToken = getFromLocalStorage("accessToken");
  const response = await fetch(`${backendDomain}/HearUp/friends/`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, action }),
  });

  const result = await response.json();
  if (response.ok) {
    return { success: true };
  } else if (response.status === 403) {
    logout();
    return { success: false, error: "Forbidden" };
  } else {
    return { success: false, error: result.error };
  }
}

// Функция для блокировки/разблокировки друга
async function toggleBlockFriend(id) {
  const accessToken = getFromLocalStorage("accessToken");
  const response = await fetch(`${backendDomain}/HearUp/friends/`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  const result = await response.json();
  if (response.ok) {
    return { success: true };
  } else if (response.status === 403) {
    logout();
    return { success: false, error: "Forbidden" };
  } else {
    return { success: false, error: result.error };
  }
}

// Функция для удаления друга
async function deleteFriend(id) {
  const accessToken = getFromLocalStorage("accessToken");
  const response = await fetch(`${backendDomain}/HearUp/friends/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  const result = await response.json();
  if (response.ok) {
    return { success: true };
  } else if (response.status === 403) {
    logout();
    return { success: false, error: "Forbidden" };
  } else {
    return { success: false, error: result.error };
  }
}

// Функция для получения списка чатов
async function getChats() {
  const accessToken = getFromLocalStorage("accessToken");
  const response = await fetch(`${backendDomain}/HearUp/chat/`, {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const result = await response.json();
  if (response.ok) {
    return result.chats;
  } else if (response.status === 403) {
    logout();
    return null;
  } else {
    return null;
  }
}

// Функция для получения сообщений в чате
async function getChatMessages(userId) {
  const accessToken = getFromLocalStorage("accessToken");
  const response = await fetch(`${backendDomain}/HearUp/chat/${userId}/`, {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const result = await response.json();
  if (response.ok) {
    return result.messages;
  } else if (response.status === 403) {
    logout();
    return null;
  } else {
    return null;
  }
}

// Функция для отправки сообщения
async function sendMessage(recipientId, message) {
  const accessToken = getFromLocalStorage("accessToken");
  const response = await fetch(`${backendDomain}/HearUp/chat/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ recipent_id: recipientId, message }),
  });

  const result = await response.json();
  if (response.ok) {
    return { success: true };
  } else if (response.status === 403) {
    logout();
    return { success: false, error: "Forbidden" };
  } else {
    return { success: false, error: result.error };
  }
}
// Функция для выхода из системы
function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  window.location.href = "/login";
  // Дополнительная логика для выхода из системы
}

function checkAuth() {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return false;
  }
  // Можно добавить дополнительную проверку токена (например, декодировать и проверить exp)
  return true;
}
