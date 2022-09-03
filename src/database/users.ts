import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-bottts-sprites';
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';

export const skills = [
    'HTML',
    'CSS',
    'JavaScript',
    'Python',
    'React',
    'Ruby',
    'Rail',
    'Sass',
    'Tailwind', 
    'Vue',
    'Django',
]

export const periods = [
    "Full Time",
    "Part Time"
]

export const levels = [
  'Junior',
  "Middle",
  'Senior',
  'Specialist'
]

export const areas = [
  'Frontend',
  "Backend",
  'Fullstack',
]



  async function setRandomSlice(list: any) {
    let startPick = Math.floor(Math.random() * list.length);
    let endsPick = Math.floor(Math.random() * list.length);
    while(startPick >= endsPick){
      endsPick = Math.floor(Math.random() * list.length);
    }
    return  list.slice(startPick, endsPick);
  }
  
  function selectRandom(list:string[],number: number = 0){
    const newList: string[] = []
    for (let index = 0; index <= number; index++) {
      const selectItem = Math.floor(Math.random() * list.length)
      if(!newList.find((item) => item === list[selectItem])){
        newList.push(list[selectItem])
      }
    }
    return newList
  }

  function random(list:string[]) {
    return Math.floor(Math.random() * (6 + 1)) + 2;
}

  export  function generateUsers() {
      let users = []
    
      for (let id=1; id <= 10; id++) {
    
        users.push({
          "id": uuidv4(),
          "name":  faker.name.firstName() + 'Robot',
          "email":  faker.internet.email(),
          "avatar":createAvatar(style, {
              dataUri: true,
          }),
          "skills": selectRandom(skills,random(skills)),
          "periods": selectRandom(periods),
          "levels": selectRandom(levels),
          "areas": selectRandom(areas),
        });
      }
    
      return  users 
  }

  export const users = generateUsers()

  