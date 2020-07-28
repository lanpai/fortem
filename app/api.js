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

var AUTH_TOKEN = undefined;
var ID = undefined;

const login = async (email, pass) => {
    console.log('Logging in with: ' + email);
    if (email === SAMPLE_EMAIL && pass === SAMPLE_PASS)
        return 'Success';
    return 'Incorrect email or password';
}

const logout = async () => {
    return true;
}

const sendMessage = async (message) => {
    console.log('Sending: ' + message);
}

const sendFile = async (file) => {
    console.log('Sending: ' + file)
}

const getConversations = async () => {
    return [ 1, 2 ];
}

const getMessages = async (id) => {
    return SAMPLE_MESSAGES[id];
}

const getDoctor = async (id) => {
    return SAMPLE_DOCTORS[id];
}

const getNearby = async (latitude, longitude) => {
    return [ 1, 4, 5 ];
}

const createAccount = async (picture, name, email, phone, gender, dob, pass) => {
    console.log('Creating a new account: ');
    console.log(picture, name, email, phone, gender, dob, pass);
    return 'Success';
}

// NOT AN API CALL
const getID = () => {
    return SAMPLE_ID;
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
    getID
};
