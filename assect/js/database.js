const DBConnector = {

    async loadData(key) {

        try {

            const response = await fetch('/load-data');
            const db = await response.json();

            return db[key] || [];

        } catch (error) {

            console.error('Load Error:', error);
            return [];

        }

    },

    async saveData(data, key) {

        try {

            await fetch('/save-data', {

                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({

                    key: key,
                    data: data

                })

            });

            return true;

        } catch (error) {

            console.error('Save Error:', error);
            return false;

        }

    }

};


const DBConnector = {

    async loadData(key) {

        const response =
            await fetch('/load-data');

        const db =
            await response.json();

        return db[key] || [];

    },

    async saveData(data, key) {

        await fetch('/save-data', {

            method: 'POST',

            headers: {
                'Content-Type':
                'application/json'
            },

            body: JSON.stringify({
                key: key,
                data: data
            })

        });

    }

};


const DBConnector = {

    async loadData(key) {

        const response =
            await fetch('/load-data');

        const db =
            await response.json();

        return db[key] || [];

    },

    async saveData(data,key) {

        await fetch('/save-data', {

            method:'POST',

            headers:{
                'Content-Type':
                'application/json'
            },

            body:JSON.stringify({
                key:key,
                data:data
            })

        });

    }

};


// assect/js/database.js

const DB_KEYS = {
    users: "erp_users",
    expiryEnabled: "erp_expiry_enabled"
};

// Create default database
(function initDatabase() {
    if (!localStorage.getItem(DB_KEYS.users)) {
        const defaultUsers = [
            {
                id: "admin",
                name: "Administrator",
                password: "admin123",
                rights: "admin",
                expiryStart: "",
                expiryEnd: ""
            },
            {
                id: "user001",
                name: "Test User",
                password: "123456",
                rights: "user",
                expiryStart: "",
                expiryEnd: ""
            }
        ];

        localStorage.setItem(
            DB_KEYS.users,
            JSON.stringify(defaultUsers)
        );
    }

    if (!localStorage.getItem(DB_KEYS.expiryEnabled)) {
        localStorage.setItem(DB_KEYS.expiryEnabled, "true");
    }
})();

// User Functions
function getUsers() {
    return JSON.parse(localStorage.getItem(DB_KEYS.users) || "[]");
}

function saveUsers(users) {
    localStorage.setItem(DB_KEYS.users, JSON.stringify(users));
}

function getUserById(id) {
    return getUsers().find(user => user.id === id);
}

function addUser(user) {
    const users = getUsers();

    if (users.some(u => u.id === user.id)) {
        return false;
    }

    users.push(user);
    saveUsers(users);
    return true;
}

function updateUser(id, updatedData) {
    const users = getUsers();
    const index = users.findIndex(u => u.id === id);

    if (index === -1) return false;

    users[index] = {
        ...users[index],
        ...updatedData
    };

    saveUsers(users);
    return true;
}

function deleteUser(id) {
    const users = getUsers().filter(u => u.id !== id);
    saveUsers(users);
}

function validateLogin(id, password) {
    const user = getUserById(id);

    if (!user) return null;
    if (user.password !== password) return null;

    return user;
}