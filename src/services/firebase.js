import { getShadeHexColor } from '../utils/color';

class FirebaseService {
    initialize(onSuccessAuth, onFailAuth) {
        const firebaseConfig = {
            apiKey: 'AIzaSyC0nfXv7VDCjoR7_kHGXOMoFJP3CaT55B4',
            authDomain: 'calendar-952f3.firebaseapp.com',
            databaseURL: 'https://calendar-952f3.firebaseio.com',
            projectId: 'calendar-952f3',
            storageBucket: 'calendar-952f3.appspot.com',
            messagingSenderId: '619853456743',
            appId: '1:619853456743:web:65273f43dbc5da80f87bc2',
        };

        const app = window.firebase.initializeApp(firebaseConfig);

        window.firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                onSuccessAuth(user);
            } else {
                onFailAuth();
            }
        });

        return app;
    }

    async authenticate(login, password) {
        return window.firebase.auth().signInWithEmailAndPassword(login, password);
    }

    async register(email, firstname, lastname, password) {
        return window.firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() =>
                this.user.updateProfile({
                    displayName: firstname + ' ' + lastname,
                })
            );
    }

    async logout() {
        return window.firebase.auth().signOut();
    }

    parseSnapshot(snapshot) {
        return Object.entries(snapshot.val()).map(([key, value]) => ({
            ...value,
            id: key,
        }));
    }

    async addEvent(title, description, date, interval) {
        return window.firebase
            .database()
            .ref('/events/' + this.user.uid)
            .push()
            .set({
                title,
                date,
                description,
                interval,
                user: this.user.uid,
                color: getShadeHexColor(),
            });
    }

    listenEvents(callback, dates) {
        let ref = window.firebase.database().ref('/events/' + this.user.uid);

        if (dates) {
            if (dates[0] && dates[1]) {
                ref = ref.orderByChild('date').startAt(dates[0]).endAt(dates[1]);
            } else {
                ref = ref.orderByChild('date').equalTo(dates[0]);
            }
        }

        return ref.on('value', (snapshot) => {
            if (snapshot && snapshot.exists()) {
                callback(this.parseSnapshot(snapshot));
            } else {
                callback([]);
            }
        });
    }

    async updateEvent(id, event) {
        delete event.id;
        delete event.type;
        return window.firebase
            .database()
            .ref('/events/' + this.user.uid)
            .child(id)
            .update(event);
    }

    async addTask(title, description, date) {
        return window.firebase
            .database()
            .ref('/tasks/' + this.user.uid)
            .push()
            .set({
                title,
                description,
                date,
                color: getShadeHexColor(),
            });
    }

    listenTasks(callback, dates) {
        let ref = window.firebase.database().ref('/tasks/' + this.user.uid);

        if (dates) {
            if (dates[0] && dates[1]) {
                ref = ref.orderByChild('date').startAt(dates[0]).endAt(dates[1]);
            } else {
                ref = ref.orderByChild('date').equalTo(dates[0]);
            }
        }

        return ref.on('value', (snapshot) => {
            if (snapshot && snapshot.exists()) {
                callback(this.parseSnapshot(snapshot));
            } else {
                callback([]);
            }
        });
    }

    async removeTask(id) {
        return window.firebase.database().ref(`/tasks/${this.user.uid}/${id}`).remove();
    }

    async updateTask(id, task) {
        delete task.id;
        delete task.type;
        return window.firebase
            .database()
            .ref('/tasks/' + this.user.uid)
            .child(id)
            .update(task);
    }

    async addReminder(title, time, date) {
        return window.firebase
            .database()
            .ref('/reminders/' + this.user.uid)
            .push()
            .set({
                title,
                time,
                date,
                color: getShadeHexColor(),
            });
    }

    listenReminders(callback, dates) {
        let ref = window.firebase.database().ref('/reminders/' + this.user.uid);

        if (dates) {
            if (dates[0] && dates[1]) {
                ref = ref.orderByChild('date').startAt(dates[0]).endAt(dates[1]);
            } else {
                ref = ref.orderByChild('date').equalTo(dates[0]);
            }
        }

        return ref.on('value', (snapshot) => {
            if (snapshot && snapshot.exists()) {
                callback(this.parseSnapshot(snapshot));
            } else {
                callback([]);
            }
        });
    }

    async updateReminder(id, reminder) {
        delete reminder.id;
        delete reminder.type;
        return window.firebase
            .database()
            .ref('/reminders/' + this.user.uid)
            .child(id)
            .update(reminder);
    }

    get user() {
        return window.firebase.auth().currentUser;
    }

    async removeEvent(id) {
        return window.firebase
            .database()
            .ref('/events/' + this.user.uid)
            .child(id)
            .remove();
    }

    async removeReminder(id) {
        console.log('remove');
        return window.firebase
            .database()
            .ref('/reminders/' + this.user.uid)
            .child(id)
            .remove();
    }
}

export default FirebaseService;
