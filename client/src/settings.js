import dog from './assets/images/dog.svg';
import cat from './assets/images/cat.svg';
import hamster from './assets/images/hamster.svg';
import another from './assets/images/all-pets.svg';

export const species = [
  { id: 'dog', title: 'Dog', image: dog },
  { id: 'cat', title: 'Cat', image: cat },
  { id: 'hamster', title: 'Hamster', image: hamster },
  { id: 'another', title: 'Another', image: another },
];

export const initialFormData = {
  species: '',
  name: '',
  gender: '',
  age: '',
  colour: '',
  traits: '',
  date: '',
  address: '',
};
