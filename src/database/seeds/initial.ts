import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('authors').del();
  await knex('books').del();

  // Inserts seed entries
  await knex('authors').insert([
    {
      name: 'Jack Jones',
      age: 55,
      rating: 5,
      id: '19a438a90-7013-4496-87d7-38cf994a3fd1',
    },
    {
      name: 'Verna Frag',
      age: 60,
      rating: 5,
      id: 'a5aeea41-cc48-41fe-b6ca-68724472afd0',
    },
    {
      name: 'Ron Tamara',
      age: 25,
      rating: 5,
      id: '59dd99cc-559c-4e20-885e-1b5f7134295f',
    },
    {
      name: 'Ranji Imaan',
      age: 35,
      rating: 5,
      id: '9af3ad83-f725-494b-a637-ce242651c298',
    },
  ]);

  await knex('books').del();

  // Inserts seed entries
  await knex('books').insert([
    {
      title: 'My book',
      id: 'e9c71c87-9ce8-45fe-b4ae-593026fb08c6',
      genre: 'thriller',
      rating: 5,
      authorId: '19a438a90-7013-4496-87d7-38cf994a3fd1',
    },
    {
      title: 'History of the World',
      id: '4842d522-b82d-4770-849c-6e3680e13119',
      genre: 'history',
      rating: 4,
      authorId: '19a438a90-7013-4496-87d7-38cf994a3fd1',
    },
    {
      title: 'The book of stories',
      id: '4ea37a21-ca61-4323-97fa-070b35067e40',
      genre: 'fiction',
      rating: 6,
      authorId: 'a5aeea41-cc48-41fe-b6ca-68724472afd0',
    },
  ]);
}
