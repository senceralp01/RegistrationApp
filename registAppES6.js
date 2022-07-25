// Course class
class Course{
    constructor(title, instructor, image){
        this.courseId = Math.floor(Math.random()*10000); // Local storage'dan doğru bilgiyi seçip silebilmemiz için üretildi.
        this.title = title;
        this.instructor = instructor;
        this.image = image;
    }
}

// UI Class
class UI{
    addCourseToList(course){
        const list = document.getElementById('course-list');

        var html = `
            <tr>
                <td><img src="img/${course.image}" /></td>
                <td>${course.title}</td>
                <td>${course.instructor}</td>
                <td><a href="#" data-id = "${course.courseId}" class="btn btn-danger btn-sm delete">Delete</a></td>
    
            </tr>
        
        `
    
        list.innerHTML += html;
    }

    clearControls(){
        const title = document.getElementById('title').value="";
        const instructor = document.getElementById('instructor').value="";
        const image = document.getElementById('image').value="";
    }

    deleteCourse(element){
        if (element.classList.contains('delete')){
            element.parentElement.parentElement.remove();
            return true; // delete alerti için eklendi.
        }
    }

    showAlert(message, className){
        var alert = `
        <div class = "alert alert-${className}">
            ${message}
        </div>
    `;

    const row = document.querySelector('.row');
    // beforBegin, afterBegin, beforeEnd, afterEnd
    row.insertAdjacentHTML('beforeBegin', alert);

    setTimeout(()=>{
        document.querySelector('.alert').remove();
    }, 3000);
    }

}

// Local Storage Processes
class Storage{

    static getCourses(){
        let courses;

        if (localStorage.getItem('courses')===null){
            courses = [];
        }else{
            courses = JSON.parse(localStorage.getItem('courses'));
        }
        return courses;
    }

    static displayCourses(){
        const courses = Storage.getCourses();

        courses.forEach(course => {
            const ui = new UI();
            ui.addCourseToList(course);        
        });
    }

    static addCourse(course){
        const courses = Storage.getCourses();
        courses.push(course);
        localStorage.setItem('courses', JSON.stringify(courses)); //localStorage.setItem(keyname, value)
    }

    static deleteCourse(element){
        if(element.classList.contains('delete')){
            const id = element.getAttribute('data-id');
            console.log(id);

            const courses = Storage.getCourses();

            courses.forEach((course, index)=>{

                if (course.courseId == id){
                    courses.splice(index,1);
                }
            })

            localStorage.setItem('courses', JSON.stringify(courses));
        }
    }
}

// Showing Datas from the Local Storage on UI when the DOM loaded
document.addEventListener('DOMContentLoaded', Storage.displayCourses);

// Adding New Course
document.getElementById('new-course').addEventListener('submit', function(e){

    const title = document.getElementById('title').value;
    const instructor = document.getElementById('instructor').value;
    const image = document.getElementById('image').value;


    // Create Course Object
    const course = new Course(title, instructor,image);

    // Create UI
    const ui = new UI();

    if (title==='' || instructor==='' || image===''){
        ui.showAlert('Please complete the form', 'warning');
    }else{
        // Add to Course List
        ui.addCourseToList(course);

        // Save to Local Storage
        Storage.addCourse(course);

        // Clear Controls
        ui.clearControls();

        ui.showAlert('The course has been added', 'success');
    }

    e.preventDefault();
});

// Deleting a Course
document.getElementById('course-list').addEventListener('click', function(e){
    //console.log(e.target);
    const ui = new UI();

    if(ui.deleteCourse(e.target)==true){ // Delete Course from UI and if deleted return true
        
        // Delete Course from Local Storage
        Storage.deleteCourse(e.target);

        ui.showAlert('The course has been deleted', 'danger');
    }

});