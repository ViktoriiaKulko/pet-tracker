import dog from './assets/images/dog.svg';
import cat from './assets/images/cat.svg';
import hamster from './assets/images/hamster.svg';
import another from './assets/images/all-pets.svg';

export const speciesList = [
  { id: 'dog', title: 'Dog', image: dog },
  { id: 'cat', title: 'Cat', image: cat },
  { id: 'hamster', title: 'Hamster', image: hamster },
  { id: 'another', title: 'Another', image: another },
];

export const initialFormData = {
  species: { value: '' },
  name: { value: '' },
  gender: { value: '' },
  age: { value: '' },
  colour: { value: '' },
  traits: { value: '' },
  date: { value: '' },
  address: { value: '' },
};
