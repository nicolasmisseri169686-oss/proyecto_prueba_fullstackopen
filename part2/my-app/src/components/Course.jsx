const Course = ({course})=> {
  return (
    
    <li>
      <h1>{course.name}</h1>
      <h2>{course.exercises} - ejercicios</h2>
    </li>
  );
};

export default Course;
