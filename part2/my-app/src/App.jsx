import Course from "./components/Course";

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };

  const totalExercises = course.parts.reduce((sum,part) => {
    console.log("cantidad de ejercicios",part.exercises)
    return sum + part.exercises}, 0)

  return (
    <div>
      <h1>{course.name}</h1>
      <ul>
        {course.parts.map((part) => (
          <Course key={part.id} course={part} />
        ))}
      </ul>
      <h2>Total of a exercises: {totalExercises}</h2>
    </div>
  );
};

export default App;
