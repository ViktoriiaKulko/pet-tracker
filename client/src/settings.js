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
  species: { value: '', error: false, helperText: '' },
  name: { value: '', error: false, helperText: '' },
  gender: { value: '', error: false, helperText: '' },
  age: { value: '', error: false, helperText: '' },
  colour: { value: '', error: false, helperText: '' },
  traits: { value: '', error: false, helperText: '' },
  date: { value: null, error: false, helperText: '' },
  address: { value: '', error: false, helperText: '' },
};
