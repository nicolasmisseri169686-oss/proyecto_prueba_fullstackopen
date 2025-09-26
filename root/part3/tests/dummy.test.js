// Importa las funciones reverse y average desde el archivo de utilidades para pruebas
const { reverse, average } = require('../utils/for_testing');

// Prueba unitaria: verifica que la función reverse invierta correctamente una cadena
test('reverse of a', () => {
  // Invierte la cadena 'a'
  const result = reverse('a');
  // Espera que el resultado sea 'a' (una sola letra no cambia)
  expect(result).toBe('a');
});

// Prueba que reverse invierte la palabra 'react'
test('reverse of react', () => {
  const result = reverse('react'); // Invierte la cadena
  expect(result).toBe('tcaer'); // Espera el resultado invertido
});

// Prueba que reverse invierte la palabra 'releveler' (palíndromo)
test('reverse of releveler', () => {
  const result = reverse('releveler'); // Invierte la cadena
  expect(result).toBe('releveler'); // Un palíndromo se mantiene igual
});

// Prueba unitaria: verifica que average calcula el promedio correctamente
test('average of [1,2,3]', () => {
  const result = average([1, 2, 3]); // Calcula el promedio de 1, 2 y 3
  expect(result).toBe(2); // Espera que el promedio sea 2
});

// Prueba que average devuelve NaN para un array vacío
test('average of empty array', () => {
  const result = average([]); // Calcula el promedio de un array vacío
  expect(result).toBeNaN(); // NaN porque no se puede dividir por 0
});