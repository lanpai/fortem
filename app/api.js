const SAMPLE_DOCTORS = {
    1: {
        id: 1,
        name: 'Dr. John Doe, DDS',
        practice: 'Dentist',
        description: 'Description about John Doe',
        available: true,
        latitude: 34.223491,
        longitude: -118.233499,
        distance: 5
    },
    2: {
        id: 2,
        name: 'Dr. Ashley Yeon, MD',
        practice: 'Physician',
        description: 'Ashey Yeon\'s description',
        available: false,
    },
    4: {
        id: 4,
        name: 'Dr. Jane Angelo, MD',
        practice: 'Physician',
        description: 'Description about Jane Angelo',
        available: true,
        latitude: 34.226419,
        longitude: -118.255429,
        distance: 7
    },
    5: {
        id: 5,
        name: 'Dr. Benjamin Shah, MD',
        practice: 'Physician',
        description: 'Description about Benjamin Shah',
        available: true,
        latitude: 34.245724,
        longitude: -118.249514,
        distance: 7
    }
}

const SAMPLE_MESSAGES = {
    1: [
        {
            id: 1,
            sender: 5,
            receiver: 3,
            timestamp: 'July 24',
            content: 'Make sure to floss!'
        },
        {
            id: 2,
            sender: 3,
            receiver: 5,
            timestamp: 'July 24',
            content: 'Of course I have.'
        },
        {
            id: 3,
            sender: 5,
            receiver: 3,
            timestamp: 'July 23',
            content: 'Have you been flossing?'
        }
    ],
    2: [
        {
            id: 4,
            sender: 6,
            receiver: 3,
            timestamp: 'July 22',
            content: 'Has the inflammation gone?'
        }
    ]
};

const SAMPLE_ID = 3;

const SAMPLE_EMAIL = 'test@mail.com';
const SAMPLE_PASS = 'pass';

const SERVER = 'https://fortem.piyo.cafe/';
var AUTH_TOKEN = undefined;
var ID = undefined;

const login = async (email, pass) => {
    console.log('Logging in');

    if (!email) return 'Missing email';
    if (!pass) return 'Missing password';

    let res = await fetch(SERVER + 'userLogin', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password: pass
        })
    });
    if (res.status === 200) {
        let json = await res.json();
        AUTH_TOKEN = json.authToken;
        ID = json.id;
        return 'Success';
    }
    else {
        return await res.text();
    }
}

const logout = async () => {
    return true;
}

const sendMessage = async (id, message) => {
    console.log('Sending message');

    if (!id)
        return 'Missing id';
    if (!message)
        return 'Missing message';

    let res = await fetch(SERVER + 'sendMessage', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + AUTH_TOKEN
        },
        body: JSON.stringify({
            content: message,
            receiver: id
        })
    });
    if (res.status === 200) {
        return 'Success';
    }
    else {
        return await res.text();
    }
}

const sendFile = async (file) => {
    console.log('Sending file')
    // RSA encryption here
    return 'Successfully sent file';
}

const getConversations = async () => {
    let res = await fetch(SERVER + 'getConversations', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + AUTH_TOKEN
        }
    });
    if (res.status === 200) {
        return await res.json();
    }
    else {
        return await res.text();
    }
}

const getMessages = async (id) => {
    if (!id)
        return 'Missing id';

    let res = await fetch(SERVER + 'getMessages', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + AUTH_TOKEN
        },
        body: JSON.stringify({
            participant: id
        })
    });
    if (res.status === 200) {
        let messages = await res.json();
        return messages;
    }
    else {
        return await res.text();
    }
}

const getDoctor = async (id) => {
    if (!id)
        return 'Missing id';

    let res = await fetch(SERVER + 'getDoctor', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + AUTH_TOKEN
        },
        body: JSON.stringify({
            id
        })
    });
    if (res.status === 200) {
        return await res.json();
    }
    else {
        return await res.text();
    }
}

const getNearby = async (latitude, longitude) => {
    if (!latitude)
        return 'Missing latitude';
    if (!longitude)
        return 'Missing longitude';

    let res = await fetch(SERVER + 'getDoctorsNearMe', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + AUTH_TOKEN
        },
        body: JSON.stringify({
            latitude, longitude,
            distance: 10
        })
    });
    if (res.status === 200) {
        return await res.json();
    }
    else {
        return await res.text();
    }
}

const createAccount = async (picture, name, email, phone, gender, dob, pass) => {
    console.log('Creating a new account');

    if (!picture) return 'Missing profile picture';
    if (!name) return 'Missing name';
    if (!email) return 'Missing email';
    if (!phone) return 'Missing phone number';
    if (!gender) return 'Missing gender';
    if (!dob) return 'Missing date of birth';
    if (!pass) return 'Missing password';

    let res = await fetch(SERVER + 'addAccount', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            email,
            phone,
            password: pass,
            gender,
            dob,
            profile: picture
        })
    });
    if (res.status === 200) {
        let json = await res.json();
        AUTH_TOKEN = json.authToken;
        ID = json.id;
        return 'Success';
    }
    else {
        return await res.text();
    }
}

const setAsRead = async (id) => {
    if (!id) return 'Missing id';

    let res = await fetch(SERVER + 'setAsRead', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + AUTH_TOKEN
        },
        body: JSON.stringify({
            participant: id
        })
    });
    if (res.status === 200) {
        return 'Success';
    }
    else {
        return await res.text();
    }
}

// NOT AN API CALL
const getID = () => {
    return ID;
}

export {
    login,
    logout,
    sendMessage,
    sendFile,
    getConversations,
    getMessages,
    getDoctor,
    getNearby,
    createAccount,
    setAsRead,
    getID
};
