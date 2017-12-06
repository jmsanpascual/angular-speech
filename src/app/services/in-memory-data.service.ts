import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const speeches = [
      { id: 1, author: 'Author 1', title: 'Speech 1', content: 'Speech 1 content.', date: new Date('12/01/17'), keywords: ['test1', 'key1'] },
      { id: 2, author: 'Author 2', title: 'Speech 2', content: 'Speech 2 content.', date: new Date('12/02/17'), keywords: ['test2', 'key2'] },
      { id: 3, author: 'Author 3', title: 'Speech 3', content: 'Speech 3 content.', date: new Date('12/03/17'), keywords: ['test3', 'key3'] },
      { id: 4, author: 'Author 4', title: 'Speech 4', content: 'Speech 4 content.', date: new Date('12/04/17'), keywords: ['test4', 'key4'] },
      { id: 4, author: 'Author 4', title: 'Speech 4', content: 'Speech 4 content.', date: new Date('12/04/17'), keywords: ['test4', 'key4'] },
      { id: 5, author: 'Author 5', title: 'Speech 5', content: 'Speech 5 content.', date: new Date('12/05/17'), keywords: ['test5', 'key5'] }
    ]

    return { speeches };
  }

}
