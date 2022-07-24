function Course(title, instructor, image){
    this.title = title;
    this.instructor = instructor;
    this.image = image;
}


document.getElementById('new-course').addEventListener('submit', function(e){

    const title = document.getElementById('title').value;
    const instructor = document.getElementById('instructor').value;
    const image = document.getElementById('image').value;

    //console.log(title, instructor, image);

    // Create Course Object
    const course = new Course(title, instructor,image);

    console.log(course);

    // Save to Database

    // Show on the UI



    e.preventDefault();
})