const Course = ({ course }) => {
  return (
    <li key={course.id}>
      The course {course.name} content {course.exercises} exercises.
    </li>
  );
};

export default Course;
