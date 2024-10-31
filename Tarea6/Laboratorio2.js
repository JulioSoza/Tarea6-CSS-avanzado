
class User {
    constructor({ name, surname, email, role }) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.role = role;
        this.courses = []; 
        this.messageHistory = []; // 
    }

    addCourse(course, level) {
        this.courses.push({ course, level });
    }

    removeCourse(course) {
        this.courses = this.courses.filter(c => c.course !== course);
    }

    editCourse(course, level) {
        const courseObj = this.courses.find(c => c.course === course);
        if (courseObj) {
            courseObj.level = level;
        } else {
            console.log(`Course ${course} not found.`);
        }
    }

    sendMessage(to, message) {
        this.sendEmail(this.email, to.email, message);
        to.messageHistory.push({
            from: this.email,
            to: to.email,
            message: message,
        });
    }

    sendEmail(from, to, message) {
        console.log(`Email sent from ${from} to ${to}: ${message}`);
    }

    showMessagesHistory() {
        this.messageHistory.forEach(msg =>
            console.log(`${msg.from} -> ${msg.to}: ${msg.message}`)
        );
    }
}

// Clase Extendida 
class ExtendedUser extends User {
    get fullName() {
        return `${this.name} ${this.surname}`;
    }

    set fullName(fullName) {
        [this.name, this.surname] = fullName.split(' ');
    }
}

// Clase Student 
class Student extends ExtendedUser {
    constructor({ name, surname, email }) {
        super({ name, surname, email, role: 'student' });
    }
}

// Clase Teacher 
class Teacher extends ExtendedUser {
    constructor({ name, surname, email }) {
        super({ name, surname, email, role: 'teacher' });
    }
}

// Prueba del sistema 
let student1 = new Student({ name: 'Rafael', surname: 'Fife', email: 'rfife@rhyta.com' });
let student2 = new Student({ name: 'Kelly', surname: 'Estes', email: 'k_estes@dayrep.com' });
let teacher1 = new Teacher({ name: 'Paula', surname: 'Thompkins', email: 'PaulaThompkins@jourrapide.com' });

student1.addCourse('maths', 2);
teacher1.addCourse('biology', 3);
teacher1.addCourse('chemistry', 4);

console.log(`${student1.fullName}: ${student1.courses.length} courses`); // -> Rafael Fife: 1 courses
console.log(`${teacher1.fullName}: ${teacher1.courses.length} courses`); // -> Paula Thompkins: 2 courses

// Prueba del setter y getter de fullName
student1.fullName = 'Rafael Fifer';
console.log(`${student1.fullName}: ${student1.courses.length} courses`); // -> Rafael Fifer: 1 courses
